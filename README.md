# Dương Thanh Phong — Gemini Universe 3D Portfolio

Website Portfolio 3D lấy cảm hứng từ **Chòm sao Song Tử (Gemini Constellation)**, được phát triển bằng **Next.js 15 (App Router) + Tailwind CSS + Framer Motion + Three.js + GSAP**.

Hiệu ứng camera di chuyển mượt mà giữa các ngôi sao trong không gian 3D tương tự như trải nghiệm tham quan của `https://hoanggiang-portfolio.vercel.app/`, nhưng được chuyển thể thành hành trình du hành vũ trụ giữa các vì tinh tú của chòm sao Song Tử.

---

## 🌟 Hành trình Chòm sao Song Tử (7 Waypoints)

1. **Khởi nguyên (Gemini Nexus)**: Toàn cảnh chòm sao Song Tử với hai nhánh song sinh (Castor & Pollux) tỏa sáng rực rỡ trong mây tinh vân vũ trụ.
2. **Ngôi sao 01 — Castor (Alpha Geminorum)**: Dự án **DevDes** (Website dịch vụ số, thư viện UI đa thiết bị, hệ thống chat realtime MongoDB).
3. **Ngôi sao 02 — Pollux (Beta Geminorum)**: Dự án **Loopix Studio** (Nền tảng Virtual Tour 360°, nhúng trải nghiệm tương tác 360°, API báo giá hai chiều).
4. **Ngôi sao 03 — Alhena (Gamma Geminorum)**: Dự án **Sense & Scene Studio** (Studio sáng tạo nghệ thuật thị giác, GSAP ScrollTrigger, 5 ngôn ngữ, trình phát nhạc Ambient).
5. **Ngôi sao 04 — Wasat (Delta Geminorum)**: Tâm điểm kỹ thuật & Hệ sinh thái kỹ năng (C#, ASP.NET Core, Next.js, React, SQL Server, Supabase, n8n, Jira).
6. **Ngôi sao 05 — Mebsuta (Epsilon Geminorum)**: Học vấn Đại học Công nghệ TP.HCM (HUTECH 2022–2026) & Tầm nhìn System Design, Cloud, Automation.
7. **Ngôi sao 06 — Propus (Chân Song Tử)**: Trạm phát tín hiệu vũ trụ (Liên hệ qua Email, Điện thoại, GitHub, LinkedIn).

---

## 🚀 Hướng dẫn Cài đặt & Chạy trên máy

Yêu cầu: **Node.js 18+** hoặc mới hơn.

### 1. Khởi động môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:3000`

### 2. Build & Chạy bản Production
```bash
npm run build
npm run start
```

---

## 🎮 Cách tương tác trên Portfolio

- **Cuộn chuột (Scroll)**: Camera 3D sẽ lướt theo quỹ đạo ánh sáng từ ngôi sao này sang ngôi sao tiếp theo.
- **Bản đồ Song Tử (Minimap góc trái dưới)**: Bấm trực tiếp vào các ngôi sao trên sơ đồ 2D để camera bay ngay đến tọa độ đó.
- **Thanh điều hướng & Phím tắt**:
  - Phím mũi tên `↓` hoặc `PageDown`: Tiến tới ngôi sao tiếp theo.
  - Phím mũi tên `↑` hoặc `PageUp`: Quay lại ngôi sao trước.
  - Các phím số `1` đến `7`: Nhảy trực tiếp đến các chặng vũ trụ.
- **Âm thanh vũ trụ (Web Audio API)**: Bấm biểu tượng loa ở góc trên để bật/tắt tiếng chuông tinh thể du hành vũ trụ.
- **Màn hình 3D Hologram**: Click trực tiếp vào màn hình 3D trong không gian vũ trụ để mở chi tiết Case Study.
