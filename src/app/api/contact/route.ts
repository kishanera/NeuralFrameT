import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'

// Simple in-memory rate limiting (consider using Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute per IP

function getRateLimitKey(ip: string): string {
  return `contact-form:${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; resetIn?: number } {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000)
    return { allowed: false, resetIn }
  }

  entry.count++
  return { allowed: true }
}

async function saveContactForm(data: {
  name: string
  email: string
  company?: string | null
  message: string
}): Promise<boolean> {
  // TODO: Replace with actual email service (SendGrid, Resend, etc.)
  // For now, just log to console
  console.log('Contact form submission:', {
    ...data,
    timestamp: new Date().toISOString(),
  })

  // Simulate sending email
  // In production, integrate with:
  // - SendGrid API
  // - Resend
  // - AWS SES
  // - Nodemailer
  // - etc.

  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateLimit.resetIn} seconds.`,
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body)

    // Additional server-side validation
    if (!validatedData.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save contact form (send email, store in DB, etc.)
    const success = await saveContactForm(validatedData)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to process contact form. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! We will get back to you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      console.error('Validation error:', error)
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
