// RDT-415: Generate embeddings for queries or articles
export const onRequest = async ({ request, env, context }) => {
  if (request.method !== 'POST' && request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const url = new URL(request.url)
    const query = url.searchParams.get('q') || (await request.json()).text

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query text' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Call Cloudflare AI runtime for embeddings (BAAI BGE Base, 384-dim)
    const embedding = await env.ai.run('@cf/baai/bge-base-en-v1.5', {
      text: query,
    })

    return new Response(
      JSON.stringify({
        query,
        embedding: embedding.data[0], // 384-dimensional float array
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Embedding error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate embedding' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
