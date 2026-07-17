export const onRequest = async ({ request, env, context }) => {
  return handle(request, env, context)
}

async function handle(request, env, context) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    try {
      const body = await request.json()
      const { name, email, message, token } = body

      // Validate required fields
      if (!name || !email || !message || !token) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Validate Turnstile token with CF API
      const turnstileSecret = env.TURNSTILE_SECRET_KEY
      if (!turnstileSecret) {
        console.error('TURNSTILE_SECRET_KEY not configured')
        return new Response(
          JSON.stringify({ error: 'Configuration error' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
      }

      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: token,
          }),
        }
      )

      const turnstileData = await turnstileResponse.json()

      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ error: 'Turnstile validation failed' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Send email via MailChannels API (free with Cloudflare Workers)
      // ponytail: MailChannels sends via noreply@rdtect.com, CF Email Routing forwards to Zoho
      const emailData = {
        personalizations: [
          {
            to: [{ email: 'contact@rdtect.com' }],
            reply_to: { email },
          },
        ],
        from: {
          email: 'noreply@rdtect.com',
          name: 'rdtect Contact Form',
        },
        subject: `New contact form submission from ${name}`,
        content: [
          {
            type: 'text/plain',
            value: `
Name: ${name}
Email: ${email}

Message:
${message}
          `.trim(),
          },
        ],
      }

      const emailSendUrl = 'https://api.mailchannels.net/tx/v1/send'
      const sendEmailResponse = await fetch(emailSendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!sendEmailResponse.ok) {
        const errorText = await sendEmailResponse.text()
        console.error('Email send failed:', errorText)
        return new Response(
          JSON.stringify({ error: 'Failed to send email' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form submitted successfully. We will get back to you soon.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Contact form error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
}
