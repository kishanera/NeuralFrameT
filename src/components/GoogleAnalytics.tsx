import Script from 'next/script'

/**
 * Google Analytics Script Component
 * Add this to your root layout to enable GA4 tracking
 * 
 * Make sure NEXT_PUBLIC_GA_ID is set in environment variables
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: false,
            });
          `,
        }}
      />
    </>
  )
}
