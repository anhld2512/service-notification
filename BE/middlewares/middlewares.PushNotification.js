//#region AnhLd Hướng dẫn

// Yêu cầu module web-push cho thông báo đẩy
const webPush = require('web-push');

// ======> Open Terminal or CMD : npx web-push generate-vapid-keys
// Tạo và lưu trữ khóa VAPID (khóa công khai và khóa riêng tư) để sử dụng trong dịch vụ thông báo đẩy
const vapidKeys = {
  publicKey: '',
  privateKey: ''
};

// Thiết lập chi tiết VAPID để xác thực thông báo đẩy với dịch vụ push
webPush.setVapidDetails(
  'mailto:anh.leduc2512@gmail.com',  // Email liên hệ
  vapidKeys.publicKey,               // Khóa công khai
  vapidKeys.privateKey               // Khóa riêng tư
);

// Tạo mảng để lưu trữ các đăng ký thông báo
const subscriptions = [];

// Hàm saveSubscription lưu trữ đăng ký thông báo từ client
const saveSubscription = (req, res) => {
  const subscription = req.body;  // Nhận đăng ký từ yêu cầu HTTP POST
  subscriptions.push(subscription); // Lưu đăng ký vào mảng subscriptions
  res.status(201).json({}); // Phản hồi thành công với mã trạng thái 201
};

// Hàm sendNotification gửi thông báo tới tất cả các đăng ký
const sendNotification = (req, res) => {
  const { title, message, url } = req.body; // Lấy dữ liệu thông báo từ yêu cầu HTTP POST

  // Tạo payload (dữ liệu) cho thông báo
  const payload = JSON.stringify({
    title: title || 'Default Title',            // Tiêu đề thông báo
    message: message || 'Default message body', // Nội dung thông báo
    url: url || 'https://jobspeeds.com/job'     // URL đính kèm trong thông báo
  });

  // Tùy chọn cho thông báo
  const options = {
    TTL: 60 // Thời gian sống của thông báo (Time to Live)
  };

  // Gửi thông báo đến từng đăng ký
  const sendNotificationPromises = subscriptions.map(subscription => {
    return webPush.sendNotification(subscription, payload, options)
      .then(response => {
        console.log('Sent notification', response); // In ra thông báo đã gửi thành công
      })
      .catch(error => {
        console.error('Error sending notification', error); // In ra lỗi nếu có
      });
  });

  // Đợi tất cả thông báo được gửi xong
  Promise.all(sendNotificationPromises)
    .then(() => res.status(200).json({ message: 'Notifications sent' })) // Phản hồi thành công
    .catch(error => res.status(500).json({ error: error.message }));     // Phản hồi lỗi nếu có
};

// Xuất các hàm để sử dụng trong các file khác
module.exports = {
  saveSubscription,
  sendNotification
};

//#endregion
