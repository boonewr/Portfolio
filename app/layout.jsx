import "./globals.css";

export const metadata = {
  title: "Robbie Boone | Software Engineer",
  description:
    "Software engineering portfolio for Robbie Boone, Computer Science student at North Carolina State University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t!=='light');document.documentElement.style.colorScheme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
