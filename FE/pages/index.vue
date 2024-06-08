<template>
  <!-- // #region AnhLd Hướng dẫn -->
  <!-- Container cho toàn bộ phần tử -->
  <div class="container mx-auto max-w-xl px-3 text-center">
    <!-- Vùng chứa với viền nét đứt và khoảng cách giữa các phần tử -->
    <div class="border-dashed border-2 border-primary rounded-xl w-full gap-6 p-5">
      <!-- Thanh chứa các nút và tiêu đề -->
      <div class="flex items-center justify-between mb-3">
        <!-- Nút đăng ký thông báo -->
        <button @click="registerForPushNotifications" class="btn btn-sm btn-circle btn-error mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell text-lg"
            viewBox="0 0 16 16">
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
        </button>
        <!-- Tiêu đề thông báo đẩy -->
        <h3 class="text-xl font-black">Push Notification</h3>
        <!-- Nút gửi thông báo -->
        <button @click="sendNotification" class="btn btn-sm btn-accent my-2">
          <div class="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-send-chec text-lg" viewBox="0 0 16 16">
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z" />
              <path
                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
            </svg>
            <span>Send</span>
          </div>
        </button>
      </div>
      <!-- Vùng nhập thông tin thông báo -->
      <div class="flex-row flex-wrap gap-6">
        <!-- Nhập tiêu đề thông báo -->
        <input v-model="notificationTitle" type="text" placeholder="Notification Title"
          class="input input-bordered mb-3 w-full">
        <!-- Nhập nội dung thông báo -->
        <input v-model="notificationMessage" type="text" placeholder="Notification Body"
          class="input input-bordered mb-3 w-full">
        <!-- Nhập URL thông báo -->
        <input v-model="notificationUrl" placeholder="Enter notification URL"
          class="input input-bordered mb-3 w-full" />
      </div>
    </div>
  </div>
  <!-- Modal hiển thị thông báo lỗi hoặc cảnh báo -->
  <ModalDialogMessage ref="modalMessage" />
  <!-- // #endregion -->
</template>

<script setup>
//#region AnhLd Hướng dẫn
// Khai báo các biến và hàm cần thiết từ NuxtApp
const { $api, $urlBase64ToUint8Array, $sendNotification } = useNuxtApp();

// Khai báo các biến reative cho tiêu đề, nội dung và URL thông báo
const notificationTitle = ref('');
const notificationMessage = ref('');
const notificationUrl = ref('');
const modalMessage = ref(null)

// Hàm đăng ký thông báo đẩy
const registerForPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Đăng ký hoặc lấy Service Worker hiện tại
      const swReg = await navigator.serviceWorker.register('/service.js');
      // Yêu cầu quyền hiển thị thông báo
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        registerForPushNotifications()
        return;
      }
      // Kiểm tra nếu đã có đăng ký
      let subscription = await swReg.pushManager.getSubscription();
      if (!subscription) {
        // Tạo đăng ký mới
        subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: $urlBase64ToUint8Array(process.env.SECRETPUBLIC_KEY || 'BA5xnicrkH0hO5H0Y3cK5AAik0G_j62c8mukA0eYjhQ9ShDxDvh9gksXEL-VRMoZaeT2bDh2y_1Wi2C3ro9d_9E')
        });
      }
      // Gửi đăng ký lên server
      await $api.post('/notifications/save-subscription', subscription);
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
      modalMessage.value.openDialog('Failed', 'Failed to subscribe the user.');
    }
  } else {
    modalMessage.value.openDialog('Warning', 'Push messaging is not supported.');
  }
};

// Hàm gửi thông báo đẩy
const sendNotification = async () => {
  const title = notificationTitle.value.trim() || 'JobSpeed';
  const message = notificationMessage.value.trim() || 'You have a new notification from JobSpeed';
  const url = notificationUrl.value.trim() || 'https://default.url';
  $sendNotification(title, message, url);
};

// Hàm khởi tạo khi component được mount
onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
      registerForPushNotifications();
    }, 1);
  });
});
//#endregion
</script>
