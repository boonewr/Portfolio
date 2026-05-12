import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Robbie Boone | Software Engineer",
  description:
    "Software engineering portfolio for Robbie Boone, Computer Science student at North Carolina State University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:'light';document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
