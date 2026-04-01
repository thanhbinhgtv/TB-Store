"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Header.module.scss";

export type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
};

export function Header({ navItems }: SiteHeaderProps) {
  const { toggleTheme } = useTheme();

  return (
    <header
      className={`${styles.headerContainer} border-y border-[var(--border-default)] bg-[var(--surface-subtle)] text-[var(--text-primary)]`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="text-xl font-extrabold text-[var(--text-accent)]">JBSV</div>
        <nav className="hidden items-center gap-5 text-sm text-[var(--text-secondary)] md:flex">
          {navItems.map((item) => (
            <Link key={item.label} className="transition-colors hover:text-[var(--text-accent)]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="min-w-14 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-card)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--focus-ring)] hover:text-[var(--text-primary)]"
        >
          <span className={styles.themeLabelForLight}>Dark</span>
          <span className={styles.themeLabelForDark}>Light</span>
        </button>
      </div>
    </header>
  );
}
