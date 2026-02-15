# Vercel Deployment Guide

Complete guide to deploying NeuralFrame Studio to Vercel.

## Why Vercel?

Vercel is the official Next.js hosting platform and provides:
- ✅ Zero-config Next.js deployment
- ✅ Automatic HTTPS/SSL
- ✅ Built-in performance monitoring
- ✅ Serverless functions (for API routes)
- ✅ Edge functions for global performance
- ✅ Easy environment variable management
- ✅ Automatic rollbacks
- ✅ Preview deployments for pull requests
- ✅ Instant rollback capability

## Pre-Deployment Checklist

### 1. Code Cleanup
```bash
# Ensure no console errors or warnings
npm run lint
npm run lint:fix

# Build locally to catch errors
npm run build

# Test production build locally
npm run start
```

### 2. Environment Variables
Review all required environment variables in `.env.example`:
- [ ] Email service credentials (SendGrid/Resend/AWS SES/SMTP)
- [ ] Analytics ID (Google Analytics)
- [ ] Site URL
- [ ] Company email
- [ ] Any other configuration

### 3. Metadata Updates
In `src/app/layout.tsx`, update:
- [ ] Production domain URL
- [ ] Company contact information
- [ ] OG image URLs (if using custom images)

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

```bash
# Create a new repository on GitHub
# https://github.com/new

# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/yourusername/neuralframe-studio.git

# Commit changes
git add .
git commit -m "Initial commit: Production-ready SaaS website"

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to https://vercel.com/new
2. Sign up/login with GitHub account
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Import"
6. Configure project settings (see below)

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set as production
vercel --prod
```

### Step 3: Configure Project Settings

#### Build & Development Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`
- **Node.js Version**: 18.x (LTS)

#### Git Configuration
- **Production Branch**: `main`
- **Deploy on Every Push**: Yes
- **Preview Deployments**: Yes

### Step 4: Add Environment Variables

In Vercel Dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add variables from `.env.example`:

**Required:**
```
SENDGRID_API_KEY=your_key (or RESEND_API_KEY)
```

**Recommended:**
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_COMPANY_EMAIL=hello@yourdomain.com
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXXXX
```

#### Important: Public vs Secret
- Variables starting with `NEXT_PUBLIC_` are public (exposed in browser)
- Other variables are secret (server-only)
- Never put sensitive data in `NEXT_PUBLIC_` variables

### Step 5: Configure Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your domain
3. Copy the DNS records provided by Vercel
4. Add DNS records to your domain registrar
5. Wait for DNS propagation (up to 48 hours)

**DNS Records to Add:**
```
Type: A
Name: @ (or yourdomain.com)
Value: 76.75.26.0 (example - Vercel will provide)
```

Or use Vercel's nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Step 6: Verify Deployment

1. Visit your production URL
2. Check that site loads correctly
3. Open DevTools → Network tab
4. Verify no 404 errors
5. Test contact form
6. Test mobile responsiveness

### Step 7: Enable Advanced Features (Optional)

#### Vercel Analytics
```
Settings → Analytics → Enable
```

#### Edge Middleware (for global CDN)
Create `middleware.ts` in project root:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add custom logic here
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## Post-Deployment Steps

### 1. SSL/HTTPS Verification
✅ Automatic with Vercel - No action needed

### 2. Test Lighthouse Scores

```bash
# Option 1: PageSpeed Insights
# Go to https://pagespeed.web.dev/
# Enter your production URL
# Run assessment

# Option 2: Local testing
npm run build && npm run start
# Then use Chrome DevTools → Lighthouse
```

### 3. Submit Sitemap to Google

1. Go to https://search.google.com/search-console
2. Add property (your domain)
3. Go to Sitemaps
4. Submit: `https://yourdomain.com/sitemap.xml`
5. Wait for Google to crawl

### 4. Verify Structured Data

1. Go to https://search.google.com/test/rich-results
2. Enter your URL
3. Verify all schemas are recognized

### 5. Setup Monitoring

#### In Vercel Dashboard:
- **Analytics**: Real User Monitoring enabled automatically
- **Logs**: Check for any errors
- **Deployments**: Verify successful builds

#### External Monitoring:
- [Google Search Console](https://search.google.com/search-console)
- [Sentry](https://sentry.io) - Error tracking
- [DataDog](https://www.datadoghq.com) - Infrastructure monitoring

### 6. Configure Email Service

Update `src/app/api/contact/route.ts` with your chosen email service:

**Using Resend (Recommended):**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function saveContactForm(data) {
  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
    subject: `New contact form submission from ${data.name}`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  })

  return !error
}
```

## Continuous Integration & Deployment

Vercel automatically:
1. Builds on every push to main branch
2. Runs build command
3. Deploys to production on success
4. Creates preview deploy for pull requests
5. Allows easy rollback if issues occur

### Staging/Preview Deployments

Every pull request automatically gets a preview URL:
```
https://your-project.vercel.app/
```

Test changes before merging to main.

## Troubleshooting

### Build Fails on Vercel (Works Locally)

**Common causes:**
- Missing environment variables
- Node version mismatch
- Dependency version conflicts

**Solutions:**
```bash
# 1. Check Vercel logs
# Click on failed deployment → Logs

# 2. Match Node version locally
node --version  # Should match Vercel setting

# 3. Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build

# 4. Check environment variables
# Ensure all required vars are set in Vercel dashboard
```

### Slow Deployment

**Common causes:**
- Large dependencies
- Many API calls during build
- Database setup

**Solutions:**
- Keep dependencies minimal
- Use environment variables for configuration
- Cache build artifacts

### Form Submissions Not Working

1. Check email service credentials in environment variables
2. Review `src/app/api/contact/route.ts`
3. Check Vercel logs for API errors
4. Test with Postman: `POST https://yourdomain.com/api/contact`

### Lighthouse Scores Low

1. Run Lighthouse in Chrome DevTools
2. Review recommendations
3. Check for console errors
4. Monitor Core Web Vitals in Vercel Analytics

## Performance Tips

1. **Image Optimization**: Use `next/image` for all images
2. **Code Splitting**: Keep bundle size under 200KB
3. **API Routes**: Keep serverless functions under 50MB
4. **Edge Functions**: For high-traffic routes
5. **Caching**: Set appropriate cache headers

## Monitoring & Maintenance

### Weekly
- Check Vercel Analytics for errors
- Monitor performance metrics
- Review Google Search Console for crawl errors

### Monthly
- Review Lighthouse scores
- Update dependencies (carefully)
- Check broken links in sitemap
- Monitor email delivery

### Quarterly
- A/B test changes with preview deployments
- Review analytics data
- Update contact information if needed
- Security audit

## Rollback Procedure

If deployment breaks production:

1. In Vercel Dashboard
2. Deployments → Find previous working deployment
3. Click "Promote to Production"
4. Site immediately rolls back
5. Debug and fix in development
6. Re-deploy when ready

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Create issue in your repo

## Vercel Features Reference

| Feature | Free | Pro | Enterprise |
|---------|------|-----|-------------|
| Deployments | Unlimited | Unlimited | Unlimited |
| Bandwidth | 100GB/month | 1TB/month | Custom |
| Serverless Functions | 12 seconds | 15 minutes | 15 minutes |
| Edge Middleware | 3 functions | Unlimited | Unlimited |
| Environments | 3 | Unlimited | Unlimited |
| Team Members | 1 | 50 | Custom |

## Estimated Timeline

```
Preparation:          15-30 minutes
Deployment:           5 minutes
DNS Setup:            Up to 48 hours
Google Indexing:      Up to 2 weeks
Full Setup:           2-3 hours
```

---

**Deployment Status**: ✅ Ready for Production

Once deployed, your site will be:
- ✅ Fast (auto-optimized by Vercel)
- ✅ Secure (HTTPS/SSL automatic)
- ✅ Scalable (serverless infrastructure)
- ✅ Monitored (built-in analytics)
- ✅ Reliable (99.99% uptime SLA)
