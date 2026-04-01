import type { ItemList } from "@/features/Skeleton/types/ItemList.types";

type ItemListProps = {
  items: ItemList[];
};

export function ItemListComponent({ items }: ItemListProps) {
  return (
    <section
      id="products"
      className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
    >
      {/* <h2 className="text-xl font-semibold text-(--text-accent)">Sản phẩm bán chạy</h2> */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="rounded-xl border border-(--border-default) bg-(--surface-card) p-4"
          >
            {index === 0 ? (
              <div className="space-y-3">
                <div className="aspect-[4/4] animate-pulse rounded-lg bg-(--surface-muted)" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-(--surface-muted)" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-(--surface-subtle)" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-(--surface-muted)" />
                <div className="font-bold text-(--text-accent)">{item.feature}</div>
              </div>
            ) : (
              <div
                className="aspect-[4/4] rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, var(--gradient-card-from), var(--gradient-card-to))",
                }}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
