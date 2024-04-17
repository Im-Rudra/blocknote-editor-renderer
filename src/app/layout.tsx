import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const hindSiliguri = localFont({
  src: './assets/fonts/HindSiliguri/HindSiliguri-Medium.ttf',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Blocknote-editor',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={hindSiliguri.className + ' dark:bg-slate-900'}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
