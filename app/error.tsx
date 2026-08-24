"use client"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container py-32 flex flex-col items-center justify-center text-center min-h-[50vh]">
      <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-6">System Error</h2>
      <p className="text-muted-foreground font-medium max-w-md mb-12">
        An unexpected error occurred while loading this page. Our team has been notified.
      </p>
      <Button size="lg" className="rounded-none px-8" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  )
}
