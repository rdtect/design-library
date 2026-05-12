<script lang="ts">
  import { magnetic } from '../behaviors/magnetic.js'

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    magneticStrength?: number
    onclick?: (e: MouseEvent) => void
    children?: import('svelte').Snippet
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    magneticStrength = 0.3,
    onclick,
    children
  }: Props = $props()

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-surface-ridge text-accent border border-accent/20 shadow-floating hover:shadow-accent-glow hover:border-accent/50',
    secondary: 'bg-surface-terrain text-text-primary border border-surface-peak shadow-floating hover:shadow-elevated',
    ghost: 'bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:border-surface-peak'
  }
</script>

<button
  use:magnetic={{ strength: magneticStrength }}
  class="
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-[var(--duration-standard)] ease-[var(--ease-magnetic)]
    active:shadow-pressed active:translate-y-px
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    {sizeClasses[size]}
    {variantClasses[variant]}
  "
  {disabled}
  {onclick}
>
  {@render children?.()}
</button>
