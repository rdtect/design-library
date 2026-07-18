// RDT-415: Populate KV with article embeddings
// ponytail: using KV (fully supported on Pages) instead of D1 for MVP
// D1 migration path clear: swap KV.get() for DB.prepare() in Phase 2
const articles = [
  {
    id: "01-architects-ai-leaders",
    title: "Architects Are Natural AI Leaders",
    excerpt: "Design thinking and systems architecture are the core skills for leading agentic teams.",
    url: "/architects-ai-leaders"
  },
  {
    id: "02-content-income-engine",
    title: "Content as Income Engine — Piece #2",
    excerpt: "Building an audience through consistent, valuable content creation unlocks multiple revenue streams.",
    url: "/content-income-engine"
  },
  {
    id: "03-ai-as-intern",
    title: "AI is an Intern, Not a Master",
    excerpt: "Effective AI use treats models as capable assistants that need direction, validation, and judgment.",
    url: "/ai-as-intern"
  },
  {
    id: "case-01-iff-gbs",
    title: "Case Study: IFF Global Business Services Hub",
    excerpt: "Redesigning a 2.8M sqft commercial campus for distributed work using ABW principles.",
    url: "/case-studies/iff-gbs"
  },
  {
    id: "case-02-7eleven-bengaluru",
    title: "Case Study: 7-Eleven Bengaluru",
    excerpt: "Workplace strategy for 15K+ franchisees across India with hub-spoke model.",
    url: "/case-studies/7eleven-bengaluru"
  },
  {
    id: "case-03-fidelity-bengaluru",
    title: "Case Study: Fidelity Bengaluru",
    excerpt: "Tech center transformation for 5K+ engineers combining cutting-edge design with India-specific needs.",
    url: "/case-studies/fidelity-bengaluru"
  }
];

export const onRequest = async ({ request, env, context }) => {
  const kvNamespace = env.ARTICLES_KV || null;

  // GET: return article count
  if (request.method === 'GET') {
    try {
      const list = await kvNamespace.list({ prefix: 'article:' })
      return new Response(
        JSON.stringify({
          articles_in_kv: list.keys.length,
          total_articles_available: articles.length,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          articles_in_kv: 0,
          total_articles_available: articles.length,
          error: 'KV not available yet - configure in Pages project settings',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }

  // POST: populate KV with embeddings
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    if (!kvNamespace) {
      return new Response(
        JSON.stringify({
          error: 'KV namespace not configured',
          hint: 'Configure ARTICLES_KV in Pages project settings > Function settings',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    let inserted = 0
    for (const article of articles) {
      try {
        // Get embedding via AI runtime
        const embedding = await env.ai.run('@cf/baai/bge-base-en-v1.5', {
          text: `${article.title}. ${article.excerpt}`,
        })

        // Store in KV
        const key = `article:${article.id}`
        const value = JSON.stringify({
          ...article,
          embedding: embedding.data[0], // 384-dim vector
          created_at: new Date().toISOString(),
        })
        await kvNamespace.put(key, value)
        inserted++
      } catch (err) {
        console.error(`Failed to embed article ${article.id}:`, err.message)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        inserted,
        total: articles.length,
        storage: 'KV (MVP)',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Populate error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to populate articles', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
