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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        // Medical Specialties
        endodoncia: {
          DEFAULT: "hsl(var(--endodoncia))",
          foreground: "hsl(var(--endodoncia-foreground))",
        },
        ortodoncia: {
          DEFAULT: "hsl(var(--ortodoncia))",
          foreground: "hsl(var(--ortodoncia-foreground))",
        },
        cirugia: {
          DEFAULT: "hsl(var(--cirugia))",
          foreground: "hsl(var(--cirugia-foreground))",
        },
        odontopediatria: {
          DEFAULT: "hsl(var(--odontopediatria))",
          foreground: "hsl(var(--odontopediatria-foreground))",
        },
        periodoncia: {
          DEFAULT: "hsl(var(--periodoncia))",
          foreground: "hsl(var(--periodoncia-foreground))",
        },
        protesis: {
          DEFAULT: "hsl(var(--protesis))",
          foreground: "hsl(var(--protesis-foreground))",
        },
        // User Roles
        admin: {
          DEFAULT: "hsl(var(--admin))",
          foreground: "hsl(var(--admin-foreground))",
        },
        profesor: {
          DEFAULT: "hsl(var(--profesor))",
          foreground: "hsl(var(--profesor-foreground))",
        },
        estudiante: {
          DEFAULT: "hsl(var(--estudiante))",
          foreground: "hsl(var(--estudiante-foreground))",
        },
        paciente: {
          DEFAULT: "hsl(var(--paciente))",
          foreground: "hsl(var(--paciente-foreground))",
        },
        secretario: {
          DEFAULT: "hsl(var(--secretario))",
          foreground: "hsl(var(--secretario-foreground))",
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
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
