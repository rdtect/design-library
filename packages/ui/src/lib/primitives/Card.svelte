<script lang="ts">
  interface Props {
    elevation?: 'flat' | 'floating' | 'elevated'
    surface?: 'terrain' | 'ridge' | 'peak'
    class?: string
    children?: import('svelte').Snippet
  }

  let {
    elevation = 'floating',
    surface = 'terrain',
    class: extraClass = '',
    children
  }: Props = $props()

  const elevationClasses = {
    flat:     'shadow-flat',
    floating: 'shadow-floating',
    elevated: 'shadow-elevated'
  }

  const surfaceClasses = {
    terrain: 'bg-surface-terrain',
    ridge:   'bg-surface-ridge',
    peak:    'bg-surface-peak'
  }
</script>

<div
  class="
    rounded-xl border border-surface-peak/30
    {elevationClasses[elevation]}
    {surfaceClasses[surface]}
    {extraClass}
  "
>
  {@render children?.()}
</div>
