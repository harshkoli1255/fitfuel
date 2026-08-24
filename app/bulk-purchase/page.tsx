import { Button } from "@/components/ui/button"

export default function BulkPurchasePage() {
  return (
    <div className="container py-24 max-w-3xl">
      <h1 className="font-display font-bold text-6xl uppercase tracking-tighter mb-8 text-center">Bulk Purchase</h1>
      <p className="text-center text-muted-foreground mb-12 font-medium">Are you a gym owner, trainer, or distributor? Apply for our wholesale program for exclusive pricing.</p>
      
      <form className="space-y-6 bg-card border-2 border-border p-8 sm:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input type="text" placeholder="Business Name" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
          <input type="text" placeholder="Contact Person" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
          <input type="email" placeholder="Email" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
          <input type="tel" placeholder="Phone Number" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
        </div>
        <textarea placeholder="Estimated Monthly Volume / Requirements" rows={4} className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm"></textarea>
        <Button size="lg" className="w-full rounded-none py-6 text-lg">Submit Application</Button>
      </form>
    </div>
  )
}
