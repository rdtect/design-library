import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import SurfaceCard from './SurfaceCard.svelte'

describe('SurfaceCard', () => {
  it('renders a div container', () => {
    const { container } = render(SurfaceCard)
    expect(container.querySelector('div')).toBeDefined()
  })

  it('defaults to altitude=2 (terrain surface)', () => {
    const { container } = render(SurfaceCard)
    expect(container.querySelector('div')!.className).toContain('bg-surface-terrain')
  })

  it('altitude=0 uses ground surface', () => {
    const { container } = render(SurfaceCard, { altitude: 0 })
    expect(container.querySelector('div')!.className).toContain('bg-surface-ground')
  })

  it('altitude=1 uses bedrock surface', () => {
    const { container } = render(SurfaceCard, { altitude: 1 })
    expect(container.querySelector('div')!.className).toContain('bg-surface-bedrock')
  })

  it('altitude=3 uses ridge surface', () => {
    const { container } = render(SurfaceCard, { altitude: 3 })
    expect(container.querySelector('div')!.className).toContain('bg-surface-ridge')
  })

  it('altitude=4 uses peak surface', () => {
    const { container } = render(SurfaceCard, { altitude: 4 })
    expect(container.querySelector('div')!.className).toContain('bg-surface-peak')
  })

  it('glass=false does not apply backdrop-blur', () => {
    const { container } = render(SurfaceCard, { glass: false })
    expect(container.querySelector('div')!.className).not.toContain('backdrop-blur')
  })

  it('glass=true adds backdrop-blur class', () => {
    const { container } = render(SurfaceCard, { glass: true })
    expect(container.querySelector('div')!.className).toContain('backdrop-blur')
  })

  it('glass=true uses transparent surface variant', () => {
    const { container } = render(SurfaceCard, { altitude: 2, glass: true })
    expect(container.querySelector('div')!.className).toContain('bg-surface-terrain/60')
  })

  it('altitude=2 applies shadow-floating', () => {
    const { container } = render(SurfaceCard, { altitude: 2 })
    expect(container.querySelector('div')!.className).toContain('shadow-floating')
  })

  it('altitude=4 applies shadow-elevated', () => {
    const { container } = render(SurfaceCard, { altitude: 4 })
    expect(container.querySelector('div')!.className).toContain('shadow-elevated')
  })

  it('applies base rounded-2xl and border classes', () => {
    const { container } = render(SurfaceCard)
    const div = container.querySelector('div')!
    expect(div.className).toContain('rounded-2xl')
    expect(div.className).toContain('border')
  })

  it('merges extra class prop', () => {
    const { container } = render(SurfaceCard, { class: 'mt-4 w-full' })
    const div = container.querySelector('div')!
    expect(div.className).toContain('mt-4')
    expect(div.className).toContain('w-full')
  })
})
