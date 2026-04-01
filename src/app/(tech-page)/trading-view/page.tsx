"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => unknown;
    };
  }
}

const TradingViewPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountChart = () => {
      if (!containerRef.current || !window.TradingView) return;

      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "60",
        timezone: "Asia/Ho_Chi_Minh",
        theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
        style: "1",
        locale: "vi_VN",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        support_host: "https://www.tradingview.com",
        container: containerRef.current,
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://s3.tradingview.com/tv.js"]');

    if (existingScript) {
      if (window.TradingView) mountChart();
      else existingScript.addEventListener("load", mountChart, { once: true });

      return () => existingScript.removeEventListener("load", mountChart);
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = mountChart;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-(--surface-page) px-4 py-6 sm:px-6 sm:py-8">
      <section className="mx-auto w-full max-w-6xl rounded-2xl border border-(--border-default) bg-(--surface-card) p-3 shadow-sm sm:p-4">
        <div className="mb-3 flex items-end justify-between gap-3 border-b border-(--border-default) pb-3">
          <div>
            <h1 className="text-2xl font-bold text-(--text-primary)">TradingView</h1>
            <p className="text-sm text-(--text-secondary)">Bieu do real-time nhung tu TradingView script moi nhat.</p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="h-[70vh] min-h-120 w-full overflow-hidden rounded-xl border border-(--border-default)"
        />
      </section>
    </main>
  );
};

export default TradingViewPage;
