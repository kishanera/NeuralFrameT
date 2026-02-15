'use client'

import { useEffect } from 'react'
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

/**
 * Web Vitals tracking component
 * Sends Core Web Vitals to analytics
 * 
 * Usage: Add to your root layout
 * <WebVitals />
 */
export function WebVitals() {
  useEffect(() => {
    // Track Cumulative Layout Shift
    getCLS((metric) => {
      console.log('CLS:', metric.value)
      if (window.gtag) {
        window.gtag('event', 'CLS', {
          value: Math.round(metric.value * 1000),
          event_category: 'web_vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    })

    // Track First Input Delay
    getFID((metric) => {
      console.log('FID:', metric.value)
      if (window.gtag) {
        window.gtag('event', 'FID', {
          value: Math.round(metric.value),
          event_category: 'web_vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    })

    // Track First Contentful Paint
    getFCP((metric) => {
      console.log('FCP:', metric.value)
      if (window.gtag) {
        window.gtag('event', 'FCP', {
          value: Math.round(metric.value),
          event_category: 'web_vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    })

    // Track Largest Contentful Paint
    getLCP((metric) => {
      console.log('LCP:', metric.value)
      if (window.gtag) {
        window.gtag('event', 'LCP', {
          value: Math.round(metric.value),
          event_category: 'web_vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    })

    // Track Time to First Byte
    getTTFB((metric) => {
      console.log('TTFB:', metric.value)
      if (window.gtag) {
        window.gtag('event', 'TTFB', {
          value: Math.round(metric.value),
          event_category: 'web_vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    })
  }, [])

  return null
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
  }
}
