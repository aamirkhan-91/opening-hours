import './globals.css';

import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Opening Hours',
  description: 'Opening Hours app',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
