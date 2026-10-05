const projects = [
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

const $ = (selector) => document.querySelector(selector);
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let motionPreference = null;
try { motionPreference = localStorage.getItem('phong-reduced-motion'); } catch { /* Storage is optional. */ }
let reducedMotion = motionPreference === null ? motionQuery.matches : motionPreference === 'true';
const motionButton = $('#motion-toggle');
function updateMotion() {
  document.body.classList.toggle('reduced-motion', reducedMotion);
  motionButton.setAttribute('aria-pressed', String(reducedMotion));
  motionButton.setAttribute('aria-label', reducedMotion ? 'Bật hiệu ứng chuyển động' : 'Tạm dừng hiệu ứng chuyển động');
  motionButton.innerHTML = reducedMotion
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
}
updateMotion();
motionButton.addEventListener('click', () => {
  reducedMotion = !reducedMotion;
  updateMotion();
  try { localStorage.setItem('phong-reduced-motion', String(reducedMotion)); } catch { /* No persistent storage needed. */ }
  requestFrame();
});
motionQuery.addEventListener('change', (event) => {
  reducedMotion = event.matches;
  updateMotion();
  requestFrame();
});

const menuButton = $('#menu-toggle');
const nav = $('#main-nav');
function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Mở menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-motion');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

const dialog = $('#project-dialog');
let selectedProject = 0;
let projectTrigger = null;
function renderProject(index) {
  selectedProject = (index + projects.length) % projects.length;
  const project = projects[selectedProject];
  const number = String(selectedProject + 1).padStart(2, '0');
  $('#dialog-label').textContent = `${number} / ${project.category}`;
  $('#dialog-count').textContent = `${number} / 03`;
  $('#dialog-content').innerHTML = `
    <div class="dialog-hero"><h2 id="dialog-title">${project.name}</h2><span aria-hidden="true">✧</span></div>
    <img class="dialog-cover" src="/assets/${project.image}" width="1440" height="1000" alt="Giao diện ${project.name}">
    <p class="dialog-summary">${project.summary}</p>
    <div class="tag-list">${project.stack.map((tag) => `<span>${tag}</span>`).join('')}</div>
    <section class="dialog-section"><h3>Bài toán & mục tiêu</h3><p>${project.purpose}</p></section>
    <section class="dialog-section"><h3>Những điểm nổi bật</h3><ul>${project.features.map((feature) => `<li>${feature}</li>`).join('')}</ul></section>
    <section class="dialog-section"><h3>Phía sau trải nghiệm</h3><p>${project.technical}</p></section>
    <section class="dialog-section"><h3>Giá trị kỹ thuật</h3><p>${project.takeaway}</p></section>
    ${project.note ? `<p class="dialog-note">${project.note}</p>` : ''}
    <a class="button button-light dialog-link" href="${project.url}" target="_blank" rel="noopener noreferrer">Trải nghiệm website <span aria-hidden="true">✦</span></a>`;
  dialog.scrollTop = 0;
}
function openProject(id, trigger) {
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0) return;
  projectTrigger = trigger;
  renderProject(index);
  closeMenu();
  document.body.classList.add('dialog-open');
  dialog.showModal();
  $('#dialog-close').focus({ preventScroll: true });
  warp = reducedMotion ? 0 : 1;
  requestFrame();
}
document.querySelectorAll('[data-project]').forEach((trigger) => {
  trigger.addEventListener('click', () => openProject(trigger.dataset.project, trigger));
});
$('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  projectTrigger?.focus({ preventScroll: true });
  requestFrame();
});
$('#previous-project').addEventListener('click', () => renderProject(selectedProject - 1));
$('#next-project').addEventListener('click', () => renderProject(selectedProject + 1));

let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}
$('#copy-email').addEventListener('click', async () => {
  const email = 'duongthanhphong1618@gmail.com';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    toast('Đã sao chép email. Hẹn gặp bạn trong hộp thư!');
  } catch {
    const range = document.createRange();
    range.selectNodeContents($('.contact-email'));
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    toast('Email đã được chọn. Nhấn giữ hoặc Ctrl/Cmd + C để sao chép.');
  }
});

// Perspective-projected stars: scroll changes the camera, pointer adds a gentle parallax.
// The interactive constellation stays in the DOM for keyboard and touch accessibility.
const canvas = $('#universe');
const context = canvas.getContext('2d', { alpha: false });
const chart = $('#star-chart');
const progress = $('.scroll-progress');
const navLinks = [...nav.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section[id]')];
let width = innerWidth, height = innerHeight, dpr = 1;
let cameraX = 0, cameraY = 0, cameraZ = 0;
let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
let scrollPosition = scrollY, warp = 0, animationFrame = 0, lastTime = 0;
let activeSection = '';
let seed = 3268;
function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
const stars = Array.from({ length: matchMedia('(max-width:620px)').matches ? 380 : 760 }, () => ({
  x: (random() - .5) * 3400, y: (random() - .5) * 2600, z: random() * 2200,
  radius: .3 + random() * 1.05, brightness: .18 + random() * .6, phase: random() * Math.PI * 2,
  color: random() > .9 ? '224,195,153' : random() > .6 ? '178,204,248' : '222,230,244'
}));
function resize() {
  width = innerWidth; height = innerHeight; dpr = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  requestFrame();
}
function requestFrame() { if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(draw); }
function draw(time) {
  animationFrame = 0;
  const delta = Math.min((time - lastTime) / 16.667 || 1, 3);
  lastTime = time;
  const pageHeight = Math.max(1, document.documentElement.scrollHeight - height);
  progress.style.transform = `scaleX(${Math.min(scrollPosition / pageHeight, 1)})`;
  const damping = 1 - Math.pow(.94, delta);
  const targetZ = reducedMotion ? 0 : scrollPosition * .105;
  cameraZ += (targetZ - cameraZ) * damping;
  smoothX += ((reducedMotion ? 0 : pointerX) - smoothX) * damping;
  smoothY += ((reducedMotion ? 0 : pointerY) - smoothY) * damping;
  cameraX = smoothX * 26;
  cameraY = smoothY * 20 + (reducedMotion ? 0 : Math.sin(cameraZ * .0015) * 45);
  warp *= Math.pow(.93, delta);
  if (context) {
    context.fillStyle = '#080b12';
    context.fillRect(0, 0, width, height);
    const centerX = width * .56, centerY = height * .48;
    const focal = Math.max(width, height) * .65;
    for (const star of stars) {
      const depth = ((star.z - cameraZ) % 2200 + 2200) % 2200 + 300;
      const scale = focal / depth;
      const x = (star.x - cameraX) * scale + centerX;
      const y = (star.y - cameraY) * scale + centerY;
      if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;
      const flicker = reducedMotion ? 1 : .85 + .15 * Math.sin(time * .0006 + star.phase);
      const alpha = star.brightness * flicker * Math.min(1, (depth - 300) / 200) * .72;
      const radius = Math.min(1.6, Math.max(.3, star.radius * scale));
      context.fillStyle = `rgba(${star.color},${alpha})`;
      context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
      if (radius > 1.05 && alpha > .35) {
        context.fillStyle = `rgba(${star.color},${alpha * .07})`;
        context.beginPath(); context.arc(x, y, radius * 4, 0, Math.PI * 2); context.fill();
      }
      if (warp > .05 && !reducedMotion) {
        context.strokeStyle = `rgba(${star.color},${alpha * warp * .5})`;
        context.lineWidth = .6;
        context.beginPath(); context.moveTo(x, y); context.lineTo(x + (x-centerX)*warp*.07, y + (y-centerY)*warp*.07); context.stroke();
      }
    }
  }
  const heroVisible = scrollPosition < height * 1.5;
  if (heroVisible) {
    chart.style.setProperty('--chart-rx', `${reducedMotion ? 0 : -smoothY * 3}deg`);
    chart.style.setProperty('--chart-ry', `${reducedMotion ? 0 : smoothX * 4}deg`);
  }
  let currentSection = 'home';
  for (const section of sections) { if (section.offsetTop <= scrollPosition + height * .4) currentSection = section.id; }
  if (currentSection !== activeSection) {
    activeSection = currentSection;
    for (const link of navLinks) {
      const active = link.hash === `#${currentSection}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    }
  }
  if (!reducedMotion && !document.hidden) requestFrame();
}
window.addEventListener('resize', resize, { passive: true });
window.addEventListener('scroll', () => { scrollPosition = scrollY; requestFrame(); }, { passive: true });
window.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  pointerX = (event.clientX / width - .5) * 2;
  pointerY = (event.clientY / height - .5) * 2;
}, { passive: true });
document.documentElement.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
  else { lastTime = performance.now(); requestFrame(); }
});
resize();
