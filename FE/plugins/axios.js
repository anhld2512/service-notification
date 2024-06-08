// #region AnhLd Hướng dẫn 
import axios from 'axios';

// Khởi tạo plugin Nuxt, truyền vào nuxtApp
export default defineNuxtPlugin((nuxtApp) => {
  // Sử dụng cấu hình ứng dụng để lấy URL của API
  const appConfig = useAppConfig();
  
  // Tạo một instance của axios với URL cơ bản và tùy chọn credentials
  const api = axios.create({
    baseURL: `https://notification-sevice-be-346895f7383c.herokuapp.com/api`,
    withCredentials: true
  });

  // Kiểm tra hỗ trợ của trình duyệt đối với Service Worker và Push Manager
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Đăng ký Service Worker
    registerServiceWorker();
  }

  // Hàm để đăng ký Service Worker
  async function registerServiceWorker() {
    try {
      // Đăng ký Service Worker
      const swReg = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker is registered', swReg);

      // Yêu cầu quyền hiển thị thông báo
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Đăng ký người dùng để nhận thông báo đẩy
        subscribeUser(swReg);
      }
    } catch (error) {
      console.error('Service Worker Error', error);
    }
  }

  // Hàm để đăng ký người dùng nhận thông báo đẩy
  async function subscribeUser(swReg) {
    try {
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.SECRETPUBLIC_KEY || 'BN3yNCATt4zRMU-e5nFIjwMfJ5Gfp3fub6_DcDzphhFu3jbUh2J0QveqBeEVShj5D7afzAHehWx1RQsF9pDjaMU')
      });
      console.log('User is subscribed:', subscription);

      // Gửi đăng ký đến máy chủ backend để lưu trữ
      await saveSubscription(subscription);
    } catch (err) {
      console.log('Failed to subscribe the user: ', err);
    }
  }

  // Chuyển đổi chuỗi Base64 URL thành Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  // Gửi đăng ký thông báo đến máy chủ để lưu trữ
  async function saveSubscription(subscription) {
    try {
      await api.post('/notifications/save-subscription', subscription);
      console.log('Subscription saved successfully');
    } catch (error) {
      console.error('Failed to save subscription', error);
    }
  }

  // Gửi thông báo với tiêu đề và nội dung
  async function sendNotification(title, message, url) {
    try {
      await api.post('/notifications/send-notification', { title, message, url });
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Failed to send notification', error);
    }
  }

  // Cung cấp các phương thức và instance của axios cho toàn bộ ứng dụng
  nuxtApp.provide('api', api);
  nuxtApp.provide('sendNotification', sendNotification);
  nuxtApp.provide('urlBase64ToUint8Array', urlBase64ToUint8Array);
});
// #endregion
