import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-(--surface-page) px-4 py-10 text-(--text-primary) sm:px-6 sm:py-16">
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl border border-(--border-default) bg-(--surface-card) p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-(--text-accent)">ERROR 404</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-3xl">Trang không tồn tại</h1>
        <p className="mt-4 max-w-xl text-sm text-(--text-secondary) sm:text-base">
          Duong dan ban vua truy cap khong hop le hoac da duoc di chuyen. Hay quay lai trang chu de tiep tuc.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-(--button-primary-bg) px-5 py-2.5 text-sm font-semibold text-(--text-on-accent) transition-colors hover:bg-(--button-primary-bg-hover)"
          >
            Ve trang chu
          </Link>
        </div>
      </section>
    </main>
  );
}