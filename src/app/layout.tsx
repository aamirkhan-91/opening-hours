import './globals.css';

export const metadata = {
  title: 'Opening Hours',
  description: 'Opening Hours app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
