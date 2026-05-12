import type { Config } from 'tailwindcss'

export const rdtectPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        surface: {
          ground:  'var(--surface-ground)',
          bedrock: 'var(--surface-bedrock)',
          terrain: 'var(--surface-terrain)',
          ridge:   'var(--surface-ridge)',
          peak:    'var(--surface-peak)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light:   'var(--accent-light)',
          dark:    'var(--accent-dark)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          inverse:   'var(--text-inverse)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error:   'var(--status-error)',
          info:    'var(--status-info)',
        },
      },
      boxShadow: {
        flat:       'var(--shadow-flat)',
        pressed:    'var(--shadow-pressed)',
        floating:   'var(--shadow-floating)',
        elevated:   'var(--shadow-elevated)',
        'accent-glow': 'var(--shadow-accent-glow)',
      },
      backdropBlur: {
        light:    'var(--blur-light)',
        standard: 'var(--blur-standard)',
        heavy:    'var(--blur-heavy)',
        extreme:  'var(--blur-extreme)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        base: 'var(--radius-base)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      fontFamily: {
        body:    ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono:    ['var(--font-mono)'],
      },
      transitionTimingFunction: {
        spring:   'var(--ease-spring)',
        magnetic: 'var(--ease-magnetic)',
      },
      zIndex: {
        below:    'var(--z-below)',
        base:     'var(--z-base)',
        raised:   'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        overlay:  'var(--z-overlay)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
        tooltip:  'var(--z-tooltip)',
        cursor:   'var(--z-cursor)',
      },
    },
  },
}
