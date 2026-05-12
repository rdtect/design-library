<script lang="ts">
  interface Props {
    value?: string
    placeholder?: string
    label?: string
    disabled?: boolean
    error?: string
    oninput?: (e: Event & { currentTarget: HTMLInputElement }) => void
  }

  let {
    value = $bindable(''),
    placeholder = '',
    label,
    disabled = false,
    error,
    oninput
  }: Props = $props()
</script>

<div class="flex flex-col gap-1.5">
  {#if label}
    <label class="text-sm font-medium text-text-secondary">{label}</label>
  {/if}
  <input
    bind:value
    {placeholder}
    {disabled}
    {oninput}
    class="
      w-full px-4 py-2.5
      bg-surface-terrain text-text-primary
      border rounded-lg text-base
      transition-all duration-[var(--duration-fast)]
      placeholder:text-text-muted
      focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
      disabled:opacity-40 disabled:cursor-not-allowed
      {error ? 'border-status-error shadow-[0_0_0_1px_var(--status-error)]' : 'border-surface-peak'}
    "
  />
  {#if error}
    <span class="text-xs text-status-error">{error}</span>
  {/if}
</div>
