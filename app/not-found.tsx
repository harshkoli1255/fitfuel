import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <h1 className="font-display font-bold text-9xl uppercase tracking-tighter text-[var(--color-brand)] mb-4">404</h1>
      <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-6">Page Not Found</h2>
      <p className="text-muted-foreground font-medium max-w-md mb-12">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Button size="lg" className="rounded-none px-8" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-none px-8" asChild>
          <Link href="/shop">Shop Products</Link>
        </Button>
      </div>
    </div>
  )
}
