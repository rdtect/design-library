import type { Action } from 'svelte/action'

interface MagneticOptions {
  strength?: number
  ease?: number
}

export const magnetic: Action<HTMLElement, MagneticOptions | undefined> = (
  node,
  options = {}
) => {
  const strength = options.strength ?? 0.3
  const ease = options.ease ?? 0.15

  let animFrame: number
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  function onMouseMove(e: MouseEvent) {
    const rect = node.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    targetX = (e.clientX - centerX) * strength
    targetY = (e.clientY - centerY) * strength
  }

  function onMouseLeave() {
    targetX = 0
    targetY = 0
  }

  function animate() {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    node.style.transform = `translate(${currentX}px, ${currentY}px)`
    animFrame = requestAnimationFrame(animate)
  }

  node.addEventListener('mousemove', onMouseMove)
  node.addEventListener('mouseleave', onMouseLeave)
  animFrame = requestAnimationFrame(animate)

  return {
    update(newOptions: MagneticOptions = {}) {
      Object.assign(options, newOptions)
    },
    destroy() {
      cancelAnimationFrame(animFrame)
      node.removeEventListener('mousemove', onMouseMove)
      node.removeEventListener('mouseleave', onMouseLeave)
      node.style.transform = ''
    }
  }
}
