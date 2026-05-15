import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import GoldHeading from './GoldHeading.svelte'

describe('GoldHeading', () => {
  it('renders h1 by default', () => {
    const { container } = render(GoldHeading)
    expect(container.querySelector('h1')).toBeDefined()
    expect(container.querySelector('h2')).toBeNull()
    expect(container.querySelector('h3')).toBeNull()
  })

  it('renders h2 when level=2', () => {
    const { container } = render(GoldHeading, { level: 2 })
    expect(container.querySelector('h2')).toBeDefined()
    expect(container.querySelector('h1')).toBeNull()
  })

  it('renders h3 when level=3', () => {
    const { container } = render(GoldHeading, { level: 3 })
    expect(container.querySelector('h3')).toBeDefined()
    expect(container.querySelector('h1')).toBeNull()
  })

  it('applies gold gradient classes', () => {
    const { container } = render(GoldHeading)
    const h1 = container.querySelector('h1')!
    expect(h1.className).toContain('bg-gradient-to-r')
    expect(h1.className).toContain('text-transparent')
    expect(h1.className).toContain('bg-clip-text')
  })

  it('does not apply shimmer class by default', () => {
    const { container } = render(GoldHeading)
    expect(container.querySelector('h1')!.className).not.toContain('rdtect-shimmer')
  })

  it('applies shimmer class when shimmer=true', () => {
    const { container } = render(GoldHeading, { shimmer: true })
    expect(container.querySelector('h1')!.className).toContain('rdtect-shimmer')
  })

  it('merges extra class prop', () => {
    const { container } = render(GoldHeading, { class: 'mt-8 custom' })
    expect(container.querySelector('h1')!.className).toContain('mt-8')
    expect(container.querySelector('h1')!.className).toContain('custom')
  })

  it('h1 applies text-5xl, h2 applies text-3xl, h3 applies text-xl', () => {
    const { container: c1 } = render(GoldHeading, { level: 1 })
    expect(c1.querySelector('h1')!.className).toContain('text-5xl')

    const { container: c2 } = render(GoldHeading, { level: 2 })
    expect(c2.querySelector('h2')!.className).toContain('text-3xl')

    const { container: c3 } = render(GoldHeading, { level: 3 })
    expect(c3.querySelector('h3')!.className).toContain('text-xl')
  })
})
