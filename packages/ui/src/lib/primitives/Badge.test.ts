import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Badge from './Badge.svelte'

describe('Badge', () => {
  it('renders a span element', () => {
    const { container } = render(Badge)
    expect(container.querySelector('span')).toBeDefined()
  })

  it('applies default variant classes', () => {
    const { container } = render(Badge)
    const span = container.querySelector('span')!
    expect(span.className).toContain('bg-surface-peak')
    expect(span.className).toContain('text-text-secondary')
  })

  it('applies accent variant classes', () => {
    const { container } = render(Badge, { variant: 'accent' })
    const span = container.querySelector('span')!
    expect(span.className).toContain('text-accent')
  })

  it('applies md size classes by default', () => {
    const { container } = render(Badge)
    const span = container.querySelector('span')!
    expect(span.className).toContain('px-2.5')
  })

  it('applies sm size classes', () => {
    const { container } = render(Badge, { size: 'sm' })
    const span = container.querySelector('span')!
    expect(span.className).toContain('px-2')
    expect(span.className).toContain('text-xs')
  })

  it('has rounded-full class', () => {
    const { container } = render(Badge)
    expect(container.querySelector('span')!.className).toContain('rounded-full')
  })
})
