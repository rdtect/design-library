import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Input from './Input.svelte'

describe('Input', () => {
  it('renders an input element', () => {
    const { container } = render(Input)
    expect(container.querySelector('input')).toBeDefined()
  })

  it('does not render label when label prop is absent', () => {
    const { container } = render(Input)
    expect(container.querySelector('label')).toBeNull()
  })

  it('renders label when label prop is provided', () => {
    const { container } = render(Input, { label: 'Email' })
    const label = container.querySelector('label')
    expect(label).toBeDefined()
    expect(label!.textContent).toBe('Email')
  })

  it('links label to input via for/id', () => {
    const { container } = render(Input, { label: 'First Name' })
    const label = container.querySelector('label')!
    const input = container.querySelector('input')!
    expect(label.htmlFor).toBe(input.id)
    expect(input.id).toBe('input-first-name')
  })

  it('is not disabled by default', () => {
    const { container } = render(Input)
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(false)
  })

  it('respects disabled prop', () => {
    const { container } = render(Input, { disabled: true })
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(true)
  })

  it('passes placeholder to input', () => {
    const { container } = render(Input, { placeholder: 'Enter email' })
    expect((container.querySelector('input') as HTMLInputElement).placeholder).toBe('Enter email')
  })

  it('does not render error message when error is absent', () => {
    const { container } = render(Input)
    expect(container.querySelector('span')).toBeNull()
  })

  it('renders error message when error prop is provided', () => {
    const { container } = render(Input, { error: 'Required field' })
    const span = container.querySelector('span')
    expect(span).toBeDefined()
    expect(span!.textContent).toBe('Required field')
  })

  it('applies error border class when error is set', () => {
    const { container } = render(Input, { error: 'Invalid' })
    const input = container.querySelector('input')!
    expect(input.className).toContain('border-status-error')
  })

  it('applies normal border class when no error', () => {
    const { container } = render(Input)
    const input = container.querySelector('input')!
    expect(input.className).toContain('border-surface-peak')
  })
})
