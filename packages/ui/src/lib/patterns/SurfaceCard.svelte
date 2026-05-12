<script lang="ts">
  interface Props {
    altitude?: 0 | 1 | 2 | 3 | 4
    glass?: boolean
    class?: string
    children?: import('svelte').Snippet
  }

  let {
    altitude = 2,
    glass = false,
    class: extraClass = '',
    children
  }: Props = $props()

  const altitudeSurface = [
    'bg-surface-ground',
    'bg-surface-bedrock',
    'bg-surface-terrain',
    'bg-surface-ridge',
    'bg-surface-peak'
  ]

  const altitudeSurfaceGlass = [
    'bg-surface-ground/60',
    'bg-surface-bedrock/60',
    'bg-surface-terrain/60',
    'bg-surface-ridge/60',
    'bg-surface-peak/60'
  ]

  const altitudeShadow = [
    'shadow-flat',
    'shadow-flat',
    'shadow-floating',
    'shadow-elevated',
    'shadow-elevated'
  ]

  const bgClass = $derived(glass ? altitudeSurfaceGlass[altitude] : altitudeSurface[altitude])
  const glassMod = $derived(glass ? 'backdrop-blur-[var(--blur-standard)]' : '')
</script>

<div
  class="
    rounded-2xl border border-surface-peak/20 p-6
    {bgClass}
    {altitudeShadow[altitude]}
    {glassMod}
    {extraClass}
  "
>
  {@render children?.()}
</div>
