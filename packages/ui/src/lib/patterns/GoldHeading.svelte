<script lang="ts">
  interface Props {
    level?: 1 | 2 | 3
    shimmer?: boolean
    class?: string
    children?: import('svelte').Snippet
  }

  let {
    level = 1,
    shimmer = false,
    class: extraClass = '',
    children
  }: Props = $props()

  const baseClass = `
    font-display font-bold tracking-tight
    bg-gradient-to-r from-accent via-accent-light to-accent
    bg-clip-text text-transparent
    ${shimmer ? 'animate-shimmer' : ''}
    ${extraClass}
  `
</script>

{#if level === 1}
  <h1 class="text-5xl leading-tight {baseClass}">{@render children?.()}</h1>
{:else if level === 2}
  <h2 class="text-3xl leading-snug {baseClass}">{@render children?.()}</h2>
{:else}
  <h3 class="text-xl leading-snug {baseClass}">{@render children?.()}</h3>
{/if}
