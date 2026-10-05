# Dương Thanh Phong — A Gemini Universe

Portfolio tiếng Việt lấy cảm hứng từ chòm sao Song Tử. Mã nguồn tĩnh, không cần cài thư viện hoặc build.

## Xem trên máy

Yêu cầu Node.js. Trong thư mục này, chạy:

```powershell
node serve.mjs
```

Mở http://localhost:4173. Nhấn Ctrl+C để dừng. Có thể đổi cổng bằng biến môi trường `PORT`.

## Chỉnh nội dung

- `dist/index.html`: giới thiệu, kỹ năng, hành trình và thông tin liên hệ.
- `dist/app.js`: dữ liệu chi tiết ba dự án và tương tác.
- `dist/styles.css`: giao diện và bố cục responsive.
- `dist/assets/`: ảnh chụp các website dự án.

## Trải nghiệm

- Canvas nền sao có phép chiếu phối cảnh; camera thay đổi theo cuộn, parallax theo chuột.
- Bản đồ Song Tử với các ngôi sao mở chi tiết dự án; dùng được bằng bàn phím và cảm ứng.
- Hộp thoại dự án, xem dự án trước/sau, Escape để đóng và trả focus về nút mở.
- Menu di động, liên kết liên hệ và sao chép email có xử lý khi clipboard không khả dụng.
- Tôn trọng `prefers-reduced-motion`, có nút tạm dừng chuyển động; dừng animation khi tab bị ẩn.

Nội dung dự án dựa trên tài liệu người dùng cung cấp; không thêm số liệu, kinh nghiệm hoặc vai trò cá nhân chưa được xác nhận. Loopix tích hợp tour có sẵn; API báo giá hiện kiểm tra dữ liệu, chưa lưu/gửi email. Sense & Scene trình bày nội dung CGI/360° bằng media, không phải công cụ dựng 3D.

## Hosting

Thư mục public là `dist`. Có thể host trên dịch vụ static hosting bất kỳ. `.openai/hosting.json` lưu cấu hình Sites; không chứa thông tin bí mật. Không có backend hay biểu mẫu giả gửi thành công; các nút liên hệ dùng mailto, điện thoại hoặc liên kết trực tiếp.

Ảnh dự án được chụp từ ba website do người dùng cung cấp. Bố cục và mã nguồn portfolio được xây mới; trang tham khảo được dùng để nghiên cứu hiệu ứng phối cảnh theo cuộn.
