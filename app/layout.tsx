import "./globals.css";

type Props = Readonly<{ children: React.ReactNode; }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
    <body className="antialiased">
    {children}
    </body>
    </html>
  );
}
