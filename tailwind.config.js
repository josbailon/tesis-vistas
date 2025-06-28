/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          500: "hsl(var(--secondary-500))",
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          900: "hsl(var(--secondary-900))",
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
          purple: {
            DEFAULT: "hsl(var(--accent-purple))",
            50: "hsl(var(--accent-purple-50))",
            100: "hsl(var(--accent-purple-100))",
            200: "hsl(var(--accent-purple-200))",
            300: "hsl(var(--accent-purple-300))",
            400: "hsl(var(--accent-purple-400))",
            500: "hsl(var(--accent-purple-500))",
            600: "hsl(var(--accent-purple-600))",
            700: "hsl(var(--accent-purple-700))",
            800: "hsl(var(--accent-purple-800))",
            900: "hsl(var(--accent-purple-900))",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced status colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        // Enhanced dental specialty colors
        dental: {
          endodoncia: {
            DEFAULT: "hsl(var(--endodoncia))",
            light: "hsl(var(--endodoncia-light))",
            dark: "hsl(var(--endodoncia-dark))",
          },
          ortodoncia: {
            DEFAULT: "hsl(var(--ortodoncia))",
            light: "hsl(var(--ortodoncia-light))",
            dark: "hsl(var(--ortodoncia-dark))",
          },
          cirugia: {
            DEFAULT: "hsl(var(--cirugia))",
            light: "hsl(var(--cirugia-light))",
            dark: "hsl(var(--cirugia-dark))",
          },
          odontopediatria: {
            DEFAULT: "hsl(var(--odontopediatria))",
            light: "hsl(var(--odontopediatria-light))",
            dark: "hsl(var(--odontopediatria-dark))",
          },
          periodoncia: {
            DEFAULT: "hsl(var(--periodoncia))",
            light: "hsl(var(--periodoncia-light))",
            dark: "hsl(var(--periodoncia-dark))",
          },
          protesis: {
            DEFAULT: "hsl(var(--protesis))",
            light: "hsl(var(--protesis-light))",
            dark: "hsl(var(--protesis-dark))",
          },
        },
        // Enhanced role colors
        role: {
          admin: {
            DEFAULT: "hsl(var(--admin))",
            light: "hsl(var(--admin-light))",
            dark: "hsl(var(--admin-dark))",
          },
          profesor: {
            DEFAULT: "hsl(var(--profesor))",
            light: "hsl(var(--profesor-light))",
            dark: "hsl(var(--profesor-dark))",
          },
          estudiante: {
            DEFAULT: "hsl(var(--estudiante))",
            light: "hsl(var(--estudiante-light))",
            dark: "hsl(var(--estudiante-dark))",
          },
          paciente: {
            DEFAULT: "hsl(var(--paciente))",
            light: "hsl(var(--paciente-light))",
            dark: "hsl(var(--paciente-dark))",
          },
          secretario: {
            DEFAULT: "hsl(var(--secretario))",
            light: "hsl(var(--secretario-light))",
            dark: "hsl(var(--secretario-dark))",
          },
        },
        // Surface colors for better layering
        surface: {
          DEFAULT: "hsl(var(--surface))",
          variant: "hsl(var(--surface-variant))",
        },
        outline: {
          DEFAULT: "hsl(var(--outline))",
          variant: "hsl(var(--outline-variant))",
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
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in": "slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 4px 16px -4px rgba(0, 0, 0, 0.1), 0 8px 32px -8px rgba(0, 0, 0, 0.1)",
        "soft-xl": "0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 16px 64px -16px rgba(0, 0, 0, 0.12)",
        "colored-blue": "0 4px 16px -4px rgba(59, 130, 246, 0.3), 0 8px 32px -8px rgba(59, 130, 246, 0.15)",
        "colored-emerald": "0 4px 16px -4px rgba(16, 185, 129, 0.3), 0 8px 32px -8px rgba(16, 185, 129, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
