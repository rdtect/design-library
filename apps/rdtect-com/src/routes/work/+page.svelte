<script lang="ts">
  import { GoldHeading, SurfaceCard, Button } from '@rdtect/ui'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Work — rdtect</title>
  <meta name="description" content="Case studies in experience design and AI orchestration." />
</svelte:head>

<!-- Hero -->
<section class="min-h-screen flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 pt-24 pb-16">
  <p class="text-text-muted text-sm font-mono tracking-widest mb-6 uppercase">
    Work
  </p>

  <GoldHeading level={1} shimmer>Case Studies</GoldHeading>

  <p class="mt-6 text-2xl md:text-3xl font-light text-text-secondary max-w-2xl leading-snug">
    Experiential layer + AI application layer. Three projects that show the pattern.
  </p>
</section>

<!-- Case Studies Grid -->
<section class="px-8 md:px-16 lg:px-24 pb-24">
  <div class="space-y-8 max-w-3xl">
    {#each data.caseStudies as caseStudy}
      <a href="/work/{caseStudy.slug}" class="block group">
        <SurfaceCard altitude={3} interactive>
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors">
                {caseStudy.title}
              </h3>
              <p class="text-text-muted text-sm mt-2">{caseStudy.category}</p>
              <p class="text-text-secondary text-sm mt-3 leading-relaxed line-clamp-2">
                {caseStudy.challenge}
              </p>
            </div>
            <span class="text-accent ml-4 flex-shrink-0">→</span>
          </div>
        </SurfaceCard>
      </a>
    {/each}
  </div>
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
