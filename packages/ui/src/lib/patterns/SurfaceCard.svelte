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

  const altitudeShadow = [
    'shadow-flat',
    'shadow-flat',
    'shadow-floating',
    'shadow-elevated',
    'shadow-elevated'
  ]

  const glassMod = glass
    ? 'backdrop-blur-[var(--blur-standard)] bg-opacity-60'
    : ''
</script>

<div
  class="
    rounded-2xl border border-surface-peak/20 p-6
    {altitudeSurface[altitude]}
    {altitudeShadow[altitude]}
    {glassMod}
    {extraClass}
  "
>
  {@render children?.()}
</div>
