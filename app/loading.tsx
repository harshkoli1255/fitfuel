export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center w-full">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-[var(--color-brand)]"></div>
        <p className="font-bold uppercase tracking-widest text-muted-foreground text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
