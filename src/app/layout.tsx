import "../styles/globals.css";
import { AppShell } from "@/components/layouts/AppShell";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seo Layout",
  description: "Seo in Layout",
};

// Tránh nháy giao diện sai theme lúc mới load
const themeInitScript = `
  (function () {
    try {
      var key = "tb-theme";
      var stored = localStorage.getItem(key);
      var isStoredTheme = stored === "light" || stored === "dark";
      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var nextTheme = isStoredTheme ? stored : systemTheme;
      var root = document.documentElement;

      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
    } catch (error) {
      console.error("Theme init failed", error);
    }
  })();
`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;