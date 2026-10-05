import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dương Thanh Phong | Gemini Universe — Full-stack & Automation Portfolio',
  description:
    'Portfolio 3D lấy cảm hứng từ chòm sao Song Tử (Gemini Constellation) của Dương Thanh Phong. Sinh viên CNTT HUTECH, Full-stack Developer chuyên sâu Next.js, React, C#, ASP.NET, n8n Automation & 3D/360° web.',
  keywords: [
    'Dương Thanh Phong',
    'Portfolio 3D',
    'Gemini Constellation',
    'Song Tử',
    'Full-stack Developer',
    'Next.js 16',
    'React 19',
    'HUTECH',
    'DevDes',
    'Loopix Studio',
    'Sense and Scene',
  ],
  authors: [{ name: 'Dương Thanh Phong' }],
  openGraph: {
    title: 'Dương Thanh Phong | Gemini Universe 3D Portfolio',
    description:
      'Hành trình không gian 3D khám phá các dự án DevDes, Loopix Studio, Sense & Scene Studio cùng hệ thống kỹ năng Full-stack & Automation.',
    url: 'https://duongthanhphong.dev',
    siteName: 'Dương Thanh Phong Portfolio',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-space-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
