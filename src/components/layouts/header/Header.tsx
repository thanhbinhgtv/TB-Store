"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Header.module.scss";

export function Header() {
  const { toggleTheme } = useTheme();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Skeleton", href: "/skeleton" },
    { label: "Price Board", href: "/price-board" },
    { label: "Tailwind", href: "/tailwind" },
    { label: "Trading View", href: "/trading-view" },
    { label: "Highcharts", href: "/highcharts" },
    { label: "AG Grid", href: "/ag-grid" },
    { label: "Login", href: "/login" },
  ];

  return (
    <header
      className={`${styles.headerContainer} border-y border-(--border-default) bg-(--surface-subtle) text-(--text-primary)`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="text-xl font-extrabold text-(--text-accent)">SBSI</div>
        <nav className="hidden items-center gap-5 text-sm text-(--text-secondary) md:flex">
          {navItems.map((item) => (
            <Link key={item.label} className="transition-colors hover:text-(--text-accent)" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="min-w-14 rounded-lg border border-(--border-strong) bg-(--surface-card) px-3 py-2 text-center text-xs font-semibold text-(--text-secondary) transition-colors hover:border-(--focus-ring) hover:text-(--text-primary)"
        >
          <span className={styles.themeLabelForLight}>Dark</span>
          <span className={styles.themeLabelForDark}>Light</span>
        </button>
      </div>
    </header>
  );
}
