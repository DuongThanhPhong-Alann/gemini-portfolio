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
  bio: `Tôi là Dương Thanh Phong, sinh viên ngành Công nghệ Thông tin tại Đại học Công nghệ TP.HCM (HUTECH), khóa 2022–2026. Định hướng phát triển của tôi tập trung vào Web Development, Full-stack và IT Automation, với mong muốn xây dựng các sản phẩm phần mềm có tính ứng dụng thực tế cao.`,
  experienceSummary: `Tôi có kinh nghiệm làm việc với C#, ASP.NET Core, Next.js, React, Node.js, SQL Server, MongoDB và Supabase. Bên cạnh việc lập trình frontend/backend, tôi còn xây dựng các quy trình tự động hóa bằng n8n, quản lý công việc với Jira, và tiếp cận các giải pháp tích hợp AI, công nghệ 3D/360°.`,
  careerGoals: [
    "Trở thành Full-stack Developer có năng lực xây dựng và triển khai độc lập các sản phẩm web hoàn chỉnh.",
    "Mở rộng kiến thức về System Design, Cloud Architecture, CI/CD và tối ưu hóa hiệu năng hệ thống.",
    "Nghiên cứu ứng dụng thực tế của AI workflows và tự động hóa để giải quyết các bài toán vận hành doanh nghiệp."
  ]
};

export const PROJECTS: ProjectDetail[] = [
  {
    id: "devdes",
    starName: "Castor",
    starRole: "Dự án 01",
    starColor: "#38bdf8",
    title: "DevDes",
    subtitle: "Dịch vụ số, Thư viện UI & Hệ thống Tư vấn Khách hàng",
    url: "https://www.devdes.click/",
    image: "/assets/devdes.webp",
    summary: "Website giới thiệu dịch vụ thiết kế và phát triển phần mềm cho doanh nghiệp. Hệ thống kết hợp trang giới thiệu dịch vụ, thư viện giao diện xem trước trên nhiều thiết bị và luồng chat tư vấn khách hàng kết nối MongoDB.",
    purpose: "Giúp khách hàng tìm hiểu giải pháp, khám phá mẫu thiết kế và trực tiếp trao đổi với đội ngũ tư vấn ngay trên một luồng trải nghiệm liền mạch.",
    role: "Full-stack Developer: Xây dựng cấu trúc trang với Next.js App Router, thiết kế API Route Handlers, kết nối cơ sở dữ liệu MongoDB và hoàn thiện giao diện xem trước responsive.",
    techStack: [
      { name: "Next.js 16 (App Router)", role: "Tổ chức trang, layout và API Route Handlers phía máy chủ" },
      { name: "React 19", role: "Xây dựng các component tương tác, chuyển đổi thiết bị và khung chat" },
      { name: "TypeScript", role: "Định nghĩa kiểu dữ liệu cho mẫu giao diện, phiên làm việc và tin nhắn" },
      { name: "MongoDB & Node.js Driver", role: "Lưu trữ dữ liệu hội thoại, tin nhắn với TTL index tự dọn dẹp" },
      { name: "React Context & Hooks", role: "Quản lý ngôn ngữ dùng chung và đóng gói logic xử lý chat" },
      { name: "Web APIs", role: "Cookie auth, FileReader đọc tệp và MediaRecorder ghi âm" }
    ],
    keyFeatures: [
      {
        title: "1. Trang giới thiệu thương hiệu và dịch vụ",
        desc: "Bố cục rõ ràng, màu nền chuyển đổi theo vị trí cuộn, accordion và bộ lọc giúp người truy cập nhanh chóng nắm bắt các gói giải pháp."
      },
      {
        title: "2. Thư viện mẫu giao diện",
        desc: "Danh sách mẫu giao diện phân loại theo danh mục, tổ chức dữ liệu bằng TypeScript giúp dùng chung giữa các trang và trong khung chat."
      },
      {
        title: "3. Xem trước trên nhiều thiết bị",
        desc: "Chuyển đổi khung xem trước tức thì giữa Desktop, Tablet và Mobile; hỗ trợ mở trang demo riêng bằng iframe."
      },
      {
        title: "4. Hỗ trợ tiếng Việt và tiếng Anh",
        desc: "Chuyển đổi ngôn ngữ linh hoạt, lưu lựa chọn bằng cookie và đọc ở server-side để tối ưu hiển thị ban đầu."
      },
      {
        title: "5. Chat tư vấn khách hàng đa phương tiện",
        desc: "Hỗ trợ nhắn tin văn bản, gửi file, ảnh, video, ghi âm trực tiếp và chia sẻ thẻ mẫu thiết kế ngay trong hội thoại."
      },
      {
        title: "6. Trang quản trị hội thoại",
        desc: "Khu vực quản trị riêng để nhân viên theo dõi danh sách khách hàng cần tư vấn và phản hồi nhanh chóng."
      },
      {
        title: "7. Quản lý phiên & Kiểm soát truy cập",
        desc: "Xác thực phiên với cookie HttpOnly, kiểm tra giới hạn tần suất thao tác và tự động dọn dẹp dữ liệu hết hạn bằng MongoDB TTL."
      },
      {
        title: "8. Tối ưu SEO & Metadata",
        desc: "Khai báo Open Graph, tự động tạo Sitemap và Robots.txt, tối ưu hóa hiển thị font tiếng Việt."
      }
    ],
    technicalHighlights: [
      "Kiến trúc phân tầng rõ ràng giữa App Router, components dùng lại và thư viện xử lý logic dữ liệu.",
      "Cơ chế polling tin nhắn thông minh có kiểm soát để tránh gửi yêu cầu chồng chéo.",
      "Bảo mật cookie HttpOnly, SameSite và kiểm tra kích thước payload ở phía máy chủ."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 16 + React 19" },
      { label: "Cơ sở dữ liệu", value: "MongoDB + TTL Index" },
      { label: "Ngôn ngữ", value: "Song ngữ VI / EN" },
      { label: "Tư vấn", value: "Chat Realtime & Audio" }
    ]
  },
  {
    id: "loopix",
    starName: "Pollux",
    starRole: "Dự án 02",
    starColor: "#fbbf24",
    title: "Loopix Studio",
    subtitle: "Website Giới thiệu Dịch vụ Virtual Tour 360°",
    url: "https://www.loopixstudio.net/",
    image: "/assets/loopix.webp",
    summary: "Website giới thiệu dịch vụ số hóa không gian và tham quan thực tế ảo 360° cho khách sạn, khu nghỉ dưỡng, bất động sản và không gian làm việc.",
    purpose: "Giúp khách hàng hình dung toàn diện về không gian thông qua trải nghiệm tham quan trực tuyến trước khi liên hệ hoặc đến xem thực tế.",
    role: "Frontend Developer: Phát triển giao diện bằng Next.js và React, tích hợp các bộ tour 360° có sẵn qua iframe tùy biến, xây dựng API kiểm tra dữ liệu biểu mẫu báo giá.",
    techStack: [
      { name: "Next.js 16 (App Router)", role: "Tổ chức các trang, layout, route động và API trong cùng ứng dụng" },
      { name: "React 19", role: "Xây dựng các thành phần giao diện và xử lý tương tác phía trình duyệt" },
      { name: "Virtual Tour 360°", role: "Tích hợp và tùy biến giao diện tour The Mango Trail và The Odys Boutique" },
      { name: "Next.js Route Handlers", role: "Endpoint POST /api/quote kiểm tra và xác thực dữ liệu báo giá" },
      { name: "Swiper & AOS", role: "Slider hình ảnh trình diễn và hiệu ứng xuất hiện theo thao tác cuộn" },
      { name: "Web Storage API", role: "Lưu tùy chọn ngôn ngữ và trạng thái phục vụ trải nghiệm người dùng" }
    ],
    keyFeatures: [
      {
        title: "1. Trải nghiệm Virtual Tour 360°",
        desc: "Nhúng các bộ tour thực tế ảo trực tiếp vào giao diện, cho phép khách hàng tương tác và chuyển góc nhìn toàn cảnh không gian."
      },
      {
        title: "2. Danh mục dự án theo loại hình",
        desc: "Phân loại rõ ràng cho Hotel, Resort, Homestay, Co-working space và Căn hộ với hình ảnh chất lượng cao."
      },
      {
        title: "3. Bảng giá dịch vụ theo nhóm",
        desc: "Trình bày các gói chi phí theo thẻ trực quan kèm thanh điều hướng cuộn tự động đánh dấu nhóm đang xem."
      },
      {
        title: "4. Biểu mẫu tính & gửi yêu cầu báo giá",
        desc: "Người dùng chọn thành phố, loại không gian, diện tích; form gửi dữ liệu bất đồng bộ đến API xác thực hai chiều."
      },
      {
        title: "5. Chuyên mục Magazine",
        desc: "Cung cấp các bài viết về ứng dụng thực tế ảo và công nghệ hình ảnh trong du lịch, bất động sản."
      },
      {
        title: "6. Chuyển đổi ngôn ngữ Việt – Anh",
        desc: "Lưu lựa chọn ngôn ngữ bằng localStorage để duy trì trạng thái trên toàn bộ các trang con."
      }
    ],
    technicalHighlights: [
      "Sử dụng App Router với slug động và generateStaticParams cho các trang chi tiết dự án.",
      "Tối ưu lazy loading cho hình ảnh và iframe tour 360°, giữ thời gian tải ban đầu nhanh chóng.",
      "Xử lý form báo giá bất đồng bộ, kiểm tra dữ liệu hợp lệ ở cả client và server."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 16 + React 19" },
      { label: "Công nghệ Tour", value: "iFrame 360° Nhúng" },
      { label: "API Báo giá", value: "POST /api/quote" },
      { label: "Ngôn ngữ", value: "Song ngữ VI / EN" }
    ]
  },
  {
    id: "sense",
    starName: "Alhena",
    starRole: "Dự án 03",
    starColor: "#c084fc",
    title: "Sense & Scene Studio",
    subtitle: "Website Giới thiệu Studio Sáng tạo Đa ngôn ngữ",
    url: "https://sensescene.studio/",
    image: "/assets/sense.webp",
    summary: "Website giới thiệu thương hiệu và trưng bày tác phẩm cho studio công nghệ hình ảnh (CGI, motion design, không gian số). Dự án xây dựng theo dạng một trang cuộn liên tục với GSAP và hỗ trợ 5 ngôn ngữ.",
    purpose: "Thể hiện bản sắc thẩm mỹ và năng lực sáng tạo của studio thông qua hình ảnh, typography khổ lớn, chuỗi chuyển động và âm nhạc nền tương tác.",
    role: "Frontend Developer: Triển khai toàn bộ animation bằng GSAP & ScrollTrigger, xây dựng trình phát nhạc nền, hỗ trợ đa ngôn ngữ và tối ưu hóa hiệu năng theo thiết bị.",
    techStack: [
      { name: "Next.js 15 (App Router)", role: "Cấu trúc ứng dụng, tối ưu hóa tài nguyên Next/Image và Next/Font" },
      { name: "React 19 & TypeScript 5", role: "Quản lý state giao diện, dynamic audio controls và chuyển đổi ngôn ngữ" },
      { name: "GSAP 3 & ScrollTrigger", role: "Xây dựng chuỗi chuyển động, hiệu ứng xuất hiện và parallax theo cuộn chuột" },
      { name: "CSS thuần & clamp()", role: "Bố cục responsive bằng Grid, Flexbox và tính toán kích thước chữ thích ứng" },
      { name: "HTMLMediaElement", role: "Trình phát nhạc nền với playlist 4 bài, hiển thị thanh sóng âm thanh" },
      { name: "Browser APIs", role: "Intersection Observer hoãn tải video, Page Visibility tạm dừng nhạc khi ẩn tab" }
    ],
    keyFeatures: [
      {
        title: "1. Trình diễn thị giác & Đồng hồ thời gian thực",
        desc: "Phần mở đầu kết hợp typography nổi bật, video và đồng hồ cập nhật theo thời gian thực tại Sài Gòn (múi giờ GMT+7)."
      },
      {
        title: "2. Chuyển động mượt mà với GSAP Timeline",
        desc: "Chuỗi chuyển động gắn liền với thao tác cuộn của người dùng, phản hồi tự nhiên theo vị trí con trỏ chuột."
      },
      {
        title: "3. Trình phát nhạc nền tích hợp",
        desc: "Người dùng có thể phát, dừng, chuyển bài trong danh sách 4 bản nhạc chill ambient có hiển thị sóng âm."
      },
      {
        title: "4. Hỗ trợ 5 ngôn ngữ quốc tế",
        desc: "Hỗ trợ Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Nhật và Tiếng Hàn với cơ chế ngắt từ phù hợp từng ngôn ngữ."
      },
      {
        title: "5. Cơ chế tự thích ứng theo thiết bị (Adaptive Motion)",
        desc: "Tự động nhận diện thiết bị có cấu hình thấp hoặc chế độ giảm chuyển động (prefers-reduced-motion) để tối ưu độ mượt."
      },
      {
        title: "6. Hoãn tải tài nguyên thông minh",
        desc: "Sử dụng Intersection Observer để chỉ tải video khi gần cuộn tới, tạm dừng media khi tab bị ẩn để tiết kiệm pin/CPU."
      }
    ],
    technicalHighlights: [
      "Quản lý vòng đời listener, observer và animation chặt chẽ, dọn dẹp đầy đủ khi unmount.",
      "Tối ưu trải nghiệm âm thanh và video với Page Visibility API, tiết kiệm tài nguyên hệ thống.",
      "Thiết kế typography thích ứng với clamp() đảm bảo tỷ lệ hoàn hảo trên mọi kích thước màn hình."
    ],
    metricsOrHighlights: [
      { label: "Nền tảng", value: "Next.js 15 + React 19" },
      { label: "Animation", value: "GSAP 3 & ScrollTrigger" },
      { label: "Đa ngôn ngữ", value: "5 Ngôn ngữ (VI/EN/ZH/JA/KO)" },
      { label: "Tối ưu", value: "Adaptive Motion & Data Saver" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Lập trình & Nền tảng",
    skills: [
      { name: "C#", level: "Thành thạo", desc: "OOP, ASP.NET Core API, LINQ, Entity Framework" },
      { name: "JavaScript / TypeScript", level: "Thành thạo", desc: "ES6+, Async/Await, Type safety, Clean Code" },
      { name: "HTML5 & CSS3", level: "Thành thạo", desc: "Semantic HTML, Flexbox, Grid, Responsive Design" },
      { name: "Node.js", level: "Khá", desc: "Xây dựng RESTful API, Route Handlers, Automation scripts" }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "Next.js (App Router)", level: "Chuyên sâu", desc: "Next 14/15/16, SSR, SSG, Route Handlers, Metadata SEO" },
      { name: "React 18 / 19", level: "Chuyên sâu", desc: "Hooks, Context, Custom Hooks, Kiến trúc Component" },
      { name: "Tailwind CSS", level: "Thành thạo", desc: "Utility-first, Custom Themes, Responsive, Glassmorphism" },
      { name: "Framer Motion & GSAP", level: "Khá", desc: "ScrollTrigger, Micro-interactions, Canvas Integration" }
    ]
  },
  {
    category: "Backend & Cơ sở Dữ liệu",
    skills: [
      { name: "ASP.NET Core", level: "Thành thạo", desc: "Web API, Dependency Injection, Repository Pattern, JWT" },
      { name: "SQL Server", level: "Thành thạo", desc: "Thiết kế CSDL quan hệ, Stored Procedures, Tối ưu truy vấn" },
      { name: "Supabase & PostgreSQL", level: "Khá", desc: "Bảo mật RLS, Realtime Subscriptions, Database Functions" },
      { name: "MongoDB", level: "Khá", desc: "NoSQL schema design, Aggregation, TTL indexes" }
    ]
  },
  {
    category: "Tự động hóa & Công cụ",
    skills: [
      { name: "n8n Automation", level: "Chuyên sâu", desc: "Thiết kế workflow tự động hóa, cào dữ liệu, tích hợp Webhooks" },
      { name: "Jira / Scrum", level: "Thành thạo", desc: "Quản lý tiến độ sprint, phân tích task, làm việc nhóm theo Agile" },
      { name: "Git & GitHub", level: "Thành thạo", desc: "Quản lý phiên bản, nhánh, PR và GitHub Actions cơ bản" },
      { name: "3D/360° & AI", level: "Thực hành", desc: "Three.js, WebGL, Virtual Tour 360°, Gemini API integration" }
    ]
  }
];

export const CONSTELLATION_NODES = [
  { id: "hero", starName: "Song Tử", subtitle: "Giới thiệu", desc: "Tổng quan chòm sao", isProject: false },
  { id: "devdes", starName: "Castor", subtitle: "DevDes", desc: "Website dịch vụ số & Chat MongoDB", isProject: true },
  { id: "loopix", starName: "Pollux", subtitle: "Loopix Studio", desc: "Nền tảng Virtual Tour 360°", isProject: true },
  { id: "sense", starName: "Alhena", subtitle: "Sense & Scene", desc: "Studio sáng tạo & GSAP Motion", isProject: true },
  { id: "skills", starName: "Wasat", subtitle: "Kỹ năng", desc: "Hệ thống công nghệ & Framework", isProject: false },
  { id: "education", starName: "Mebsuta", subtitle: "Học vấn", desc: "ĐH HUTECH & Định hướng", isProject: false },
  { id: "contact", starName: "Propus", subtitle: "Liên hệ", desc: "Thông tin kết nối & Email", isProject: false }
];
