<script lang="ts">
  interface Props {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'
    size?: 'sm' | 'md'
    children?: import('svelte').Snippet
  }

  let {
    variant = 'default',
    size = 'md',
    children
  }: Props = $props()

  const variantClasses = {
    default: 'bg-surface-peak text-text-secondary border-surface-ridge',
    accent:  'bg-[var(--accent-shimmer)] text-accent border-[var(--accent-glow)]',
    success: 'bg-[var(--status-success-bg)] text-[var(--status-success)] border-[var(--status-success-glow)]',
    warning: 'bg-[var(--status-warning-bg)] text-[var(--status-warning)] border-[var(--status-warning-glow)]',
    error:   'bg-[var(--status-error-bg)] text-[var(--status-error)] border-[var(--status-error-glow)]',
    info:    'bg-[var(--status-info-bg)] text-[var(--status-info)] border-[var(--status-info-glow)]',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }
</script>

<span
  class="
    inline-flex items-center
    font-medium rounded-full border
    {variantClasses[variant]}
    {sizeClasses[size]}
  "
>
  {@render children?.()}
</span>
