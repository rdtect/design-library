// RDT-415: Search articles by semantic similarity
// ponytail: using KV for MVP, migration to D1 in Phase 2
export const onRequest = async ({ request, env, context }) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({
          query: '',
          results: [],
          error: 'Query required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const kvNamespace = env.ARTICLES_KV
    if (!kvNamespace) {
      return new Response(
        JSON.stringify({
          error: 'Search not available yet - KV namespace not configured',
          hint: 'Configure ARTICLES_KV in Pages project settings',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Get query embedding
    const queryEmbedding = await env.ai.run('@cf/baai/bge-base-en-v1.5', {
      text: query,
    })
    const queryVec = queryEmbedding.data[0]

    // Fetch all articles from KV
    const list = await kvNamespace.list({ prefix: 'article:' })
    const articles = []
    for (const key of list.keys) {
      const val = await kvNamespace.get(key.name, 'json')
      if (val) articles.push(val)
    }

    if (articles.length === 0) {
      return new Response(
        JSON.stringify({
          query,
          results: [],
          message: 'No articles indexed yet. Run POST /api/search/populate to seed.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Score each article via cosine similarity
    const scored = articles.map(article => {
      const similarity = cosineSimilarity(queryVec, article.embedding)
      return {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        url: article.url,
        similarity_score: similarity,
      }
    })

    // Sort by score and return top 5
    const results = scored.sort((a, b) => b.similarity_score - a.similarity_score).slice(0, 5)

    return new Response(
      JSON.stringify({
        query,
        results,
        total: articles.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Search error:', error)
    return new Response(
      JSON.stringify({ error: 'Search failed', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// Cosine similarity: (A·B) / (|A||B|)
function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0
}
