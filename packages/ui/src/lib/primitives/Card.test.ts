import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Card from './Card.svelte'

describe('Card', () => {
  it('renders a div element', () => {
    const { container } = render(Card)
    expect(container.querySelector('div')).toBeDefined()
  })

  it('has rounded-xl and border base classes', () => {
    const { container } = render(Card)
    const div = container.querySelector('div')!
    expect(div.className).toContain('rounded-xl')
    expect(div.className).toContain('border')
  })

  it('applies floating elevation by default', () => {
    const { container } = render(Card)
    expect(container.querySelector('div')!.className).toContain('shadow-floating')
  })

  it('applies flat elevation when specified', () => {
    const { container } = render(Card, { elevation: 'flat' })
    expect(container.querySelector('div')!.className).toContain('shadow-flat')
  })

  it('applies elevated elevation when specified', () => {
    const { container } = render(Card, { elevation: 'elevated' })
    expect(container.querySelector('div')!.className).toContain('shadow-elevated')
  })

  it('applies terrain surface by default', () => {
    const { container } = render(Card)
    expect(container.querySelector('div')!.className).toContain('bg-surface-terrain')
  })

  it('applies ridge surface when specified', () => {
    const { container } = render(Card, { surface: 'ridge' })
    expect(container.querySelector('div')!.className).toContain('bg-surface-ridge')
  })

  it('applies peak surface when specified', () => {
    const { container } = render(Card, { surface: 'peak' })
    expect(container.querySelector('div')!.className).toContain('bg-surface-peak')
  })

  it('merges extra class prop', () => {
    const { container } = render(Card, { class: 'p-4 custom-class' })
    const div = container.querySelector('div')!
    expect(div.className).toContain('p-4')
    expect(div.className).toContain('custom-class')
  })
})
