import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Button from './Button.svelte'

describe('Button', () => {
  it('renders a button element', () => {
    const { getByRole } = render(Button)
    expect(getByRole('button')).toBeDefined()
  })

  it('is not disabled by default', () => {
    const { getByRole } = render(Button)
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(false)
  })

  it('respects the disabled prop', () => {
    const { getByRole } = render(Button, { disabled: true })
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('applies md size classes by default', () => {
    const { getByRole } = render(Button)
    const btn = getByRole('button')
    expect(btn.className).toContain('px-5')
    expect(btn.className).toContain('py-2.5')
  })

  it('applies sm size classes', () => {
    const { getByRole } = render(Button, { size: 'sm' })
    const btn = getByRole('button')
    expect(btn.className).toContain('px-3')
    expect(btn.className).toContain('py-1.5')
  })

  it('applies primary variant classes by default', () => {
    const { getByRole } = render(Button)
    expect(getByRole('button').className).toContain('bg-surface-ridge')
  })

  it('applies ghost variant classes', () => {
    const { getByRole } = render(Button, { variant: 'ghost' })
    expect(getByRole('button').className).toContain('bg-transparent')
  })
})
