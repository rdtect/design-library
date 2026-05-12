<script lang="ts">
  interface Props {
    src: string
    alt: string
    class?: string
  }

  let { src, alt, class: extraClass = '' }: Props = $props()
  let hovered = $state(false)
</script>

<!-- grayscale-to-color-reveal: media starts desaturated, colorizes on hover -->
<div
  role="img"
  aria-label={alt}
  class="relative overflow-hidden rounded-lg {extraClass}"
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
>
  <img
    {src}
    {alt}
    class="
      w-full h-full object-cover
      transition-all duration-[var(--duration-reveal)] ease-[var(--ease-out)]
      {hovered ? 'grayscale-0 scale-105' : 'grayscale scale-100'}
    "
  />
</div>
