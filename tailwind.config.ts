import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1440px" } },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Crimson Canvas Palette */
        crimson: {
          DEFAULT: "#8B1E3F",
          hover: "#721531",
          dark: "#5A1026",
          light: "#A4264C",
          soft: "#FDF2F4",
          muted: "#E5B6BD",
        },
        /* ChatGPT Suggested Brand Colors */
        "sage": {
          DEFAULT: "#E8F0E8",
          light: "#F2F7F2",
          dark: "#D4E2D4",
        },
        "forest": {
          DEFAULT: "#526653",
          hover: "#435444",
          light: "#69816A",
          dark: "#344235",
        },
        "offwhite": "#F7F7F5",
        "charcoal": {
          DEFAULT: "#333333",
          dark: "#1F2421",
          light: "#4D4D4D",
        },
        "text-secondary": "#666666",
        "hover-bg": "#EFEFEF",
        "soft-bg": "#F7F7F5",
      },
      borderRadius: {
        /* DESIGN.md: Small UI 8px, Cards 16px, Large 24px, Pill 9999px */
        sm: "8px",
        DEFAULT: "16px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        pill: "9999px",
      },
      spacing: {
        /* DESIGN.md spacing scale additions */
        '18': '4.5rem',   /* 72px */
        '22': '5.5rem',   /* 88px */
        '26': '6.5rem',   /* 104px */
      },
      maxWidth: {
        'container': '1440px',
        'content': '1280px',
        'reading': '720px',
      },
      fontSize: {
        /* DESIGN.md typography scale */
        'hero': ['3.5rem', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.02em' }],
        'section': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'product': ['1rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      boxShadow: {
        /* DESIGN.md: extremely subtle shadows */
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slide-in-right": { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        /* DESIGN.md: 200-500ms transitions */
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
