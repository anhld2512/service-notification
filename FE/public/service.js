//#region AnhLd Hướng dẫn
// Đăng ký sự kiện 'push' cho Service Worker, sự kiện này sẽ kích hoạt khi có thông báo push được nhận.
self.addEventListener('push', function(event) {
    // Chuyển đổi dữ liệu của sự kiện push từ dạng chuỗi JSON sang đối tượng JavaScript.
    const data = event.data.json();

    // Đặt tiêu đề của thông báo. Nếu không có tiêu đề trong dữ liệu, sử dụng 'Default Title'.
    const title = data.title || 'Default Title';

    // Thiết lập các tùy chọn cho thông báo, bao gồm nội dung, biểu tượng, biểu tượng nhỏ và URL.
    const options = {
      body: data.message || 'Default message body', // Nội dung của thông báo
      icon: '/logo/logo_250x250.png', // Đường dẫn tới biểu tượng của bạn
      badge: '/logo/logo_250x250.png', // Đường dẫn tới biểu tượng nhỏ của bạn
      data: {
        url: data.url || '/' // Đảm bảo rằng URL được bao gồm trong dữ liệu thông báo
      }
    };

    // Hiển thị thông báo với tiêu đề và các tùy chọn đã thiết lập.
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
});
//#endregion

//#region AnhLd Hướng dẫn
// Đăng ký sự kiện 'notificationclick' cho Service Worker, sự kiện này sẽ kích hoạt khi người dùng nhấp vào thông báo.
self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    // Đóng thông báo khi người dùng nhấp vào nó.
    event.notification.close();

    // Mở URL được chứa trong dữ liệu thông báo.
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
//#endregion
