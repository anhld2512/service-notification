
# README.md

## Hướng dẫn triển khai dịch vụ thông báo đẩy

### Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Yêu cầu](#yêu-cầu)
3. [Hướng dẫn Backend](#hướng-dẫn-backend)
    - [Cài đặt](#cài-đặt-backend)
    - [Cấu hình VAPID](#cấu-hình-vapid)
    - [Khởi động](#khởi-động-backend)
4. [Hướng dẫn Frontend](#hướng-dẫn-frontend)
    - [Cài đặt](#cài-đặt-frontend)
    - [Cấu hình](#cấu-hình-frontend)
    - [Build dự án](#build-dự-án)
5. [Liên hệ](#liên-hệ)

## Giới thiệu
Hướng dẫn này sẽ giúp bạn triển khai dịch vụ thông báo đẩy cho ứng dụng của bạn bao gồm cả phần Backend và Frontend.

## Yêu cầu
- Node.js và npm được cài đặt trên hệ thống của bạn.
- Trình quản lý gói npm.

## Hướng dẫn Backend

### Cài đặt Backend
1. Chuyển đến thư mục dự án Backend của bạn.
2. Chạy lệnh sau để cài đặt các dependencies:
    ```sh
    npm install
    ```

### Cấu hình VAPID
1. Mở Terminal hoặc CMD và chạy lệnh sau để tạo khóa VAPID:
    ```sh
    npx web-push generate-vapid-keys
    ```
2. Lưu lại các khóa VAPID (khóa công khai và khóa riêng tư) được tạo ra.
3. Mở file cấu hình backend và cấu hình các chi tiết VAPID như sau:
    ```javascript
    const vapidKeys = {
      publicKey: '<YOUR_PUBLIC_KEY>',
      privateKey: '<YOUR_PRIVATE_KEY>'
    };

    webPush.setVapidDetails(
      'mailto:anh.leduc2512@gmail.com',  // Email liên hệ
      vapidKeys.publicKey,               // Khóa công khai
      vapidKeys.privateKey               // Khóa riêng tư
    );
    ```

### Khởi động Backend
1. Chạy lệnh sau để khởi động server backend:
    ```sh
    npm start
    ```

## Hướng dẫn Frontend

### Cài đặt Frontend
1. Chuyển đến thư mục dự án Frontend của bạn.
2. Chạy lệnh sau để cài đặt các dependencies:
    ```sh
    npm install
    ```

### Cấu hình Frontend
1. Mở file cấu hình frontend.
2. Thay thế giá trị `process.env.SECRETPUBLIC_KEY` bằng khóa công khai VAPID (`publicKey`) mà bạn đã tạo ở phần Backend.
    ```javascript
    const publicKey = '<YOUR_PUBLIC_KEY>';
    ```
3. Thay thế giá trị `baseURL` bằng URL API của bạn:
    ```javascript
    const baseURL = '<YOUR_API_URL>';
    ```

### Build dự án
1. Chạy lệnh sau để build dự án Frontend:
    ```sh
    npm run build
    ```

## Liên hệ
- Email: anh.leduc2512@gmail.com
- Chi tiết xem tại video demo

