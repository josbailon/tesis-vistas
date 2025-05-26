import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(174 62% 97%)",
          100: "hsl(174 62% 92%)",
          200: "hsl(174 62% 84%)",
          300: "hsl(174 62% 71%)",
          400: "hsl(174 62% 59%)",
          500: "hsl(174 62% 47%)",
          600: "hsl(174 62% 38%)",
          700: "hsl(174 62% 29%)",
          800: "hsl(174 62% 24%)",
          900: "hsl(174 62% 20%)",
          950: "hsl(174 62% 12%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(210 40% 98%)",
          100: "hsl(210 40% 96%)",
          200: "hsl(210 40% 92%)",
          300: "hsl(210 40% 84%)",
          400: "hsl(210 40% 71%)",
          500: "hsl(210 40% 59%)",
          600: "hsl(210 40% 47%)",
          700: "hsl(210 40% 38%)",
          800: "hsl(210 40% 29%)",
          900: "hsl(210 40% 24%)",
          950: "hsl(210 40% 15%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Medical Color Palette
        medical: {
          primary: "hsl(174 62% 47%)",
          secondary: "hsl(142 76% 36%)",
          accent: "hsl(174 44% 51%)",
          light: "hsl(174 62% 97%)",
          dark: "hsl(174 62% 20%)",
        },
        // Status Colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          50: "hsl(142 76% 97%)",
          100: "hsl(142 76% 92%)",
          500: "hsl(142 76% 36%)",
          600: "hsl(142 76% 29%)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          50: "hsl(43 96% 97%)",
          100: "hsl(43 96% 92%)",
          500: "hsl(43 96% 56%)",
          600: "hsl(43 96% 46%)",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          50: "hsl(217 91% 97%)",
          100: "hsl(217 91% 92%)",
          500: "hsl(217 91% 60%)",
          600: "hsl(217 91% 50%)",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          50: "hsl(0 84% 97%)",
          100: "hsl(0 84% 92%)",
          500: "hsl(0 84% 60%)",
          600: "hsl(0 84% 50%)",
        },
        // Specialty Colors
        specialty: {
          endodoncia: {
            DEFAULT: "hsl(262 83% 58%)",
            light: "hsl(262 83% 97%)",
            dark: "hsl(262 83% 48%)",
          },
          ortodoncia: {
            DEFAULT: "hsl(217 91% 60%)",
            light: "hsl(217 91% 97%)",
            dark: "hsl(217 91% 50%)",
          },
          cirugia: {
            DEFAULT: "hsl(0 84% 60%)",
            light: "hsl(0 84% 97%)",
            dark: "hsl(0 84% 50%)",
          },
          odontopediatria: {
            DEFAULT: "hsl(43 96% 56%)",
            light: "hsl(43 96% 97%)",
            dark: "hsl(43 96% 46%)",
          },
        },
        // Neutral Grays
        neutral: {
          50: "hsl(210 20% 98%)",
          100: "hsl(210 20% 96%)",
          200: "hsl(210 16% 93%)",
          300: "hsl(210 14% 89%)",
          400: "hsl(210 14% 83%)",
          500: "hsl(210 11% 71%)",
          600: "hsl(210 7% 56%)",
          700: "hsl(210 9% 31%)",
          800: "hsl(210 10% 23%)",
          900: "hsl(210 11% 15%)",
          950: "hsl(210 12% 9%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-medical": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(45, 212, 191, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(45, 212, 191, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-medical": "pulse-medical 2s infinite",
      },
      boxShadow: {
        medical: "0 4px 6px -1px rgba(45, 212, 191, 0.1), 0 2px 4px -1px rgba(45, 212, 191, 0.06)",
        "medical-lg": "0 10px 15px -3px rgba(45, 212, 191, 0.1), 0 4px 6px -2px rgba(45, 212, 191, 0.05)",
        "medical-xl": "0 20px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
