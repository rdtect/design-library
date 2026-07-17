<script lang="ts">
  import { GoldHeading, SurfaceCard, Button } from '@rdtect/ui'
  import ContactForm from '$lib/components/ContactForm.svelte'

  const capabilities = [
    {
      title: 'Experience Design',
      body: 'Spatial storytelling, DX strategy, and immersive environments — the experiential layer that makes AV premium.',
    },
    {
      title: 'AI Orchestration',
      body: 'Agent networks, agentic product systems, and the MRAX framework for human-AI collaborative intelligence.',
    },
    {
      title: 'Design Systems',
      body: 'Token-driven, Svelte 5, production-grade component libraries — architecture that scales without debt.',
    },
  ]
</script>

<svelte:head>
  <title>rdtect — experience design + AI application layer</title>
  <meta
    name="description"
    content="Rick De. I design experiences — the experiential layer and AI application layer. Architect, engineer, builder of systems that think."
  />
</svelte:head>

<!-- Hero -->
<section
  class="min-h-screen flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 pt-24 pb-16"
>
  <p class="text-text-muted text-sm font-mono tracking-widest mb-6 uppercase">
    by-rdtect.com
  </p>

  <GoldHeading level={1} shimmer>rdtect</GoldHeading>

  <p
    class="mt-6 text-2xl md:text-3xl font-light text-text-secondary max-w-2xl leading-snug"
  >
    I design experiences.
  </p>
  <p class="mt-3 text-lg text-text-muted max-w-xl leading-relaxed">
    Experiential layer · AI application layer · systems built to last.
  </p>

  <div class="mt-12 flex gap-4 flex-wrap">
    <Button variant="primary" size="lg">
      View Work
    </Button>
    <Button variant="ghost" size="lg">
      GitHub →
    </Button>
  </div>
</section>

<!-- About -->
<section class="px-8 md:px-16 lg:px-24 py-24">
  <div class="max-w-3xl">
    <SurfaceCard altitude={2}>
      <p class="text-text-muted text-xs font-mono tracking-widest uppercase mb-4">About</p>
      <h2 class="text-2xl font-semibold text-text-primary mb-4">
        Rick De — architect, engineer, builder.
      </h2>
      <p class="text-text-secondary leading-relaxed">
        rdtect is the convergence of physical experience design and AI orchestration.
        A decade designing spatial stories; now building the intelligence layer that
        makes them think.
      </p>
      <p class="text-text-secondary leading-relaxed mt-4">
        Narrator · worldbuilder · architect — three beats, one practice.
      </p>
    </SurfaceCard>
  </div>
</section>

<!-- Capabilities -->
<section class="px-8 md:px-16 lg:px-24 pb-24">
  <p class="text-text-muted text-xs font-mono tracking-widest uppercase mb-8">Work</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
    {#each capabilities as cap}
      <SurfaceCard altitude={3}>
        <h3 class="text-accent font-semibold text-lg mb-3">{cap.title}</h3>
        <p class="text-text-secondary text-sm leading-relaxed">{cap.body}</p>
      </SurfaceCard>
    {/each}
  </div>
</section>

<!-- Contact -->
<section class="px-8 md:px-16 lg:px-24 py-24">
  <ContactForm />
</section>

<!-- Footer -->
<footer class="px-8 md:px-16 lg:px-24 py-12 border-t border-surface-ridge/40">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <p class="text-text-muted text-sm font-mono">rdtect · {new Date().getFullYear()}</p>
    <div class="flex gap-6">
      <a
        href="https://github.com/rdtect"
        class="text-text-muted text-sm hover:text-accent transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://x.com/rdtect_"
        class="text-text-muted text-sm hover:text-accent transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
    </div>
  </div>
</footer>
