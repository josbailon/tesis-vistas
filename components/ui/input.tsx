import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "outlined"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const baseClasses =
      "flex w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 transform-gpu"

    const variantClasses = {
      default:
        "h-10 rounded-lg border-2 border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary hover:border-primary/50",
      filled:
        "h-10 rounded-lg border-0 bg-muted px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-background hover:bg-muted/80",
      outlined:
        "h-10 rounded-lg border-2 border-outline bg-transparent px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary hover:border-primary/50 hover:shadow-soft",
    }

    return <input type={type} className={cn(baseClasses, variantClasses[variant], className)} ref={ref} {...props} />
  },
)
Input.displayName = "Input"

export { Input }
