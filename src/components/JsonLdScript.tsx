export function JsonLdScript() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NeuralFrame Studio',
    url: 'https://neuralframestudio.com',
    logo: 'https://neuralframestudio.com/logo.png',
    description: 'AI-Powered Video & Ad Creatives That Convert',
    sameAs: [
      'https://twitter.com/neuralframe',
      'https://linkedin.com/company/neuralframestudio',
      'https://github.com/neuralframestudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      name: 'Customer Support',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Service',
      email: 'hello@neuralframestudio.com',
      areaServed: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
    },
  }

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NeuralFrame Studio',
    image: 'https://neuralframestudio.com/logo.png',
    description: 'AI-Powered Video & Ad Creatives for Marketing',
    url: 'https://neuralframestudio.com',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'hello@neuralframestudio.com',
    priceRange: '₹₹',
    areaServed: 'Worldwide',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How quickly can I get my first video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most clients receive their first video within 3-7 days, depending on the service tier.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request revisions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all plans include revision rounds. We ensure you are 100% satisfied with the final deliverable.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own the content?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. You have full ownership and rights to all content created for you.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
    </>
  )
}
