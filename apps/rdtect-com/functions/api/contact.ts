import { json } from '@sveltejs/kit'

export const POST = async ({ request, platform }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await request.json()
    const { name, email, message, token } = body

    // Validate required fields
    if (!name || !email || !message || !token) {
      return json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate Turnstile token with CF API
    const turnstileSecret = platform?.env?.TURNSTILE_SECRET_KEY
    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY not configured')
      return json(
        { error: 'Configuration error' },
        { status: 500 }
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

    const turnstileData = (await turnstileResponse.json()) as {
      success: boolean
    }

    if (!turnstileData.success) {
      return json(
        { error: 'Turnstile validation failed' },
        { status: 400 }
      )
    }

    // Send email via CF Email Sending API
    // ponytail: minimal email send — validates form and queues for delivery
    // The email is sent TO contact@rdtect.com, which CF Email Routing will forward to Zoho
    const emailData = {
      personalizations: [
        {
          to: [{ email: 'contact@rdtect.com' }],
          reply_to: { email },
        },
      ],
      from: { email: 'noreply@rdtect.com' },
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

    // Use Cloudflare Email Sending API
    const emailSendUrl = 'https://api.mailchannels.net/tx/v1/send'
    const sendEmailResponse = await fetch(emailSendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': platform?.env?.CF_ACCOUNT_EMAIL || '',
        'X-Auth-Key': platform?.env?.CF_API_TOKEN || '',
      },
      body: JSON.stringify(emailData),
    })

    if (!sendEmailResponse.ok) {
      console.error(
        'Email send failed:',
        await sendEmailResponse.text()
      )
      return json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return json({
      success: true,
      message: 'Form submitted successfully. We will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
