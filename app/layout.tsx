import './globals.css';

export const metadata = {
  title: 'MostaJS SaaS Starter — ship your startup MVP',
  description: 'A full-stack startup starter on @mostajs/orm — landing, auth, CRUD dashboard. Rename & go. Boots in the browser via WASM.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
