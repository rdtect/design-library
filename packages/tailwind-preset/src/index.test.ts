import { describe, it, expect } from 'vitest'
import { rdtectPreset } from './index.js'

describe('rdtectPreset', () => {
  it('exports a preset config object', () => {
    expect(rdtectPreset).toBeDefined()
    expect(rdtectPreset).toBeTypeOf('object')
  })

  describe('colors', () => {
    const colors = () => (rdtectPreset.theme?.extend?.colors as Record<string, unknown>)

    it('has surface altitude tiers', () => {
      const surface = colors().surface as Record<string, string>
      expect(surface).toMatchObject({
        ground:  'var(--surface-ground)',
        bedrock: 'var(--surface-bedrock)',
        terrain: 'var(--surface-terrain)',
        ridge:   'var(--surface-ridge)',
        peak:    'var(--surface-peak)',
      })
    })

    it('has accent gold scale', () => {
      const accent = colors().accent as Record<string, string>
      expect(accent.DEFAULT).toBe('var(--accent)')
      expect(accent.light).toBe('var(--accent-light)')
      expect(accent.dark).toBe('var(--accent-dark)')
    })

    it('has semantic status colors', () => {
      const status = colors().status as Record<string, string>
      expect(status).toHaveProperty('success')
      expect(status).toHaveProperty('warning')
      expect(status).toHaveProperty('error')
      expect(status).toHaveProperty('info')
    })

    it('has text hierarchy', () => {
      const text = colors().text as Record<string, string>
      expect(text).toHaveProperty('primary')
      expect(text).toHaveProperty('secondary')
      expect(text).toHaveProperty('muted')
      expect(text).toHaveProperty('inverse')
    })
  })

  describe('boxShadow', () => {
    const shadows = () => rdtectPreset.theme?.extend?.boxShadow as Record<string, string>

    it('has neumorphic elevation tiers', () => {
      expect(shadows()).toMatchObject({
        flat:       'var(--shadow-flat)',
        pressed:    'var(--shadow-pressed)',
        floating:   'var(--shadow-floating)',
        elevated:   'var(--shadow-elevated)',
      })
    })

    it('has accent glow shadow', () => {
      expect(shadows()).toHaveProperty('accent-glow')
    })
  })

  describe('backdropBlur', () => {
    it('has named blur scale', () => {
      const blur = rdtectPreset.theme?.extend?.backdropBlur as Record<string, string>
      expect(blur).toMatchObject({
        light:    'var(--blur-light)',
        standard: 'var(--blur-standard)',
        heavy:    'var(--blur-heavy)',
        extreme:  'var(--blur-extreme)',
      })
    })
  })

  describe('borderRadius', () => {
    it('has all radius steps', () => {
      const radius = rdtectPreset.theme?.extend?.borderRadius as Record<string, string>
      expect(radius).toHaveProperty('sm')
      expect(radius).toHaveProperty('base')
      expect(radius).toHaveProperty('md')
      expect(radius).toHaveProperty('lg')
      expect(radius).toHaveProperty('xl')
    })
  })

  describe('fontFamily', () => {
    it('has body, display, and mono families', () => {
      const fonts = rdtectPreset.theme?.extend?.fontFamily as Record<string, unknown>
      expect(fonts).toHaveProperty('body')
      expect(fonts).toHaveProperty('display')
      expect(fonts).toHaveProperty('mono')
    })
  })

  describe('zIndex', () => {
    it('has semantic z-index scale', () => {
      const z = rdtectPreset.theme?.extend?.zIndex as Record<string, string>
      expect(z).toHaveProperty('modal')
      expect(z).toHaveProperty('overlay')
      expect(z).toHaveProperty('tooltip')
    })
  })
})
