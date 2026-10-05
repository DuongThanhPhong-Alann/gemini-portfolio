import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dương Thanh Phong | Portfolio',
  description:
    'Portfolio của Dương Thanh Phong, sinh viên CNTT tại HUTECH. Xem các dự án web full-stack, tự động hóa và trải nghiệm 3D/360°.',
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
    title: 'Dương Thanh Phong | Portfolio 3D',
    description:
      'Các dự án DevDes, Loopix Studio, Sense & Scene cùng những công nghệ mình sử dụng trong web và tự động hóa.',
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
