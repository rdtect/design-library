import type { Action } from 'svelte/action'

interface MagneticOptions {
  strength?: number
  ease?: number
}

export const magnetic: Action<HTMLElement, MagneticOptions | undefined> = (
  node,
  options = {}
) => {
  let strength = options?.strength ?? 0.3
  let ease = options?.ease ?? 0.15

  let animFrame: number | null = null
  let active = false
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  function onMouseEnter() {
    active = true
    if (!animFrame) animFrame = requestAnimationFrame(animate)
  }

  function onMouseMove(e: MouseEvent) {
    const rect = node.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    targetX = (e.clientX - centerX) * strength
    targetY = (e.clientY - centerY) * strength
  }

  function onMouseLeave() {
    active = false
    targetX = 0
    targetY = 0
  }

  function animate() {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    node.style.transform = `translate(${currentX}px, ${currentY}px)`

    if (!active && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
      node.style.transform = ''
      animFrame = null
      return
    }
    animFrame = requestAnimationFrame(animate)
  }

  node.addEventListener('mouseenter', onMouseEnter)
  node.addEventListener('mousemove', onMouseMove)
  node.addEventListener('mouseleave', onMouseLeave)

  return {
    update(newOptions: MagneticOptions = {}) {
      strength = newOptions.strength ?? strength
      ease = newOptions.ease ?? ease
    },
    destroy() {
      if (animFrame) cancelAnimationFrame(animFrame)
      node.removeEventListener('mouseenter', onMouseEnter)
      node.removeEventListener('mousemove', onMouseMove)
      node.removeEventListener('mouseleave', onMouseLeave)
      node.style.transform = ''
    }
  }
}
