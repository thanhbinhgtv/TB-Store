"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  preference: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "tb-theme";

// Tạo context với giá trị mặc định là undefined để kiểm tra xem có được sử dụng trong provider hay không
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Kiểm tra xem giá trị có phải là theme hợp lệ không
function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

// Lấy theme của hệ điều hành/trình duyệt
function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Lấy theme đã lưu trong localStorage, nếu có và hợp lệ
function getStoredTheme(): Theme | null {
  // Không có localStorage trên server, trả về null để dùng theme hệ thống
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : null;
}

// Lấy theme ưu tiên ban đầu: ưu tiên theme đã lưu trong localStorage, nếu không có thì lấy theo hệ thống
function getInitialPreference(): Theme | null {
  return getStoredTheme();
}

// Đây là phần quan trọng nhất
// Lấy theme ban đầu để áp dụng khi component được mount, ưu tiên lấy từ dataset của root để tránh nháy giao diện sai theme lúc mới load
function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  // Kiểm tra dataset trên root trước để tránh nháy giao diện sai theme lúc mới load
  // Tức là đọc <html data-theme="dark"> Giá trị này thường được set rất sớm bởi themeInitScript trong <head>.
  const rootTheme = document.documentElement.dataset.theme;
  if (rootTheme === "light" || rootTheme === "dark") {
    return rootTheme;
  }

  const storedTheme = getStoredTheme();
  return storedTheme ?? getSystemTheme();
}

// Áp dụng theme bằng cách set dataset và color-scheme trên root
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

type ThemeProviderProps = {
  children: ReactNode;
};

// ThemeProvider quản lý state theme và cung cấp context cho toàn app
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] = useState<Theme | null>(getInitialPreference);
  const [theme, setResolvedTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (preference) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = media.matches ? "dark" : "light";
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [preference]);

  // lưu theme vào localStorage
  const setTheme = useCallback((nextTheme: Theme) => {
    setPreference(nextTheme);
    setResolvedTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }, []);

  // toggle giữa light và dark
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  // memoize giá trị context để tránh re-render không cần thiết
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      preference,
      setTheme,
      toggleTheme,
    }),
    [preference, setTheme, theme, toggleTheme],
  );

  // cung cấp context cho toàn app
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Hook để sử dụng context theme trong các component
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
