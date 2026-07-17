<script lang="ts">
	import { onMount } from 'svelte'

	interface TurnstileWindow extends Window {
		turnstile?: {
			render: (selector: string, options: { sitekey: string; callback: (token: string) => void }) => void
			reset: () => void
		}
	}

	let name = $state('')
	let email = $state('')
	let message = $state('')
	let honeypot = $state('')
	let loading = $state(false)
	let error = $state('')
	let success = $state(false)
	let turnstileToken = $state<string | null>(null)
	let turnstileReady = $state(false)

	const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
	const win = window as TurnstileWindow

	onMount(() => {
		// Load Turnstile script
		const script = document.createElement('script')
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
		script.async = true
		script.defer = true
		script.onload = () => {
			turnstileReady = true
			// Render Turnstile widget
			if (win.turnstile && TURNSTILE_SITE_KEY) {
				win.turnstile.render('#cf-turnstile', {
					sitekey: TURNSTILE_SITE_KEY,
					callback: (token: string) => {
						turnstileToken = token
					},
				})
			}
		}
		document.head.appendChild(script)
	})

	async function handleSubmit(e: Event) {
		e.preventDefault()

		// Honeypot check
		if (honeypot) {
			success = true
			return
		}

		// Validate required fields
		if (!name || !email || !message) {
			error = 'Please fill in all fields'
			return
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			error = 'Please enter a valid email address'
			return
		}

		// Check Turnstile token
		if (!turnstileToken) {
			error = 'Please complete the Turnstile verification'
			return
		}

		loading = true
		error = ''
		success = false

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					message,
					token: turnstileToken,
				}),
			})

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || 'Failed to submit form')
			}

			success = true
			name = ''
			email = ''
			message = ''
			turnstileToken = null

			// Reset Turnstile widget
			if (win.turnstile) {
				win.turnstile.reset()
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred'
		} finally {
			loading = false
		}
	}
</script>

<svelte:window />

<form on:submit={handleSubmit} class="contact-form">
	<h2>Get in touch</h2>

	{#if success}
		<div class="success-message">
			Thank you for reaching out. We'll get back to you soon.
		</div>
	{:else}
		{#if error}
			<div class="error-message">{error}</div>
		{/if}

		<div class="form-group">
			<label for="name">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Your name"
				disabled={loading}
				required
			/>
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				disabled={loading}
				required
			/>
		</div>

		<div class="form-group">
			<label for="message">Message</label>
			<textarea
				id="message"
				bind:value={message}
				placeholder="Your message..."
				rows={5}
				disabled={loading}
				required
			></textarea>
		</div>

		<!-- Honeypot field (hidden from users) -->
		<input
			type="text"
			bind:value={honeypot}
			style="display: none"
			tabindex="-1"
			autocomplete="off"
		/>

		<!-- Turnstile widget -->
		{#if TURNSTILE_SITE_KEY && turnstileReady}
			<div class="turnstile-container" id="cf-turnstile"></div>
		{/if}

		<button type="submit" disabled={loading}>
			{loading ? 'Submitting...' : 'Send message'}
		</button>
	{/if}
</form>

<style>
	.contact-form {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		font-size: 0.875rem;
	}

	input[type='text'],
	input[type='email'],
	textarea {
		padding: 0.75rem;
		border: 1px solid var(--color-border, #ccc);
		border-radius: 0.375rem;
		font-family: inherit;
		font-size: 1rem;
		transition: border-color 200ms;
	}

	input[type='text']:focus,
	input[type='email']:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-accent, #3b82f6);
		box-shadow: 0 0 0 3px var(--color-accent-light, rgba(59, 130, 246, 0.1));
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.turnstile-container {
		display: flex;
		justify-content: center;
		margin: 1rem 0;
	}

	button {
		padding: 0.75rem 1.5rem;
		background-color: var(--color-accent, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: opacity 200ms;
	}

	button:hover:not(:disabled) {
		opacity: 0.9;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-message {
		padding: 1rem;
		background-color: #dcfce7;
		color: #166534;
		border-radius: 0.375rem;
		border: 1px solid #bbf7d0;
	}

	.error-message {
		padding: 1rem;
		background-color: #fee2e2;
		color: #991b1b;
		border-radius: 0.375rem;
		border: 1px solid #fecaca;
	}
</style>
