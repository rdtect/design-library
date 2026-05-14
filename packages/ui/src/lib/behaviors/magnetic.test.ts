import { describe, it, expect, vi, beforeEach } from 'vitest'
import { magnetic } from './magnetic.js'

describe('magnetic action', () => {
  let node: HTMLElement

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  it('attaches without error using default options', () => {
    expect(() => magnetic(node, undefined)).not.toThrow()
  })

  it('cleans up transform on destroy', () => {
    node.style.transform = 'translate(10px, 10px)'
    const action = magnetic(node, { strength: 0.3 })
    action.destroy!()
    expect(node.style.transform).toBe('')
  })

  it('updates strength via update()', () => {
    const action = magnetic(node, { strength: 0.3 })
    expect(() => action.update!({ strength: 0.5 })).not.toThrow()
    action.destroy!()
  })

  it('cancels RAF on destroy', () => {
    const cancelSpy = vi.spyOn(globalThis, 'cancelAnimationFrame')
    const action = magnetic(node, {})
    // Trigger RAF by firing mouseenter
    node.dispatchEvent(new MouseEvent('mouseenter'))
    action.destroy!()
    expect(cancelSpy).toHaveBeenCalled()
    cancelSpy.mockRestore()
  })

  it('removes event listeners on destroy', () => {
    const removeSpy = vi.spyOn(node, 'removeEventListener')
    const action = magnetic(node, {})
    action.destroy!()
    expect(removeSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function))
  })
})
