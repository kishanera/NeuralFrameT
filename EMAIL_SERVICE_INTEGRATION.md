# Email Service Integration Guide

Your contact form is ready to send emails. Choose and configure ONE of the following email services.

---

## Quick Comparison

| Service | Setup Difficulty | Free Tier | Monthly Cost | Recommendation |
|---------|-----------------|-----------|-------------|-----------------|
| **SendGrid** | Easy | 100/day | $10-20 | ⭐ Best for starting |
| **Resend** | Very Easy | 100 emails | $20 | ⭐ Best for Next.js |
| **AWS SES** | Medium | 62K/month* | ~$0.10/K | ✓ Best for scale |
| **Gmail SMTP** | Easy | Free | Free | ✓ Quick testing |
| **Nodemailer + Custom SMTP** | Medium | Varies | Varies | ✓ Most flexible |

*AWS SES = 62,000 emails/month free (verified email only)

---

## Option 1: SendGrid (Recommended for Beginners)

### Setup Steps

1. **Create Account**:
   - Go to https://sendgrid.com/
   - Sign up for free account
   - Verify your email address

2. **Get API Key**:
   - From dashboard, go to "Settings" → "API Keys"
   - Click "Create API Key"
   - Name: `Next.js Contact Form`
   - Choose "Full Access" or custom: `Mail Send`
   - Copy the key

3. **Add to Environment Variables**:
   ```bash
   # In .env.local
   SENDGRID_API_KEY=SG.your_api_key_here
   CONTACT_EMAIL=contact@yourdomain.com
   ```

4. **Update API Route** (`src/app/api/contact/route.ts`):

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { contactFormSchema } from '@/lib/validation'
   import sgMail from '@sendgrid/mail'

   // Initialize SendGrid
   sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json()
       const validated = contactFormSchema.parse(body)

       // Send email using SendGrid
       await sgMail.send({
         to: process.env.CONTACT_EMAIL || '',
         from: process.env.SENDGRID_FROM_EMAIL || 'noreply@neuralframestudio.com',
         subject: `New Contact Form Submission from ${validated.name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${validated.name}</p>
           <p><strong>Email:</strong> ${validated.email}</p>
           ${validated.company ? `<p><strong>Company:</strong> ${validated.company}</p>` : ''}
           <p><strong>Message:</strong></p>
           <p>${validated.message.replace(/\n/g, '<br>')}</p>
         `,
         replyTo: validated.email,
       })

       // Send confirmation email to user
       await sgMail.send({
         to: validated.email,
         from: process.env.SENDGRID_FROM_EMAIL || 'noreply@neuralframestudio.com',
         subject: 'We received your message - NeuralFrame Studio',
         html: `
           <h2>Thank you for reaching out!</h2>
           <p>We've received your message and will get back to you within 24 hours.</p>
           <p>Best regards,<br>NeuralFrame Studio Team</p>
         `,
       })

       return NextResponse.json(
         { success: true, message: 'Message sent successfully!' },
         { status: 200 }
       )
     } catch (error: any) {
       console.error('SendGrid error:', error.message)
       return NextResponse.json(
         { error: 'Failed to send message. Please try again.' },
         { status: 500 }
       )
     }
   }
   ```

5. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

6. **Test**:
   - Restart dev server: `npm run dev`
   - Go to contact form
   - Submit a message
   - Check if email arrives

### Troubleshooting SendGrid

| Issue | Solution |
|-------|----------|
| "API key is invalid" | Copy key exactly from dashboard, no spaces |
| "Email from not verified" | Verify your sender email in SendGrid dashboard |
| Emails marked as spam | Use branded sender domain (advanced setup) |
| Rate limiting | Adjust in SendGrid settings (default: 100/day) |

### SendGrid Sender Email Setup

By default, SendGrid won't let you send from any email. You need to:

**Option A: Sender Authentication (Recommended)**:
1. In SendGrid: Settings → Sender Authentication
2. Add your domain
3. Add CNAME records to your domain DNS
4. Wait for verification (2-4 hours)
5. Use `noreply@yourdomain.com` as sender

**Option B: Use SendGrid's Test Email**:
- Use: `no-reply@noreply.sendgrid.net`
- This is free but less branded

---

## Option 2: Resend (Best for Next.js + React)

**Resend** is built specifically for Next.js developers and uses React Email components.

### Setup Steps

1. **Create Account**:
   - Go to https://resend.com/
   - Sign up (free tier: 100 emails)

2. **Get API Key**:
   - From dashboard, go to "API Keys"
   - Click "Create API Key"
   - Copy the key

3. **Add to Environment Variables**:
   ```bash
   # In .env.local
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=contact@yourdomain.com
   ```

4. **Install Resend**:
   ```bash
   npm install resend
   ```

5. **Update API Route** (`src/app/api/contact/route.ts`):

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { contactFormSchema } from '@/lib/validation'
   import { Resend } from 'resend'

   const resend = new Resend(process.env.RESEND_API_KEY)

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json()
       const validated = contactFormSchema.parse(body)

       // Send email using Resend
       await resend.emails.send({
         from: 'onboarding@resend.dev', // Use Resend's domain during testing
         to: process.env.CONTACT_EMAIL || '',
         subject: `New Contact Form Submission from ${validated.name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${validated.name}</p>
           <p><strong>Email:</strong> ${validated.email}</p>
           ${validated.company ? `<p><strong>Company:</strong> ${validated.company}</p>` : ''}
           <p><strong>Message:</strong></p>
           <p>${validated.message.replace(/\n/g, '<br>')}</p>
         `,
         replyTo: validated.email,
       })

       // Send confirmation to user
       await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: validated.email,
         subject: 'We received your message - NeuralFrame Studio',
         html: `
           <h2>Thank you for reaching out!</h2>
           <p>We've received your message and will get back to you within 24 hours.</p>
           <p>Best regards,<br>NeuralFrame Studio Team</p>
         `,
       })

       return NextResponse.json(
         { success: true, message: 'Message sent successfully!' },
         { status: 200 }
       )
     } catch (error: any) {
       console.error('Resend error:', error.message)
       return NextResponse.json(
         { error: 'Failed to send message. Please try again.' },
         { status: 500 }
       )
     }
   }
   ```

6. **Enable Production Email**:
   - In Resend dashboard: Add your domain
   - Add CNAME records to your domain DNS
   - Update `from` field in API route to `noreply@yourdomain.com`

7. **Test**:
   - Restart dev server: `npm run dev`
   - Go to contact form
   - Submit a message
   - Check if email arrives

### Resend + React Email Components (Advanced)

For beautiful emails, use Resend's React Email:

```bash
npm install react-email @react-email/components
```

Then create email component: `src/emails/contact-notification.tsx`:

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components'

export function ContactNotification({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading as="h2">New Contact Form Submission</Heading>
          <Text>
            <strong>Name:</strong> {name}
          </Text>
          <Text>
            <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
          </Text>
          <Text>
            <strong>Message:</strong>
          </Text>
          <Text>{message}</Text>
          <Button href={`mailto:${email}`} style={{ backgroundColor: '#06b6d4', color: '#fff', padding: '10px 20px' }}>
            Reply Now
          </Button>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## Option 3: AWS SES (Most Scalable & Cheapest)

**Best for**: Sending thousands of emails, scalability, enterprise use

### Setup Steps

1. **AWS Account**:
   - Go to https://aws.amazon.com/
   - Create account (free tier included)

2. **Setup SES**:
   - Go to AWS Console
   - Search for "SES" (Simple Email Service)
   - Change region to `us-east-1` (most features available)
   - Go to "Verified Identities"
   - Click "Create Identity"
   - Choose "Email address"
   - Enter your domain email: `noreply@yourdomain.com`
   - AWS sends verification email - click link to verify

3. **Get Credentials**:
   - Go to IAM → Users → Create User
   - Name: `neuralframe-contact-form`
   - Attach policy: `AmazonSESFullAccess`
   - Go to Security Credentials
   - Create Access Key
   - Copy Access Key ID and Secret Access Key

4. **Add to Environment Variables**:
   ```bash
   # In .env.local
   AWS_SES_REGION=us-east-1
   AWS_SES_ACCESS_KEY_ID=AKIA...
   AWS_SES_SECRET_ACCESS_KEY=...
   CONTACT_EMAIL=contact@yourdomain.com
   ```

5. **Install AWS SDK**:
   ```bash
   npm install @aws-sdk/client-ses
   ```

6. **Update API Route** (`src/app/api/contact/route.ts`):

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { contactFormSchema } from '@/lib/validation'
   import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

   const sesClient = new SESClient({
     region: process.env.AWS_SES_REGION || 'us-east-1',
     credentials: {
       accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || '',
       secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || '',
     },
   })

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json()
       const validated = contactFormSchema.parse(body)

       // Send email using AWS SES
       const command = new SendEmailCommand({
         Source: 'noreply@yourdomain.com',
         Destination: {
           ToAddresses: [process.env.CONTACT_EMAIL || ''],
         },
         Message: {
           Subject: {
             Data: `New Contact Form Submission from ${validated.name}`,
           },
           Body: {
             Html: {
               Data: `
                 <h2>New Contact Form Submission</h2>
                 <p><strong>Name:</strong> ${validated.name}</p>
                 <p><strong>Email:</strong> ${validated.email}</p>
                 ${validated.company ? `<p><strong>Company:</strong> ${validated.company}</p>` : ''}
                 <p><strong>Message:</strong></p>
                 <p>${validated.message.replace(/\n/g, '<br>')}</p>
               `,
             },
           },
         },
         ReplyToAddresses: [validated.email],
       })

       await sesClient.send(command)

       return NextResponse.json(
         { success: true, message: 'Message sent successfully!' },
         { status: 200 }
       )
     } catch (error: any) {
       console.error('AWS SES error:', error.message)
       return NextResponse.json(
         { error: 'Failed to send message. Please try again.' },
         { status: 500 }
       )
     }
   }
   ```

7. **Test**: Same as SendGrid/Resend

### AWS SES Pricing

- **First year**: 62,000 emails/month free
- **After**: $0.10 per 1,000 emails (very cheap at scale)
- Great for: High-volume senders

---

## Option 4: Gmail SMTP (Testing/Low Volume)

**Use for**: Testing, very low volume, or temporary setup

### Setup Steps

1. **Prepare Gmail Account**:
   - Create a Gmail account (or use existing)
   - Enable 2-factor authentication
   - Generate App Password:
     - Go to https://myaccount.google.com/
     - Security → App Passwords
     - Choose Mail and Windows Computer
     - Copy the 16-character password

2. **Add to Environment Variables**:
   ```bash
   # In .env.local
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # 16-char app password
   CONTACT_EMAIL=contact@yourdomain.com
   ```

3. **Install Nodemailer**:
   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

4. **Update API Route** (`src/app/api/contact/route.ts`):

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { contactFormSchema } from '@/lib/validation'
   import nodemailer from 'nodemailer'

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false, // true for 465, false for other ports
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   })

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json()
       const validated = contactFormSchema.parse(body)

       // Send email
       await transporter.sendMail({
         from: process.env.SMTP_USER || 'noreply@gmail.com',
         to: process.env.CONTACT_EMAIL || '',
         subject: `New Contact Form Submission from ${validated.name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${validated.name}</p>
           <p><strong>Email:</strong> ${validated.email}</p>
           ${validated.company ? `<p><strong>Company:</strong> ${validated.company}</p>` : ''}
           <p><strong>Message:</strong></p>
           <p>${validated.message.replace(/\n/g, '<br>')}</p>
         `,
         replyTo: validated.email,
       })

       return NextResponse.json(
         { success: true, message: 'Message sent successfully!' },
         { status: 200 }
       )
     } catch (error: any) {
       console.error('Email error:', error.message)
       return NextResponse.json(
         { error: 'Failed to send message. Please try again.' },
         { status: 500 }
       )
     }
   }
   ```

5. **Test**: Same as other services

### Gmail SMTP Limitations

- Free tier: Not recommended for production (daily limits)
- May be marked as spam
- Limited to ~100 emails/hour
- User password less secure than API key

---

## Recommendation by Use Case

### Just Testing/Development
→ **Gmail SMTP** (free, simple setup)

### Small Business (< 1,000 emails/month)
→ **Resend** (easiest, most Next.js-friendly) or **SendGrid** (proven, free tier)

### Medium Business (1K - 10K emails/month)
→ **SendGrid** (reliable, good support)

### High Volume/Enterprise
→ **AWS SES** (cheapest at scale, 62K free/month)

---

## Testing Checklist

After setting up your chosen service:

- [ ] Install service package: `npm install [package]`
- [ ] Add API credentials to `.env.local`
- [ ] Update `src/app/api/contact/route.ts` with service integration
- [ ] Restart dev server: `npm run dev`
- [ ] Navigate to contact form
- [ ] Submit test message
- [ ] Check if admin email received message
- [ ] Verify reply-to is set to form submitter's email
- [ ] Check spam folder (may need to whitelist sender)
- [ ] Commit changes: `git add . && git commit -m "Add email service integration"`
- [ ] Push to GitHub: `git push`
- [ ] Redeploy to Vercel (auto-deploys from GitHub)
- [ ] Test on production site

---

## Troubleshooting Common Issues

### "Failed to send message" on form submit

**Check these:**
1. Environment variables loaded: Add `console.log()` temporarily
   ```typescript
   console.log('API Key:', process.env.SENDGRID_API_KEY?.slice(0, 5))
   ```
2. Network request: Open DevTools → Network tab → look for `/api/contact` request
3. API response: Check response body for error message
4. Service status: Check SendGrid/Resend/AWS dashboard for errors

### Email never arrives

**Check these:**
1. **Spam folder**: Check your email's spam/junk folder
2. **Admin email correct**: Verify `CONTACT_EMAIL` in `.env.local`
3. **Sender verified**: In service dashboard, verify sender email is authorized
4. **API credentials**: Verify API key is correct (no typos, no extra spaces)

### "Email from not allowed"

- SendGrid: Verify sender in dashboard Settings
- Resend: Verify domain ownership (add CNAME records)
- AWS SES: Verify email identity in SES console

### High bounce/spam rates

If many emails go to spam:
1. Use domain-based sender (`noreply@yourdomain.com` not generic email)
2. Setup DKIM/SPF records in domain DNS
3. Use professional email template (see Resend React Email example)
4. Check feedback loops in service dashboard

---

## Next Steps

1. **Choose a service** (recommended: Resend or SendGrid)
2. **Follow setup steps** above for your chosen service
3. **Update API route** with the integration code
4. **Test locally** with npm run dev
5. **Commit and push** to GitHub
6. **Vercel auto-deploys** - test on production

---

**Last Updated**: 2024
**Status**: Ready to integrate
