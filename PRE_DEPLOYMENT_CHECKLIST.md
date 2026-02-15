# Pre-Deployment Checklist for Vercel

Complete this checklist before deploying to Vercel to ensure your site is production-ready.

---

## 1. Environment Setup ✅

- [ ] Node.js 18.x installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Environment variables file created (`.env.local` in project root)

### Environment Variables Required

Copy and fill out your `.env.local` file based on `.env.example`:

```bash
# Core Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX  # Your Google Analytics ID

# Email Service (Choose ONE)
# Option 1: SendGrid
SENDGRID_API_KEY=SG.xxxxx

# Option 2: Resend
RESEND_API_KEY=re_xxxxx

# Option 3: AWS SES
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY_ID=AKIA...
AWS_SES_SECRET_ACCESS_KEY=...

# Option 4: SMTP (Gmail, Custom)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact Form
CONTACT_EMAIL=contact@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Rate Limiting
RATE_LIMIT_CONTACT_FORM=true
RATE_LIMIT_REQUESTS_PER_MINUTE=5

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxx

# Optional: Database (if adding later)
DATABASE_URL=postgresql://...
```

**Status**: [ ] All required variables configured in `.env.local`

---

## 2. Dependencies & Build ✅

- [ ] Run `npm install` to install all dependencies
  ```bash
  npm install
  ```

- [ ] Verify dependencies installed:
  - next ^14.0.0 ✓
  - react ^18.3.1 ✓
  - react-dom ^18.3.1 ✓
  - react-hook-form ^7.50.0 ✓
  - zod ^3.22.4 ✓
  - @hookform/resolvers ^3.3.4 ✓
  - web-vitals ^3.5.2 ✓
  - tailwindcss ^3.4.1 ✓
  - autoprefixer ^10.4.17 ✓

- [ ] Test build locally:
  ```bash
  npm run build
  ```
  
  Expected output:
  - ✓ All components compile without errors
  - ✓ All pages generate successfully
  - ✓ No TypeScript errors
  - ✓ No ESLint warnings
  - [ ] Build completes in under 2 minutes

- [ ] Test production server locally:
  ```bash
  npm run start
  ```
  
  Visit http://localhost:3000 and verify:
  - [ ] All pages load correctly
  - [ ] Navigation works
  - [ ] Contact form submits (check browser console)
  - [ ] No console errors or warnings

**Status**: [ ] Build and local testing successful

---

## 3. Code Quality ✅

- [ ] Lint check passes:
  ```bash
  npm run lint
  ```
  
  Expected: No errors, warnings acceptable
  - [ ] All files lint successfully

- [ ] TypeScript check:
  ```bash
  npx tsc --noEmit
  ```
  
  Expected: No type errors

- [ ] Review critical files (no hardcoded secrets):
  - [ ] `.env.local` is in `.gitignore`
  - [ ] `src/app/api/contact/route.ts` - No API keys visible
  - [ ] `src/components/GoogleAnalytics.tsx` - Uses environment variable
  - [ ] No console.log() statements in production code

**Status**: [ ] Code quality verified

---

## 4. Content & Branding ✅

### Text Content
- [ ] All company name references correct (NeuralFrame Studio)
- [ ] All contact email updated (contact@yourdomain.com)
- [ ] All website URLs updated to production domain
- [ ] Hero section copy reviewed and approved
- [ ] Services descriptions accurate
- [ ] Pricing correct and matches currency
- [ ] Footer links functional

### Favicon & Icons (Required)
Add these files to `/public` directory:
- [ ] `favicon.ico` (32x32 or 16x16 pixels)
- [ ] `favicon.svg` (scalable)
- [ ] `apple-touch-icon.png` (180x180 pixels)
- [ ] `icon-192x192.png` (for PWA)
- [ ] `icon-512x512.png` (for PWA)
- [ ] `icon-maskable-192x192.png` (for adaptive icons)
- [ ] `icon-maskable-512x512.png` (for adaptive icons)
- [ ] Windows tiles:
  - `mstile-70x70.png`
  - `mstile-150x150.png`
  - `mstile-310x310.png`
  - `mstile-310x150.png`

**Helper**: See `/public/FAVICON_SETUP.md` for detailed icon generation instructions

- [ ] `og-image.jpg` (1200x630 pixels for social sharing)
- [ ] `og-image-square.jpg` (800x800 pixels - optional but recommended)

**Note**: Until images are available, site will still work but social sharing won't show preview images.

**Status**: [ ] Branding and icons ready

---

## 5. SEO & Metadata ✅

- [ ] Metadata in `src/app/layout.tsx`:
  - [x] Title and description set
  - [x] Keywords defined
  - [x] OpenGraph tags configured
  - [x] Twitter Card tags configured
  - [x] JSON-LD structured data included
  - [x] Robots meta tag set to index, follow
  - [x] Canonical URL defined

- [ ] Sitemap generates correctly:
  - [ ] Visit `<yourdomain.com>/sitemap.xml`
  - [ ] Contains all main routes:
    - /
    - /features (if created)
    - /pricing
    - /contact

- [ ] Robots.txt is correct:
  - [ ] Visit `<yourdomain.com>/robots.txt`
  - [ ] Allows all crawlers (unless you want to restrict)

- [ ] Structure Data validation:
  - [ ] Test sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
  - [ ] Test JSON-LD: https://search.google.com/test/rich-results

**Status**: [ ] SEO setup verified

---

## 6. Form & API ✅

### Contact Form Testing
- [ ] Navigate to contact section
- [ ] Test form validation:
  - [ ] Empty name shows error
  - [ ] Invalid email shows error
  - [ ] Message less than 10 chars shows error
  - [ ] Company field optional (no error when empty)
  
- [ ] Submit valid form:
  - [ ] Shows loading state
  - [ ] Returns success message
  - [ ] Check browser Network tab - API returns 200
  - [ ] Response: `{ success: true, message: "..." }`

- [ ] Email service configured:
  - [ ] Contact email address set in `.env.local`
  - [ ] Email provider credentials set (SendGrid/Resend/SMTP)
  - [ ] **Test**: Submit form and check email arrives

### Rate Limiting
- [ ] Rate limit in place (5 requests/minute per IP)
- [ ] Test: Submit form 6 times rapidly
  - [ ] 6th request shows error: "Too many requests..."
  - [ ] Response code: 429 (Too Many Requests)
  - [ ] Wait 1 minute, try again - should work

**Status**: [ ] Form and API tested successfully

---

## 7. Performance & Lighthouse ✅

### Build Metrics
- [ ] Build output shows file sizes:
  ```bash
  npm run build
  ```
  Check terminal output for:
  - [ ] Route (pages): under 50KB
  - [ ] Static (CSS, JS): reasonable sizes
  - [ ] No warnings about large assets

### Lighthouse Audit
1. **Local Testing**:
   ```bash
   npm run build
   npm run start
   ```

2. **Run Lighthouse** (Chrome DevTools):
   - [ ] Open DevTools (F12)
   - [ ] Go to Lighthouse tab
   - [ ] Generate report
   - [ ] Take note of scores

3. **Target Scores**:
   - [ ] Performance: 90+ (minimum 75)
   - [ ] Accessibility: 90+ (minimum 80)
   - [ ] Best Practices: 90+ (minimum 85)
   - [ ] SEO: 95+ (minimum 90)

### Performance Checks
- [ ] Images optimized (use next/image when added)
- [ ] No render-blocking resources
- [ ] Fonts loading strategy: display: swap ✓
- [ ] CSS properly minified
- [ ] JavaScript properly split (lazy loading for below-fold)

**Status**: [ ] Lighthouse scores meet targets

---

## 8. Security ✅

- [ ] Security headers in place:
  - [x] X-Frame-Options: DENY
  - [x] X-Content-Type-Options: nosniff
  - [x] X-XSS-Protection: 1; mode=block
  - [x] Referrer-Policy
  - [x] Permissions-Policy

- [ ] No hardcoded secrets in code:
  - [ ] Run: `git log -p | grep -i -E "password|secret|key|token"`
  - [ ] Expected: No results

- [ ] CORS configured correctly:
  - [ ] Contact form API only accepts POST
  - [ ] API validates origin

- [ ] Input validation:
  - [x] Server-side validation (Zod schemas)
  - [x] Client-side validation (React Hook Form)

**Status**: [ ] Security checks passed

---

## 9. Browser & Device Testing ✅

### Desktop Browsers
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest on macOS if available)

Check:
- [ ] Layout responsive
- [ ] No console errors
- [ ] All interactive elements work
- [ ] Forms submittable
- [ ] Links functional

### Mobile Testing
- [ ] iPhone (iOS 14+)
- [ ] Android phone
- [ ] Tablet

Check:
- [ ] Touch interactions work
- [ ] Hamburger menu opens/closes
- [ ] Form is usable
- [ ] Text readable without zooming
- [ ] Images load quickly

### Tools for Testing Without Devices
```bash
# Chrome DevTools device emulation:
# - Press F12 → Click device toolbar (Ctrl+Shift+M)
# - Test portrait/landscape
# - Test various screen sizes

# Cross-browser testing (optional):
# - BrowserStack.com (paid)
# - Lambdatest.com (paid)
```

**Status**: [ ] Multi-device testing completed

---

## 10. Git & GitHub Setup ✅

- [ ] Git repository initialized:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Production-ready SaaS site"
  ```

- [ ] `.gitignore` includes:
  - [ ] `.env.local` (local environment variables)
  - [ ] `.next/` (Next.js build output)
  - [ ] `node_modules/` (dependencies)
  - [ ] `*.log` (log files)
  - [ ] `.DS_Store` (macOS files)

- [ ] GitHub repository created:
  - [ ] Go to github.com/new
  - [ ] Create repository: `neuralframe-studio`
  - [ ] Do NOT initialize with README (we have one)
  - [ ] Copy terminal commands

- [ ] Push to GitHub:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/neuralframe-studio.git
  git branch -M main
  git push -u origin main
  ```

- [ ] Verify on GitHub:
  - [ ] Repository shows all files
  - [ ] Secrets not exposed (.env.local NOT visible)
  - [ ] README.md displays correctly

**Status**: [ ] Code on GitHub and ready for deployment

---

## 11. Vercel Deployment ✅

### Step 1: Create Vercel Account
- [ ] Sign up at https://vercel.com (use GitHub account for easiest setup)
- [ ] Authorize GitHub access

### Step 2: Import Project
- [ ] Go to https://vercel.com/new
- [ ] Select GitHub and authorize
- [ ] Select `neuralframe-studio` repository
- [ ] Click "Import"

### Step 3: Configure Project
- [ ] Framework: **Next.js** (should auto-detect)
- [ ] Root Directory: **./** (default is fine)
- [ ] Build Command: `npm run build` (auto-filled)
- [ ] Output Directory: `.next` (auto-filled)
- [ ] Install Command: `npm install` (auto-filled)

### Step 4: Environment Variables
In Vercel Dashboard:
- [ ] Click "Environment Variables"
- [ ] Add all variables from `.env.local`:
  ```
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
  SENDGRID_API_KEY=SG.xxxxx
  (or your email service credentials)
  CONTACT_EMAIL=contact@yourdomain.com
  ADMIN_EMAIL=admin@yourdomain.com
  RATE_LIMIT_CONTACT_FORM=true
  RATE_LIMIT_REQUESTS_PER_MINUTE=5
  ```

- [ ] Click "Save and Deploy"

### Step 5: Deployment Complete
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check deployment status - should show "✓ Success"
- [ ] Get provided URL: `https://[project-name].vercel.app`

### Step 6: Test Production Site
- [ ] Visit `https://[project-name].vercel.app`
- [ ] Check all pages load
- [ ] Test contact form
- [ ] Open DevTools → Network → verify no 404s
- [ ] Check Network tab → Response headers for security headers

**Status**: [ ] Deployed to Vercel successfully

---

## 12. Custom Domain Setup ✅

- [ ] Domain registered (GoDaddy, Namecheap, etc.)
- [ ] In Vercel Dashboard:
  - [ ] Project Settings → Domains
  - [ ] Click "Add"
  - [ ] Enter domain: `yourdomain.com`
  - [ ] Choose: "Use nameservers"
  - [ ] Copy Vercel nameservers

- [ ] At domain registrar:
  - [ ] Go to Domain Settings
  - [ ] Change nameservers to Vercel's:
    - ns1.vercel-dns.com
    - ns2.vercel-dns.com

- [ ] Wait for DNS to propagate (10 minutes to 24 hours):
  - [ ] Check propagation: https://dnschecker.org/
  - [ ] Once propagated, Vercel shows "✓ Valid Configuration"

- [ ] Verify SSL certificate:
  - [ ] Visit `https://yourdomain.com`
  - [ ] Should show green lock icon
  - [ ] Check certificate: click lock → Certificate is valid

**Status**: [ ] Domain configured and SSL verified

---

## 13. Post-Deployment: SEO & Indexing ✅

### Google Search Console
- [ ] Go to https://search.google.com/search-console/
- [ ] Click "Add property"
- [ ] Select "URL prefix"
- [ ] Enter: `https://yourdomain.com`
- [ ] Verify ownership (use TXT record in DNS)

Once verified:
- [ ] Submit sitemap:
  - [ ] Sitemaps tab → New Sitemap
  - [ ] URL: `https://yourdomain.com/sitemap.xml`
  - [ ] Click Submit
  
- [ ] Request indexing:
  - [ ] URL Inspection tab
  - [ ] Enter homepage URL
  - [ ] Click "Request Indexing"

### Google Analytics
- [ ] Go to https://analytics.google.com/
- [ ] Create new property (if not done)
- [ ] Add measurement ID to `.env.local`:
  ```
  NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
  ```

- [ ] Redeploy site (commit and push):
  ```bash
  git add .env.local
  git commit -m "Add GA4 measurement ID"
  git push
  ```
  (Vercel auto-deploys from main branch)

- [ ] Verify tracking:
  - [ ] Visit site
  - [ ] Go to GA4 Real-time
  - [ ] Should show active user (you)

**Status**: [ ] Search Console and Analytics configured

---

## 14. Monitoring & Maintenance ✅

### Vercel Analytics
- [ ] Enable Analytics in Vercel Dashboard:
  - [ ] Project Settings → Analytics
  - [ ] Enable Web Analytics

- [ ] Monitor metrics:
  - [ ] Page load time
  - [ ] Core Web Vitals
  - [ ] Error rates

### Error Tracking (Optional but Recommended)
Consider setting up error tracking:
- [ ] Sentry.io (excellent for production errors)
- [ ] LogRocket (session replay + error tracking)

### Performance Monitoring
Scheduled checks:
- [ ] Weekly: Check Google Search Console for errors
- [ ] Bi-weekly: Run Lighthouse audit
- [ ] Monthly: Review Google Analytics stats

### Backup & Version Control
- [ ] GitHub branch protection:
  - [ ] Settings → Branches
  - [ ] Add rule for `main` branch
  - [ ] Require pull requests before merging
  - [ ] Require status checks to pass

**Status**: [ ] Monitoring and maintenance plan in place

---

## 15. Feature Flagging (Optional) ✅

If you want to gradually rollout features:
- [ ] Use environment variables as feature flags
- [ ] Example: `NEXT_PUBLIC_FEATURE_TESTIMONIALS=true`
- [ ] Wrap components in conditionals:
  ```tsx
  {process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS === 'true' && (
    <Testimonials />
  )}
  ```

**Status**: [ ] Not needed for initial deployment

---

## Summary Checklist

Copy this minimal checklist for quick reference:

```
CRITICAL (Must complete before deployment):
- [ ] Node.js 18+ installed
- [ ] .env.local configured with all variables
- [ ] npm install completed successfully
- [ ] npm run build completes without errors
- [ ] npm run start works locally
- [ ] Contact form tested (email sending works)
- [ ] Form rate limiting tested (submit 6+ times)
- [ ] Favicon/images ready or verified missing
- [ ] Git repo created and pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] Deployment successful on Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate valid (green lock on domain)

IMPORTANT (Should complete within 1 week):
- [ ] Lighthouse audit - SEO 90+
- [ ] Multi-device testing (desktop, mobile, tablet)
- [ ] Google Search Console configured
- [ ] Sitemap submitted
- [ ] Google Analytics connected
- [ ] Security headers verified

NICE TO HAVE (Nice but not critical):
- [ ] Testimonials section added (if relevant)
- [ ] Blog started (if content marketing planned)
- [ ] Email newsletter signup added
- [ ] CRM integration (HubSpot, Pipedrive, etc.)
```

---

## Still Need Help?

**If you encounter issues:**

1. **Build errors?** 
   - Check: `npm run build` output
   - Verify: All imports are correct
   - Review: TypeScript errors in VS Code

2. **Deployment fails?**
   - Check: Vercel build logs (Dashboard → Deployments → Failed deployment)
   - Verify: Environment variables all set
   - Ensure: .env.local not committed to git

3. **Form not working?**
   - Check: Network tab - is API request going to `/api/contact`?
   - Verify: Email service credentials are correct
   - Test: Email service separately (SendGrid dashboard, etc.)

4. **SEO issues?**
   - Use: https://search.google.com/test/rich-results
   - Check: Sitemap at `/sitemap.xml`
   - Verify: Robots.txt at `/robots.xml`

5. **Lighthouse low scores?**
   - Check CLS: Are elements shifting after load?
   - Check LCP: Images optimized?
   - Check FID: Too much JavaScript?

---

**Last Updated**: 2024
**Status**: ✅ Complete and production-ready
