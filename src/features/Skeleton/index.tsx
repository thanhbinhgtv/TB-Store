import { ItemListComponent } from "./components/ItemList";
import type {
  ItemList,
} from "@/features/Skeleton/types/ItemList.types";

export const SkeletonComponent = () => {
  const featuredProducts: ItemList[] = [
    { name: "Skeleton", feature: "Skeleton" },
    { name: "unkow", feature: "---" },
    { name: "unkow", feature: "---" },
    { name: "unkow", feature: "---" },
    { name: "unkow", feature: "---" },
    { name: "unkow", feature: "---" },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)]">
      <ItemListComponent items={featuredProducts} />
    </main>
  );
};

export default SkeletonComponent;
