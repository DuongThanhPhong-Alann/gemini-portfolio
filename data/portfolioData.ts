export interface ProjectDetail {
  id: string;
  starName: string;
  starRole: string;
  starColor: string;
  title: string;
  subtitle: string;
  url: string;
  image: string;
  summary: string;
  purpose: string;
  role: string;
  techStack: { name: string; role: string }[];
  keyFeatures: { title: string; desc: string }[];
  technicalHighlights: string[];
  metricsOrHighlights: { label: string; value: string }[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: string; desc: string }[];
}

export const PERSONAL_INFO = {
  name: "Dương Thanh Phong",
  alias: "Dương Thanh Phong",
  title: "Full-stack Developer & IT Automation",
  school: "Đại học Công nghệ TP.HCM (HUTECH)",
  major: "Công nghệ Thông tin",
  period: "2022 – 2026",
  email: "duongthanhphong1618@gmail.com",
  phone: "0827274387",
  github: "https://github.com/AlannThanhPhong",
  linkedin: "https://www.linkedin.com/in/thanh-phong-alann-4b058341b",
  bio: `Mình là Phong, sinh viên Công nghệ Thông tin tại HUTECH (2022–2026). Mình làm web full-stack và các luồng tự động hóa, thích biến yêu cầu thực tế thành sản phẩm dùng được.`,
  experienceSummary: `Mình đã làm với C#, ASP.NET Core, Next.js, React, Node.js, SQL Server, MongoDB và Supabase. Ngoài web, mình viết workflow bằng n8n, dùng Jira theo dõi công việc và thử tích hợp AI, 3D/360° vào sản phẩm.`,
  careerGoals: [
    "Tự làm trọn một sản phẩm web, từ giao diện và API đến lúc đưa lên mạng.",
    "Học thêm về thiết kế hệ thống, cloud, CI/CD và cách giữ ứng dụng chạy ổn định khi có nhiều người dùng.",
    "Tìm thêm cách dùng AI và tự động hóa để giảm các thao tác lặp trong công việc."
  ]
};

export const PROJECTS: ProjectDetail[] = [
  {
    id: "devdes",
    starName: "Castor",
    starRole: "Dự án 01",
    starColor: "#38bdf8",
    title: "DevDes",
    subtitle: "Thiết kế web, thư viện giao diện & tư vấn trực tuyến",
    url: "https://www.devdes.click/",
    image: "/assets/devdes.webp",
    summary: "DevDes nhận thiết kế và làm phần mềm cho doanh nghiệp. Trên website, khách có thể xem dịch vụ, thử các mẫu giao diện trên nhiều thiết bị rồi nhắn với đội tư vấn ngay tại chỗ.",
    purpose: "Để khách hiểu DevDes cung cấp dịch vụ gì, xem mẫu giao diện và liên hệ tư vấn ngay trên website.",
    role: "Mình phụ trách cả frontend lẫn backend: dựng ứng dụng bằng Next.js App Router, viết Route Handlers, nối MongoDB và làm phần xem trước co giãn theo màn hình.",
    techStack: [
      { name: "Next.js 16 (App Router)", role: "Dựng các trang và xử lý API trên máy chủ" },
      { name: "React 19", role: "Làm thư viện mẫu, phần xem trước và khung chat" },
      { name: "TypeScript", role: "Quản lý kiểu dữ liệu cho mẫu giao diện và tin nhắn" },
      { name: "MongoDB & Node.js Driver", role: "Lưu hội thoại và tự xóa dữ liệu hết hạn bằng TTL" },
      { name: "React Context & Hooks", role: "Dùng chung lựa chọn ngôn ngữ và xử lý chat" },
      { name: "Web APIs", role: "Đăng nhập bằng cookie, đọc tệp và thu âm trong trình duyệt" }
    ],
    keyFeatures: [
      {
        title: "1. Trang dịch vụ",
        desc: "Khách xem các dịch vụ và gói giải pháp; bộ lọc và accordion giúp tìm phần cần xem nhanh hơn."
      },
      {
        title: "2. Thư viện mẫu giao diện",
        desc: "Các mẫu được chia theo danh mục và dùng chung ở trang thư viện lẫn khung chat."
      },
      {
        title: "3. Xem trước trên nhiều thiết bị",
        desc: "Có thể xem từng mẫu ở kích thước máy tính, máy tính bảng hoặc điện thoại, rồi mở bản demo riêng."
      },
      {
        title: "4. Hỗ trợ tiếng Việt và tiếng Anh",
        desc: "Khách đổi qua lại giữa tiếng Việt và tiếng Anh; lựa chọn được lưu bằng cookie."
      },
      {
        title: "5. Khung chat tư vấn",
        desc: "Khách có thể nhắn tin, gửi ảnh hoặc tệp, ghi âm và chia sẻ mẫu giao diện ngay trong cuộc trò chuyện."
      },
      {
        title: "6. Quản lý hội thoại",
        desc: "Nhân viên xem các cuộc trò chuyện và trả lời khách từ trang quản trị riêng."
      },
      {
        title: "7. Phiên đăng nhập và dữ liệu",
        desc: "Cookie HttpOnly giữ phiên đăng nhập; giới hạn tần suất và TTL giúp kiểm soát yêu cầu, dọn dữ liệu cũ."
      },
      {
        title: "8. Chia sẻ và tìm kiếm",
        desc: "Trang có metadata khi chia sẻ, sitemap, robots.txt và font hiển thị tiếng Việt."
      }
    ],
    technicalHighlights: [
      "Tách trang, component dùng lại và phần xử lý dữ liệu thành từng khu vực riêng.",
      "Kiểm soát việc hỏi tin nhắn mới để các yêu cầu không chạy chồng lên nhau.",
      "Dùng cookie HttpOnly, SameSite và giới hạn kích thước dữ liệu gửi lên máy chủ."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 16 + React 19" },
      { label: "Lưu trữ", value: "MongoDB + TTL" },
      { label: "Ngôn ngữ", value: "Song ngữ VI / EN" },
      { label: "Chat", value: "Tin nhắn & ghi âm" }
    ]
  },
  {
    id: "loopix",
    starName: "Pollux",
    starRole: "Dự án 02",
    starColor: "#fbbf24",
    title: "Loopix Studio",
    subtitle: "Tour tham quan 360° cho khách sạn và không gian",
    url: "https://www.loopixstudio.net/",
    image: "/assets/loopix.webp",
    summary: "Loopix làm tour 360° cho khách sạn, resort, bất động sản và văn phòng. Mình xây trang để khách tự xem không gian trước khi liên hệ, kèm form gửi yêu cầu báo giá.",
    purpose: "Khách có thể xem không gian qua tour 360° trước khi gọi hỏi hoặc đến xem trực tiếp.",
    role: "Mình làm frontend bằng Next.js và React, nhúng tour 360° qua iframe và viết API nhận, kiểm tra yêu cầu báo giá.",
    techStack: [
      { name: "Next.js 16 (App Router)", role: "Dựng các trang, đường dẫn dự án và API" },
      { name: "React 19", role: "Xử lý giao diện và thao tác trên trang" },
      { name: "Virtual Tour 360°", role: "Nhúng tour của The Mango Trail và The Odys Boutique" },
      { name: "Next.js Route Handlers", role: "Nhận và kiểm tra yêu cầu tại POST /api/quote" },
      { name: "Swiper & AOS", role: "Làm slider ảnh và hiệu ứng khi cuộn trang" },
      { name: "Web Storage API", role: "Ghi nhớ ngôn ngữ người xem đã chọn" }
    ],
    keyFeatures: [
      {
        title: "1. Tour tham quan 360°",
        desc: "Khách tự xoay góc nhìn và xem các khu vực trong không gian ngay trên website."
      },
      {
        title: "2. Các loại không gian",
        desc: "Dự án được chia theo khách sạn, resort, homestay, văn phòng chung và căn hộ."
      },
      {
        title: "3. Bảng giá",
        desc: "Các gói dịch vụ được xếp theo nhóm; thanh bên cho biết người xem đang ở phần nào."
      },
      {
        title: "4. Gửi yêu cầu báo giá",
        desc: "Khách chọn thành phố, loại không gian và diện tích; website gửi thông tin để máy chủ kiểm tra."
      },
      {
        title: "5. Bài viết",
        desc: "Chuyên mục chia sẻ về tour ảo và hình ảnh trong du lịch, khách sạn, bất động sản."
      },
      {
        title: "6. Tiếng Việt và tiếng Anh",
        desc: "Website ghi nhớ ngôn ngữ đã chọn khi chuyển giữa các trang."
      }
    ],
    technicalHighlights: [
      "Dùng đường dẫn riêng cho từng dự án và tạo trước các trang chi tiết.",
      "Chỉ tải ảnh và tour 360° khi cần để trang ban đầu nhẹ hơn.",
      "Kiểm tra thông tin báo giá trên cả trình duyệt lẫn máy chủ."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 16 + React 19" },
      { label: "Tour", value: "Nhúng tour 360°" },
      { label: "Báo giá", value: "POST /api/quote" },
      { label: "Ngôn ngữ", value: "Song ngữ VI / EN" }
    ]
  },
  {
    id: "sense",
    starName: "Alhena",
    starRole: "Dự án 03",
    starColor: "#c084fc",
    title: "Sense & Scene Studio",
    subtitle: "Portfolio cho studio CGI & motion design",
    url: "https://sensescene.studio/",
    image: "/assets/sense.webp",
    summary: "Trang portfolio cho Sense & Scene, studio chuyên CGI, motion design và không gian số. Mình làm trang cuộn dài để trưng bày tác phẩm, với nội dung bằng 5 ngôn ngữ.",
    purpose: "Giúp studio trưng bày các dự án và giới thiệu phong cách hình ảnh của mình bằng một portfolio có chuyển động và nhạc nền.",
    role: "Mình làm frontend, dựng chuyển động bằng GSAP và ScrollTrigger, thêm trình phát nhạc và hỗ trợ 5 ngôn ngữ.",
    techStack: [
      { name: "Next.js 15 (App Router)", role: "Dựng trang và tải ảnh, font bằng công cụ của Next.js" },
      { name: "React 19 & TypeScript 5", role: "Quản lý giao diện, trình phát nhạc và ngôn ngữ" },
      { name: "GSAP 3 & ScrollTrigger", role: "Điều khiển chuyển động theo thao tác cuộn" },
      { name: "CSS thuần & clamp()", role: "Dàn trang bằng Grid, Flexbox và cỡ chữ co giãn" },
      { name: "HTMLMediaElement", role: "Phát 4 bài nhạc và hiển thị nhịp âm thanh" },
      { name: "Browser APIs", role: "Tải video khi cần và dừng nhạc khi ẩn tab" }
    ],
    keyFeatures: [
      {
        title: "1. Màn hình mở đầu",
        desc: "Phần đầu trang có video, chữ lớn và đồng hồ chạy theo giờ Sài Gòn."
      },
      {
        title: "2. Chuyển động theo thao tác cuộn",
        desc: "GSAP điều khiển các đoạn chuyển cảnh khi người xem cuộn trang và rê chuột."
      },
      {
        title: "3. Nhạc nền",
        desc: "Người xem có thể bật nhạc, tạm dừng hoặc chuyển giữa 4 bài."
      },
      {
        title: "4. Năm ngôn ngữ",
        desc: "Nội dung có tiếng Việt, Anh, Trung, Nhật và Hàn."
      },
      {
        title: "5. Điều chỉnh chuyển động",
        desc: "Trang giảm bớt chuyển động khi thiết bị yếu hoặc người xem bật chế độ giảm hiệu ứng."
      },
      {
        title: "6. Tải nội dung khi cần",
        desc: "Video chỉ tải khi sắp xuất hiện trên màn hình; nhạc và video dừng khi tab bị ẩn."
      }
    ],
    technicalHighlights: [
      "Dọn listener, observer và animation khi rời khỏi trang.",
      "Dừng âm thanh và video khi người xem chuyển sang tab khác.",
      "Dùng clamp() để chữ thay đổi theo kích thước màn hình."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 15 + React 19" },
      { label: "Animation", value: "GSAP 3 & ScrollTrigger" },
      { label: "Ngôn ngữ", value: "VI / EN / ZH / JA / KO" },
      { label: "Chuyển động", value: "Có chế độ giảm hiệu ứng" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Lập trình & Nền tảng",
    skills: [
      { name: "C#", level: "Thành thạo", desc: "OOP, ASP.NET Core, LINQ, Entity Framework" },
      { name: "JavaScript / TypeScript", level: "Thành thạo", desc: "ES6+, async/await và kiểm tra kiểu dữ liệu" },
      { name: "HTML5 & CSS3", level: "Thành thạo", desc: "HTML ngữ nghĩa, Flexbox, Grid và giao diện co giãn" },
      { name: "Node.js", level: "Khá", desc: "REST API, Route Handlers và script tự động hóa" }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "Next.js (App Router)", level: "Chuyên sâu", desc: "SSR, SSG, Route Handlers và metadata" },
      { name: "React 18 / 19", level: "Chuyên sâu", desc: "Hooks, Context và component dùng lại" },
      { name: "Tailwind CSS", level: "Thành thạo", desc: "Responsive, theme riêng và giao diện kính mờ" },
      { name: "Framer Motion & GSAP", level: "Khá", desc: "Chuyển động khi cuộn và tương tác nhỏ" }
    ]
  },
  {
    category: "Backend & Cơ sở Dữ liệu",
    skills: [
      { name: "ASP.NET Core", level: "Thành thạo", desc: "Web API, Dependency Injection, JWT" },
      { name: "SQL Server", level: "Thành thạo", desc: "Cơ sở dữ liệu quan hệ, thủ tục lưu và truy vấn" },
      { name: "Supabase & PostgreSQL", level: "Khá", desc: "RLS, cập nhật dữ liệu trực tiếp và hàm cơ sở dữ liệu" },
      { name: "MongoDB", level: "Khá", desc: "Thiết kế dữ liệu, aggregation và TTL index" }
    ]
  },
  {
    category: "Tự động hóa & Công cụ",
    skills: [
      { name: "n8n Automation", level: "Chuyên sâu", desc: "Workflow, thu thập dữ liệu và webhook" },
      { name: "Jira / Scrum", level: "Thành thạo", desc: "Theo dõi sprint, chia việc và làm theo Agile" },
      { name: "Git & GitHub", level: "Thành thạo", desc: "Nhánh, pull request và GitHub Actions cơ bản" },
      { name: "3D/360° & AI", level: "Thực hành", desc: "Three.js, WebGL, tour 360° và Gemini API" }
    ]
  }
];

export const CONSTELLATION_NODES = [
  { id: "hero", starName: "Song Tử", subtitle: "Giới thiệu", desc: "Tổng quan chòm sao", isProject: false },
    { id: "devdes", starName: "Castor", subtitle: "DevDes", desc: "Website dịch vụ và tư vấn trực tuyến", isProject: true },
    { id: "loopix", starName: "Pollux", subtitle: "Loopix Studio", desc: "Tour tham quan 360°", isProject: true },
    { id: "sense", starName: "Alhena", subtitle: "Sense & Scene", desc: "Portfolio studio và chuyển động hình ảnh", isProject: true },
    { id: "skills", starName: "Wasat", subtitle: "Kỹ năng", desc: "Công nghệ mình đã dùng", isProject: false },
    { id: "education", starName: "Mebsuta", subtitle: "Học vấn", desc: "Học tập và hướng phát triển", isProject: false },
    { id: "contact", starName: "Propus", subtitle: "Liên hệ", desc: "Email, điện thoại và hồ sơ", isProject: false }
];
