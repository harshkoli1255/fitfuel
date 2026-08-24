import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    const compClassName = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]": variant === "default",
        "border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background": variant === "outline",
        "hover:bg-[var(--color-accent)] hover:text-accent-foreground": variant === "ghost",
        "text-[var(--color-brand)] underline-offset-4 hover:underline": variant === "link",
        "bg-muted text-muted-foreground hover:bg-muted/80": variant === "secondary",
        "h-12 px-6 py-3": size === "default",
        "h-9 px-3 text-xs": size === "sm",
        "h-14 px-8 text-base": size === "lg",
        "h-12 w-12": size === "icon",
      },
      className
    )

    if (asChild && React.isValidElement(props.children)) {
      // Extract children from props to avoid overwriting the child's own children
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children: _childrenFromProps, ...restProps } = props;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = props.children as React.ReactElement<any, any>;
      
      return React.cloneElement(child, {
        className: cn(compClassName, child.props.className),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: ref as any,
        ...restProps,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    }

    return (
      <button
        ref={ref}
        className={compClassName}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
