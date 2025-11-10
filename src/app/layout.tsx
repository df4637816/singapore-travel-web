import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: '新加坡美食推薦地圖 | Singapore Food Guide',
  description: '探索新加坡最佳美食地點，包括肉骨茶、海南雞飯、叻沙等道地美食',
  keywords: ['新加坡美食', 'Singapore Food', '肉骨茶', 'Laksa', '海南雞飯', 'Bak Kut Teh'],
  authors: [{ name: 'Singapore Food Guide' }],
  openGraph: {
    title: '新加坡美食推薦地圖',
    description: '探索新加坡最佳美食地點',
    type: 'website',
    locale: 'zh_TW',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
