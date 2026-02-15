# Troubleshooting & Debugging Guide

Quick solutions to common issues you might encounter.

---

## Development Issues

### Build Fails: "Module not found" Error

```
Error: Cannot find module '@/components/...'
```

**Solution:**
1. Check spelling of import path (case-sensitive on Linux/Mac)
2. Verify file exists in the specified directory
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run build
   ```
4. Check `tsconfig.json` has correct path aliases:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

---

### TypeScript Error: "Type 'any'"

```
Object is of type 'unknown'
Type '...' has no properties
```

**Solution:**
1. Add proper type definitions:
   ```typescript
   interface MyType {
     name: string
     email: string
   }
   
   const data: MyType = await fetch(...).then(r => r.json())
   ```

2. Install type definitions:
   ```bash
   npm install --save-dev @types/node-mailer  # Example
   ```

3. Update `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true
     }
   }
   ```

---

### Hot Reload Not Working

**Solution:**
1. Restart dev server:
   ```bash
   # Stop: Ctrl+C
   npm run dev
   ```

2. Clear `.next` folder:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. Check `.gitignore` doesn't ignore source files:
   ```
   # Bad - don't do this:
   src/
   
   # Good - ignore only:
   .next/
   node_modules/
   .env.local
   ```

---

### Port 3000 Already in Use

```
Error: Port 3000 is already in use
```

**Solution:**

**Windows (PowerShell):**
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000

# Kill the process
Stop-Process -Id 12345 -Force  # Replace 12345 with PID from above

# Or use different port:
npm run dev -- -p 3001
```

**Mac/Linux:**
```bash
# Find process
lsof -i :3000

# Kill the process
kill -9 12345  # Replace 12345 with PID

# Or use different port:
npm run dev -- -p 3001
```

---

### Tailwind CSS Not Applying

**Solution:**
1. Check `src/styles/globals.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Clear cache:
   ```bash
   rm -rf .next node_modules/.cache
   npm run dev
   ```

3. Verify `tailwind.config.ts` includes your files:
   ```typescript
   export default {
     content: [
       './src/app/**/*.{js,ts,jsx,tsx}',
       './src/components/**/*.{js,ts,jsx,tsx}',
     ],
   }
   ```

4. Restart dev server

---

## Form & API Issues

### Contact Form: "Failed to send message"

**Check these steps:**

1. **Verify API route exists**:
   - Check: Is `src/app/api/contact/route.ts` file present?
   ```bash
   ls -la src/app/api/contact/  # Mac/Linux
   dir src\app\api\contact\    # Windows
   ```

2. **Check console errors**:
   - Open DevTools: F12
   - Go to Console tab
   - Look for red error messages
   - Share error details in next section

3. **Verify network request**:
   - Open DevTools: F12
   - Go to Network tab
   - Submit form
   - Look for `/api/contact` request
   - Click it and check:
     - Status code (should be 200 if successful)
     - Response body (error message displayed here)

4. **Check environment variables**:
   - Add temporary logging in `src/app/api/contact/route.ts`:
   ```typescript
   console.log('Contact email:', process.env.CONTACT_EMAIL)
   console.log('Has SendGrid key:', !!process.env.SENDGRID_API_KEY)
   ```

5. **Verify form validation**:
   - Try submitting with incomplete fields
   - Should show client-side validation errors (red text)
   - Only valid forms submit to API

---

### Email Not Sending (After Choosing Service)

**For SendGrid:**
```typescript
// Verify in src/app/api/contact/route.ts
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

// Test:
console.log('SendGrid API Key set:', !!process.env.SENDGRID_API_KEY)
```

1. **Check API Key**:
   - Is `SENDGRID_API_KEY` in `.env.local`?
   - Starts with `SG.`?
   - No extra spaces?

2. **Verify Sender Email**:
   - In SendGrid dashboard → Settings → Sender Authentication
   - Is your email verified?
   - Use verified email as `from` field

3. **Check Recipient Email**:
   - Is `CONTACT_EMAIL` valid in `.env.local`?
   - Can you receive emails at this address?

4. **Test SendGrid directly** (in Node):
   ```bash
   npm install @sendgrid/mail
   ```
   Then create `test-email.js`:
   ```javascript
   const sgMail = require('@sendgrid/mail')
   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
   
   sgMail.send({
     to: 'your-email@example.com',
     from: 'verified-email@domain.com',
     subject: 'Test',
     text: 'This is a test',
   }).then(() => console.log('Email sent'))
   .catch(e => console.error(e))
   ```
   Run: `node test-email.js`

**For Resend:**
```
1. Verify API key in .env.local (starts with `re_`)
2. During setup, use `onboarding@resend.dev` as sender
3. After domain setup, use your domain email
```

**For AWS SES:**
```
1. Check credentials in .env.local match IAM user
2. Verify sender email in SES console (Verified Identities)
3. Ensure region is correct (us-east-1 recommended)
4. Check AWS SES isn't in sandbox mode
```

---

### Form Submission Slow

**Causes:**
- Email service API slow
- Network issue
- Form validation taking time

**Solutions:**
1. **Add loading indicator** (already in Contact component)
   - Shows spinner while sending

2. **Increase API timeout**:
   ```typescript
   // In src/app/api/contact/route.ts
   export const maxDuration = 10 // 10 seconds instead of default 5
   ```

3. **Optimize email** (remove unnecessary fields)

4. **Check network** (use DevTools Network tab)

---

## Performance Issues

### Lighthouse Score Low (Below 90)

**Performance (Check these first):**

1. **Images**:
   - Are images properly optimized?
   - Use `next/image` component (not `<img>`)
   - Add width/height attributes
   - Use modern formats (WebP, AVIF)

2. **JavaScript**:
   - Are below-fold sections lazy-loaded?
   - Check: Services and Pricing sections should use `dynamic()` import
   - Run: `npm run build` and check file sizes

3. **CSS**:
   - Is unused CSS removed?
   - Tailwind minifies automatically
   - Check: `dist/css/` in production

4. **Fonts**:
   - Using `next/font`? ✓ (should be)
   - Using `display: swap`? ✓ (should be)

**Accessibility (usually high, but check):**
- All images have `alt` text
- Color contrast sufficient (use https://webaim.org/resources/contrastchecker/)
- Form inputs labeled properly
- Keyboard navigation works

**Best Practices:**
- Using Next.js 14? ✓ (good)
- Using HTTPS? ✓ (Vercel auto)
- No console errors? Check DevTools Console
- No deprecated APIs?

**SEO:**
- Title and description set? ✓
- Mobile-friendly? Test with DevTools mobile view
- Structured data valid? https://search.google.com/test/rich-results
- Links work (404s)?

**Quick Fix - Clear Cache & Rebuild:**
```bash
rm -rf .next
npm run build
npm run start

# Then run Lighthouse in DevTools
```

---

### Large Build Size

```
npm run build

# ...
Route (pages)                              Size
App (app)                                  X KB
- _not-found                              X KB
- page                                    X KB
```

**Solutions:**

1. **Track bundle size**:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```
   
   Update `next.config.js`:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   
   module.exports = withBundleAnalyzer({
     // ... config
   })
   ```
   
   Run: `ANALYZE=true npm run build`

2. **Remove unused dependencies**:
   ```bash
   npm list  # See all dependencies
   npm remove package-name  # Remove unused
   ```

3. **Use dynamic imports** for heavy libraries:
   ```typescript
   const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
     loading: () => <div>Loading...</div>,
   })
   ```

---

## Deployment Issues

### Build Succeeds Locally but Fails on Vercel

**Solution:**

1. **Check Vercel build logs**:
   - Go to Vercel Dashboard
   - Select project
   - Go to Deployments
   - Click failed deployment
   - Expand "Build Logs" section
   - Look for error (red text)

2. **Common causes & fixes**:

   **"Module not found"**
   - A package not installed locally but needed on Vercel
   - Solution: `npm install missing-package` then commit

   **"Environment variable is undefined"**
   - Variable not added to Vercel dashboard
   - Solution: Go to Settings → Environment Variables → Add all from `.env.local`

   **"Permission denied"**
   - .gitignore issue or file permissions
   - Solution: Verify `.gitignore` is correct, files not ignored

3. **Test locally exactly like Vercel**:
   ```bash
   # Remove node_modules and rebuild (clean install)
   rm -rf node_modules .next
   npm install
   npm run build
   npm run start
   
   # Visit http://localhost:3000
   ```

---

### Connection Timeout on Contact Form

```
Error: request timeout
Error: ECONNREFUSED (email service)
```

**Solution:**

1. **Check environment variables** on Vercel:
   - Dashboard → Settings → Environment Variables
   - Verify all email service keys are present
   - Verify values are correct (no typos)

2. **Verify email service credentials**:
   - SendGrid: Test API key in dashboard
   - Resend: Verify domain added
   - AWS SES: Check credentials and region

3. **Increase timeout** (in `src/app/api/contact/route.ts`):
   ```typescript
   export const maxDuration = 10  // Increase from default 5 seconds
   ```

4. **Test email service directly**:
   ```bash
   # Create test file
   # Test with your credentials to verify service is working
   ```

---

### Site Returns 404

**Solution:**

1. **Check deployment completed**:
   - Vercel Dashboard → Deployments
   - Green checkmark next to latest?
   - Wait for "✓ Ready" status

2. **Check custom domain**:
   - Try `https://[project-name].vercel.app` first
   - If this works, custom domain not configured yet

3. **Verify DNS**:
   - If using custom domain: https://dnschecker.org/
   - Check if DNS propagated
   - Vercel shows "✓ Valid configuration"?

4. **Clear browser cache**:
   - Ctrl+Shift+Del → Clear cache
   - Try incognito window
   - Try different browser

---

## SEO Issues

### Sitemap Returns 404

**Solution:**
1. Verify file exists: `src/app/sitemap.ts` (not `.js`)
2. Check it exports default function:
   ```typescript
   export default function sitemap() {
     // ...
   }
   ```
3. Restart dev server
4. Visit `/sitemap.xml` (not `/sitemap.ts`)

---

### Google Search Console Shows Errors

**Solution:**

1. **"Excluded by robots.txt"**:
   - Check `public/robots.txt`
   - Verify you want to allow indexing

2. **"Excluded by noindex tag"**:
   - Check `src/app/layout.tsx`
   - Should have: `robots: { index: true }`

3. **"Server error (5xx)"**:
   - Check Vercel logs for API errors
   - Verify email service is working

4. **"Soft 404"**:
   - Page returns 404 but HTTP 200
   - Verify page renders content (not 404 page)

---

### Rich Snippets Not Showing

**Solution:**

1. **Test JSON-LD**:
   - Go to https://search.google.com/test/rich-results
   - Paste your URL
   - Should show green checkmark
   - If errors, review `src/components/JsonLdScript.tsx`

2. **Common issues**:
   - Missing required fields in JSON-LD schema
   - Invalid JSON syntax
   - Inconsistent data (prices, hours, etc.)

3. **Fix**:
   - Use Schema.org validator: https://validator.schema.org/
   - Update schema in `JsonLdScript.tsx`
   - Resubmit to Google: https://search.google.com/search-console/

---

## Analytics Issues

### Google Analytics Not Tracking

**Solution:**

1. **Verify GA4 ID**:
   - In `.env.local`: `NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX`
   - Starts with `G_`?

2. **Check script loading**:
   - Open DevTools → Network tab
   - Search for `gtag`
   - Should see: `www.googletagmanager.com`
   - Status 200?

3. **Verify Google Analytics setup**:
   - GA4 dashboard → Admin → Property Settings
   - Web data stream created?
   - Shows Measurement ID?

4. **Test tracking**:
   - GA4 → Realtime
   - Visit site in new tab
   - Should show "1 active user"
   - If not, check:
     - Browser console for errors (F12)
     - Ad blocker might be blocking GA
     - Try incognito mode

5. **Check Web Vitals**:
   - GA4 → Reports → Engagement → Web Vitals
   - If no data: Can take 24 hours for first data

---

### Page Speed Insights Low Score

**Solution:**

1. **Use PageSpeed Insights**:
   - https://pagespeed.web.dev/
   - Enter site URL
   - Review suggestions

2. **Common issues**:
   - Mobile slower than desktop?
     - Optimize images
     - Reduce JavaScript
     - Enable caching (Vercel auto)
   
   - LCP (Largest Contentful Paint) high?
     - Optimize hero image
     - Use next/image
     - Reduce font weight

3. **Quick wins**:
   - Enable AVIF format for images
   - Remove unused CSS/JS
   - Minify HTML (Vercel auto)
   - Enable compression (Vercel auto)

---

## Security Issues

### Getting 403 Forbidden on API

**Solution:**
1. Check CORS configuration
2. Verify Content-Type header: `application/json`
3. Check rate limiting (5 requests/min):
   - Wait 1 minute and retry

### Credentials Leaked in Git

**URGENT - If you see API keys in `git log`:**

1. **Revoke keys immediately**:
   - SendGrid: Regenerate API key
   - Resend: Regenerate API key
   - AWS: Deactivate access keys

2. **Remove from history**:
   ```bash
   # Using git-filter-repo (recommended)
   git filter-repo --invert-paths --path .env.local
   
   # Or use BFG Repo-Cleaner
   ```

3. **Regenerate secrets**:
   - Get new API key from service
   - Update `.env.local`
   - Redeploy to Vercel

---

## Still Having Issues?

**Before asking for help, collect:**

1. **Error message**: Full text from console or browser
2. **Reproduction steps**: How to trigger the issue
3. **Environment**: 
   - OS: Windows/Mac/Linux
   - Node version: `node --version`
   - npm version: `npm --version`
4. **Code snippet**: Relevant code from error location
5. **Screenshots**: If applicable

**Where to get help:**

- **Next.js issues**: https://github.com/vercel/next.js/discussions
- **React issues**: https://github.com/facebook/react/issues
- **Vercel issues**: https://vercel.com/help
- **SendGrid issues**: https://sendgrid.com/solutions/email-api/
- **Stack Overflow**: Tag with `next.js` and your issue

---

**Last Updated**: 2024
**Status**: Comprehensive troubleshooting guide
