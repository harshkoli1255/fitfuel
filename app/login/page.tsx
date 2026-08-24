import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="container py-24 flex items-center justify-center">
      <div className="w-full max-w-md border-2 border-border p-8 sm:p-12 bg-card">
        <h1 className="font-display font-bold text-4xl uppercase tracking-tighter mb-2 text-center">Login</h1>
        <p className="text-center text-muted-foreground font-bold uppercase tracking-wider text-xs mb-8">Welcome back to FitFuel</p>
        
        <form className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
          <input type="password" placeholder="Password" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent text-sm" />
          <div className="flex justify-end pt-2">
            <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-[var(--color-brand)] transition-colors">Forgot Password?</Link>
          </div>
          <Button size="lg" className="w-full mt-4 rounded-none">Sign In</Button>
        </form>

        <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground mt-8">
          Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-brand)] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
