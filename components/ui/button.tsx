import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-soft",
        secondary:
          "bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary-foreground hover:from-secondary/20 hover:to-secondary/30 hover:shadow-soft",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-soft",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",

        // Enhanced specialty variants with gradients
        endodoncia:
          "bg-gradient-to-r from-dental-endodoncia to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",
        ortodoncia:
          "bg-gradient-to-r from-dental-ortodoncia to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",
        cirugia:
          "bg-gradient-to-r from-dental-cirugia to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        odontopediatria:
          "bg-gradient-to-r from-dental-odontopediatria to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        periodoncia:
          "bg-gradient-to-r from-dental-periodoncia to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-colored-emerald hover:scale-[1.02] active:scale-[0.98]",
        protesis:
          "bg-gradient-to-r from-dental-protesis to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",

        // Enhanced role variants
        admin:
          "bg-gradient-to-r from-role-admin to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        profesor:
          "bg-gradient-to-r from-role-profesor to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",
        estudiante:
          "bg-gradient-to-r from-role-estudiante to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-colored-emerald hover:scale-[1.02] active:scale-[0.98]",
        paciente:
          "bg-gradient-to-r from-role-paciente to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",
        secretario:
          "bg-gradient-to-r from-role-secretario to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",

        // Status variants
        success:
          "bg-gradient-to-r from-success to-green-700 text-success-foreground hover:from-green-700 hover:to-green-800 hover:shadow-colored-emerald hover:scale-[1.02] active:scale-[0.98]",
        warning:
          "bg-gradient-to-r from-warning to-yellow-600 text-warning-foreground hover:from-yellow-600 hover:to-yellow-700 hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98]",
        info: "bg-gradient-to-r from-info to-blue-700 text-info-foreground hover:from-blue-700 hover:to-blue-800 hover:shadow-colored-blue hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
