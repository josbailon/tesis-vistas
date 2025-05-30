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
          50: "hsl(174 62% 98%)",
          100: "hsl(174 62% 95%)",
          200: "hsl(174 62% 88%)",
          300: "hsl(174 62% 75%)",
          400: "hsl(174 62% 62%)",
          500: "hsl(174 62% 47%)",
          600: "hsl(174 62% 40%)",
          700: "hsl(174 62% 33%)",
          800: "hsl(174 62% 28%)",
          900: "hsl(174 62% 25%)",
          950: "hsl(174 62% 22%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(174 30% 98%)",
          100: "hsl(174 30% 95%)",
          200: "hsl(174 30% 90%)",
          300: "hsl(174 30% 82%)",
          400: "hsl(174 30% 70%)",
          500: "hsl(174 30% 58%)",
          600: "hsl(174 30% 46%)",
          700: "hsl(174 30% 36%)",
          800: "hsl(174 30% 28%)",
          900: "hsl(174 30% 25%)",
          950: "hsl(174 30% 22%)",
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
        // Medical Color Palette - All Light
        medical: {
          primary: "hsl(174 62% 47%)",
          secondary: "hsl(142 76% 36%)",
          accent: "hsl(174 44% 51%)",
          light: "hsl(174 62% 97%)",
          soft: "hsl(174 30% 92%)",
        },
        // Status Colors - Light Theme
        success: {
          DEFAULT: "hsl(142 76% 36%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(142 76% 97%)",
          100: "hsl(142 76% 92%)",
          200: "hsl(142 76% 84%)",
          300: "hsl(142 76% 71%)",
          400: "hsl(142 76% 59%)",
          500: "hsl(142 76% 36%)",
          600: "hsl(142 76% 29%)",
          700: "hsl(142 76% 25%)",
          800: "hsl(142 76% 22%)",
          900: "hsl(142 76% 20%)",
        },
        warning: {
          DEFAULT: "hsl(43 96% 56%)",
          foreground: "hsl(43 96% 15%)",
          50: "hsl(43 96% 97%)",
          100: "hsl(43 96% 92%)",
          200: "hsl(43 96% 84%)",
          300: "hsl(43 96% 71%)",
          400: "hsl(43 96% 64%)",
          500: "hsl(43 96% 56%)",
          600: "hsl(43 96% 46%)",
          700: "hsl(43 96% 36%)",
          800: "hsl(43 96% 28%)",
          900: "hsl(43 96% 22%)",
        },
        info: {
          DEFAULT: "hsl(217 91% 60%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(217 91% 97%)",
          100: "hsl(217 91% 92%)",
          200: "hsl(217 91% 84%)",
          300: "hsl(217 91% 71%)",
          400: "hsl(217 91% 65%)",
          500: "hsl(217 91% 60%)",
          600: "hsl(217 91% 50%)",
          700: "hsl(217 91% 40%)",
          800: "hsl(217 91% 32%)",
          900: "hsl(217 91% 25%)",
        },
        error: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(0 84% 97%)",
          100: "hsl(0 84% 92%)",
          200: "hsl(0 84% 84%)",
          300: "hsl(0 84% 71%)",
          400: "hsl(0 84% 65%)",
          500: "hsl(0 84% 60%)",
          600: "hsl(0 84% 50%)",
          700: "hsl(0 84% 40%)",
          800: "hsl(0 84% 32%)",
          900: "hsl(0 84% 25%)",
        },
        // Specialty Colors - Light Variants
        specialty: {
          endodoncia: {
            DEFAULT: "hsl(262 83% 58%)",
            light: "hsl(262 83% 97%)",
            soft: "hsl(262 83% 88%)",
            medium: "hsl(262 83% 48%)",
          },
          ortodoncia: {
            DEFAULT: "hsl(217 91% 60%)",
            light: "hsl(217 91% 97%)",
            soft: "hsl(217 91% 88%)",
            medium: "hsl(217 91% 50%)",
          },
          cirugia: {
            DEFAULT: "hsl(0 84% 60%)",
            light: "hsl(0 84% 97%)",
            soft: "hsl(0 84% 88%)",
            medium: "hsl(0 84% 50%)",
          },
          odontopediatria: {
            DEFAULT: "hsl(43 96% 56%)",
            light: "hsl(43 96% 97%)",
            soft: "hsl(43 96% 88%)",
            medium: "hsl(43 96% 46%)",
          },
        },
        // Light Neutral Palette
        neutral: {
          50: "hsl(174 20% 98%)",
          100: "hsl(174 20% 96%)",
          200: "hsl(174 16% 93%)",
          300: "hsl(174 14% 89%)",
          400: "hsl(174 14% 83%)",
          500: "hsl(174 11% 71%)",
          600: "hsl(174 7% 56%)",
          700: "hsl(174 9% 45%)",
          800: "hsl(174 10% 35%)",
          900: "hsl(174 11% 28%)",
          950: "hsl(174 12% 25%)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-medical": "pulse-medical 2s infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      boxShadow: {
        medical: "0 4px 6px -1px rgba(45, 212, 191, 0.1), 0 2px 4px -1px rgba(45, 212, 191, 0.06)",
        "medical-lg": "0 10px 15px -3px rgba(45, 212, 191, 0.1), 0 4px 6px -2px rgba(45, 212, 191, 0.05)",
        "medical-xl": "0 20px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
        soft: "0 2px 8px rgba(45, 212, 191, 0.08)",
        "soft-lg": "0 8px 25px rgba(45, 212, 191, 0.12)",
      },
      backgroundImage: {
        "medical-gradient": "linear-gradient(135deg, hsl(174 62% 47%) 0%, hsl(142 76% 36%) 100%)",
        "soft-gradient": "linear-gradient(135deg, hsl(174 30% 98%) 0%, hsl(174 62% 97%) 100%)",
        shimmer: "linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.1), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
