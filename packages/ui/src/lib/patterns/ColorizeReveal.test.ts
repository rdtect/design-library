import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import ColorizeReveal from './ColorizeReveal.svelte'

const defaultProps = { src: '/test.jpg', alt: 'Test image' }

describe('ColorizeReveal', () => {
  it('renders an img with correct src and alt', () => {
    const { container } = render(ColorizeReveal, defaultProps)
    const img = container.querySelector('img') as HTMLImageElement
    expect(img.src).toContain('/test.jpg')
    expect(img.alt).toBe('Test image')
  })

  it('starts in grayscale state', () => {
    const { container } = render(ColorizeReveal, defaultProps)
    const img = container.querySelector('img')!
    expect(img.className).toContain('grayscale')
    expect(img.className).not.toContain('grayscale-0')
  })

  it('starts at scale-100', () => {
    const { container } = render(ColorizeReveal, defaultProps)
    expect(container.querySelector('img')!.className).toContain('scale-100')
  })

  it('colorizes on mouseenter — grayscale removed, scale-105 applied', async () => {
    const { container } = render(ColorizeReveal, defaultProps)
    const wrapper = container.querySelector('div')!
    await fireEvent.mouseEnter(wrapper)
    const img = container.querySelector('img')!
    expect(img.className).toContain('grayscale-0')
    expect(img.className).toContain('scale-105')
    expect(img.className).not.toContain('scale-100')
  })

  it('reverts on mouseleave', async () => {
    const { container } = render(ColorizeReveal, defaultProps)
    const wrapper = container.querySelector('div')!
    await fireEvent.mouseEnter(wrapper)
    await fireEvent.mouseLeave(wrapper)
    const img = container.querySelector('img')!
    expect(img.className).toContain('grayscale')
    expect(img.className).toContain('scale-100')
    expect(img.className).not.toContain('grayscale-0')
  })

  it('merges extra class onto wrapper', () => {
    const { container } = render(ColorizeReveal, { ...defaultProps, class: 'aspect-video' })
    expect(container.querySelector('div')!.className).toContain('aspect-video')
  })

  it('wrapper has rounded-lg and overflow-hidden base classes', () => {
    const { container } = render(ColorizeReveal, defaultProps)
    const div = container.querySelector('div')!
    expect(div.className).toContain('rounded-lg')
    expect(div.className).toContain('overflow-hidden')
  })
})
