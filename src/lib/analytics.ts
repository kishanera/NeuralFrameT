/**
 * Analytics Utilities
 * Lightweight analytics for tracking page views and events
 */

// interface PageViewEvent {
//   path: string
//   referrer?: string
//   timestamp: number
// }

// interface CustomEvent {
//   name: string
//   properties?: Record<string, string | number | boolean>
//   timestamp: number
// }

/**
 * Track page view
 * Integrates with Google Analytics if available
 */
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return

  // Send to Google Analytics if configured
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: path,
      page_title: document.title,
    })
  }

  // Local analytics (optional - send to your backend)
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
    // const event: PageViewEvent = {
    //   path,
    //   referrer: document.referrer,
    //   timestamp: Date.now(),
    // }

    // Send to your analytics endpoint if available
    // fetch('/api/analytics/pageview', {
    //   method: 'POST',
    //   body: JSON.stringify(event),
    // })
  }
}

/**
 * Track custom event
 * Integrates with Google Analytics if available
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return

  // Send to Google Analytics if configured
  if (window.gtag) {
    window.gtag('event', name, properties || {})
  }

  // Local analytics (optional)
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
    // const event: CustomEvent = {
    //   name,
    //   properties,
    //   timestamp: Date.now(),
    // }

    // Send to your analytics endpoint if available
    // fetch('/api/analytics/event', {
    //   method: 'POST',
    //   body: JSON.stringify(event),
    // })
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean) {
  trackEvent('form_submission', {
    form_name: formName,
    success,
  })
}

/**
 * Track CTA click
 */
export function trackCtaClick(ctaName: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
  })
}

/**
 * Track pricing plan view
 */
export function trackPricingPlanView(planName: string) {
  trackEvent('pricing_plan_view', {
    plan_name: planName,
  })
}

/**
 * Declare gtag for TypeScript
 */
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
  }
}
