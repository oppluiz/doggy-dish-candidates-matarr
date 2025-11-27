import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '4rem', // 64px gutter on desktop
        '2xl': '4rem', // keep same gutter on very large screens
      },
      screens: {
        sm: '40rem',
        md: '60rem', // 960px - increased mobile/tablet breakpoint
        lg: '60rem', // 960px - adjusted to maintain hierarchy
        xl: '60rem', // 960px desktop container
        '2xl': '60rem', // clamp to 960px for larger screens too
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'bounce-subtle': 'bounce-subtle 0.6s ease-out',
        'bounce-smooth': 'bounce-smooth 0.8s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'light-green': '#C8E8DF',
        'dark-green': '#41A690',
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'primary-background': 'hsl(var(--primary-background))',
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        lato: ['var(--font-lato)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '1',
          },
        },
        'bounce-smooth': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '30%': {
            transform: 'translateY(-3px) rotate(0deg)',
          },
          '45%': {
            transform: 'translateY(-1.5px) rotate(-5deg)',
          },
          '65%': {
            transform: 'translateY(-1px) rotate(0deg)',
          },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',

              // Remove margins for headings
              h1: { marginTop: '0', marginBottom: '0' },
              h2: { marginTop: '0', marginBottom: '0' },
              h3: { marginTop: '0', marginBottom: '0' },
              h4: { marginTop: '0', marginBottom: '0' },
              h5: { marginTop: '0', marginBottom: '0' },
              h6: { marginTop: '0', marginBottom: '0' },

              a: { color: 'black', fontWeight: 300 },

              // Remove margins for paragraphs
              p: { marginTop: '0', marginBottom: '0' },

              // Remove margins for lists
              ul: { marginTop: '0', marginBottom: '0' },
              ol: { marginTop: '0', marginBottom: '0' },
              li: { marginTop: '0', marginBottom: '0' },

              // Remove margins for media wrappers
              picture: { marginTop: '0', marginBottom: '0' },
              img: { marginTop: '0', marginBottom: '0' },
              figure: { marginTop: '0', marginBottom: '0' },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
