import "./globals.css";

export const metadata = {
  title: "All Valley Events",
  description: "Find public events across every city in the RGV — fun, community-first, and always updated."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg" />
        {children}
      </body>
    </html>
  );
}
