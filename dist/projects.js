export const projects = [
  {
    id: 'devdes', name: 'DevDes', category: 'WEB PLATFORM / FULL-STACK', image: 'devdes.webp', url: 'https://www.devdes.click/',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'CSS', 'React Context'],
    summary: 'Website giới thiệu dịch vụ thiết kế và phát triển sản phẩm số, kết hợp thư viện giao diện có thể xem trước và hệ thống chat tư vấn khách hàng.',
    purpose: 'Kết nối toàn bộ hành trình tìm hiểu dịch vụ, lựa chọn mẫu thiết kế và trao đổi nhu cầu. Người dùng có thể xem giao diện trên nhiều kích thước thiết bị, sau đó chia sẻ chính mẫu đó trong cuộc hội thoại tư vấn.',
    features: [
      'Thư viện giao diện với bộ lọc danh mục, trang chi tiết và khung xem trước desktop, tablet, mobile.',
      'Nội dung Việt–Anh, quản lý ngôn ngữ qua React Context và cookie.',
      'Chat tư vấn hỗ trợ văn bản, ảnh, video, ghi âm, emoji và chia sẻ mẫu giao diện. Hội thoại được lưu trong MongoDB.',
      'Khu vực quản trị để theo dõi hội thoại và phản hồi khách hàng; kiểm tra phiên, dữ liệu đầu vào và giới hạn tần suất thao tác.',
      'Cập nhật hội thoại bằng polling, tránh yêu cầu chồng chéo và phản hồi cũ ghi đè dữ liệu mới.',
      'Thiết kế responsive, metadata, sitemap và chính sách thu thập dữ liệu theo từng nhóm đường dẫn.'
    ],
    technical: 'Mã nguồn tách thành app, components và lib. Route Handlers kiểm tra yêu cầu, xác thực phiên và ghi dữ liệu; React quản lý trạng thái bất đồng bộ, lỗi kết nối và nội dung soạn thảo. MongoDB index hỗ trợ truy vấn và tự dọn dữ liệu hết hạn.',
    takeaway: 'Kết hợp giao diện và backend trong một luồng sản phẩm thực tế; xây dựng component tái sử dụng, API, quản lý phiên và trải nghiệm đa ngôn ngữ.'
  },
  {
    id: 'loopix', name: 'Loopix Studio', category: 'VIRTUAL EXPERIENCE / WEB DEVELOPMENT', image: 'loopix.webp', url: 'https://www.loopixstudio.net/',
    stack: ['Next.js 16', 'React 19', 'JavaScript', 'Swiper', 'AOS', 'Route Handlers', 'Virtual Tour 360°'],
    summary: 'Website dịch vụ số hóa không gian và Virtual Tour 360° dành cho lưu trú, bất động sản, giáo dục và không gian làm việc.',
    purpose: 'Giúp người xem hình dung mối liên kết giữa các khu vực trong không gian, trải nghiệm tour ngay trên trình duyệt và tìm hiểu giải pháp trước khi gửi nhu cầu tư vấn.',
    features: [
      'Danh mục không gian với trang chi tiết dự án, trang tour, bảng giá dịch vụ và chuyên mục Magazine.',
      'Tích hợp các bộ Virtual Tour 360° có sẵn bằng iframe, gồm The Mango Trail và The Odys Boutique; điều chỉnh giao diện theo nhận diện Loopix.',
      'Bảng giá theo nhóm lưu trú, giáo dục, co-working và dịch vụ bổ sung; điều hướng theo vị trí cuộn.',
      'Biểu mẫu báo giá gửi bất đồng bộ đến API, kiểm tra thông tin liên hệ ở cả client và server.',
      'Nội dung Việt–Anh và lưu lựa chọn ngôn ngữ bằng Web Storage.',
      'Giao diện responsive, chuyển ảnh, hiệu ứng xuất hiện, lazy loading hình ảnh và iframe.'
    ],
    technical: 'Next.js App Router tổ chức /pricing, /projects/[slug], /tours/[slug] và /magazine/[slug]. Dữ liệu tĩnh và generateStaticParams phục vụ các nội dung đã biết. Endpoint POST /api/quote xử lý kiểm tra biểu mẫu và trả phản hồi JSON.',
    takeaway: 'Phát triển website dịch vụ nhiều loại nội dung, tích hợp trải nghiệm 360°, đồng bộ nhận diện thương hiệu và kết nối giao diện với API.',
    note: 'Phạm vi hiện tại: tour được tích hợp từ bộ tour có sẵn. API báo giá kiểm tra dữ liệu và trả phản hồi, chưa lưu yêu cầu hoặc gửi email/CRM; nội dung được quản lý trong mã nguồn.'
  },
  {
    id: 'sense', name: 'Sense & Scene Studio', category: 'CREATIVE DEVELOPMENT / MOTION', image: 'sense.webp', url: 'https://sensescene.studio/',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'GSAP', 'ScrollTrigger', 'CSS', 'Browser APIs'],
    summary: 'Website giới thiệu studio sáng tạo đa ngôn ngữ, kết hợp typography, hình ảnh, video và chuyển động tương tác để thể hiện bản sắc thương hiệu.',
    purpose: 'Tạo hành trình liền mạch từ nhận diện studio đến tìm hiểu dịch vụ, khám phá dự án và liên hệ. Cân bằng trải nghiệm thị giác với khả năng sử dụng trên các thiết bị có cấu hình khác nhau.',
    features: [
      'Bố cục một trang cuộn gồm giới thiệu, dịch vụ, dự án chọn lọc, thông tin studio và liên hệ.',
      'GSAP Timeline và ScrollTrigger điều phối hiệu ứng chữ, xuất hiện nội dung, phản hồi con trỏ và chuyển động theo cuộn.',
      'Năm ngôn ngữ: tiếng Việt, Anh, Trung, Nhật và Hàn; ghi nhớ lựa chọn bằng Local Storage.',
      'Trưng bày dự án bằng hình ảnh/video, chuyển nội dung xem trước và giao diện thích ứng với cảm ứng.',
      'Trình phát nhạc có danh sách bài, phát/tạm dừng, chuyển bài và lựa chọn lặp lại.',
      'Trì hoãn tải video bằng Intersection Observer, tạm dừng media khi không hiển thị và điều chỉnh hiệu ứng theo thiết bị.'
    ],
    technical: 'React hooks quản lý trạng thái và vòng đời. Intersection Observer, Page Visibility và Media Queries giúp kiểm soát tài nguyên, giảm chuyển động và dọn dẹp listener/animation khi không còn cần thiết. Next/Image, Next/Font và metadata hỗ trợ phân phối nội dung.',
    takeaway: 'Kết hợp phát triển giao diện sáng tạo, animation, đa ngôn ngữ và điều khiển media; chú trọng khả năng truy cập và sử dụng tài nguyên hợp lý.',
    note: 'Phạm vi hiện tại: CGI và Virtual360 là nội dung studio giới thiệu qua hình ảnh/video; website không triển khai công cụ dựng 3D hoặc trình xem 360° tương tác riêng.'
  }
];

