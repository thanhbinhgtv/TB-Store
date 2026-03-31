import SkeletonComponent from "@/features/Skeleton";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seo Skeleton',
  description: 'Seo in Skeleton',
}

const Skeleton = () => {
  return <SkeletonComponent />;
}

export default Skeleton
