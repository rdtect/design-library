<script lang="ts">
  import { GoldHeading, SurfaceCard } from '@rdtect/ui'
  import type { PageData } from './$types'

  export let data: PageData

  const { caseStudy, allCaseStudies } = data

  const currentIndex = allCaseStudies.findIndex((cs) => cs.slug === caseStudy.slug)
  const nextCase = allCaseStudies[(currentIndex + 1) % allCaseStudies.length]
</script>

<svelte:head>
  <title>{caseStudy.title} — rdtect</title>
  <meta name="description" content={caseStudy.challenge.substring(0, 160)} />
</svelte:head>

<!-- Hero -->
<section class="min-h-screen flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 pt-24 pb-16">
  <p class="text-text-muted text-sm font-mono tracking-widest mb-6 uppercase">
    Case Study
  </p>

  <GoldHeading level={1} shimmer>{caseStudy.title}</GoldHeading>

  <div class="mt-8 flex flex-col md:flex-row gap-8">
    <div class="flex-1">
      <p class="text-text-muted text-sm uppercase tracking-widest mb-2">Client</p>
      <p class="text-lg text-text-secondary">{caseStudy.client}</p>

      <p class="text-text-muted text-sm uppercase tracking-widest mb-2 mt-6">Category</p>
      <p class="text-lg text-text-secondary">{caseStudy.category}</p>

      {#if caseStudy.video_url}
        <p class="text-text-muted text-sm uppercase tracking-widest mb-2 mt-6">Video</p>
        <a
          href={caseStudy.video_url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent hover:text-accent-hover transition-colors"
        >
          View on YouTube →
        </a>
      {/if}
    </div>
  </div>
</section>

<!-- Content -->
<section class="px-8 md:px-16 lg:px-24 py-24">
  <div class="max-w-3xl space-y-16">
    <!-- Challenge -->
    <div>
      <h2 class="text-2xl font-semibold text-text-primary mb-4">Challenge</h2>
      <SurfaceCard altitude={2}>
        <p class="text-text-secondary leading-relaxed whitespace-pre-wrap">
          {caseStudy.challenge}
        </p>
      </SurfaceCard>
    </div>

    <!-- Solution -->
    <div>
      <h2 class="text-2xl font-semibold text-text-primary mb-4">Solution</h2>
      <SurfaceCard altitude={2}>
        <p class="text-text-secondary leading-relaxed whitespace-pre-wrap">
          {caseStudy.solution}
        </p>
      </SurfaceCard>
    </div>

    <!-- Outcome -->
    <div>
      <h2 class="text-2xl font-semibold text-text-primary mb-4">Outcome</h2>
      <SurfaceCard altitude={2}>
        <p class="text-text-secondary leading-relaxed whitespace-pre-wrap">
          {caseStudy.outcome}
        </p>
      </SurfaceCard>
    </div>

    <!-- Rick's Lens -->
    <div>
      <h2 class="text-2xl font-semibold text-text-primary mb-4">Rick's Lens</h2>
      <SurfaceCard altitude={2}>
        <p class="text-text-secondary leading-relaxed whitespace-pre-wrap">
          {caseStudy.lens}
        </p>
      </SurfaceCard>
    </div>

    <!-- Source -->
    <div class="pt-8 border-t border-surface-ridge/40">
      <p class="text-text-muted text-sm">
        Source: <span class="text-accent">{caseStudy.source}</span>
      </p>
    </div>
  </div>
</section>

<!-- Next Case Study -->
<section class="px-8 md:px-16 lg:px-24 py-24 border-t border-surface-ridge/40">
  <p class="text-text-muted text-xs font-mono tracking-widest uppercase mb-8">Next</p>
  <a href="/work/{nextCase.slug}" class="block group">
    <SurfaceCard altitude={3} interactive>
      <h3 class="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors">
        {nextCase.title}
      </h3>
      <p class="text-text-muted text-sm mt-2">{nextCase.category}</p>
    </SurfaceCard>
  </a>
</section>
