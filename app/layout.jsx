import "./globals.css";

export const metadata = {
  title: "Robbie Boone | Software Engineer",
  description:
    "Software engineering portfolio for Robbie Boone, Computer Science student at North Carolina State University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
