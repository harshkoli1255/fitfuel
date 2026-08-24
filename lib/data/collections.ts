import { Collection } from "@/types";

export const COLLECTIONS: Collection[] = [
  { id: "col1", slug: "build-muscle", name: "Build Muscle" },
  { id: "col2", slug: "lose-weight", name: "Lose Weight" },
  { id: "col3", slug: "improve-recovery", name: "Improve Recovery" },
  { id: "col4", slug: "increase-strength", name: "Increase Strength" },
  { id: "col5", slug: "daily-wellness", name: "Daily Wellness" },
  { id: "col6", slug: "best-sellers", name: "Best Sellers" },
  { id: "col7", slug: "new-arrivals", name: "New Arrivals" },
  { id: "col8", slug: "clearance", name: "Clearance Sale" },
  { id: "col9", slug: "beginner-essentials", name: "Beginner Essentials" },
  { id: "col10", slug: "advanced-stack", name: "Advanced Stack" },
];

export function getCollections() {
  return COLLECTIONS;
}

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find(c => c.slug === slug);
}
