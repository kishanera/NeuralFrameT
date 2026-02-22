import { PricingCard } from '@/components/PricingCard'

const pricingPlans = [
  {
    name: 'Storytelling',
    price: '₹4,999',
    description: 'Perfect for upto 45-seconds story videos',
    features: ['Upto 45 seconds', 'Basic editing', 'MP4 export', '4-day turnaround'],
    ctaText: 'Get Started',
    ctaHref: '#contact',
    featured: false,
  },
  {
    name: 'Product Videos',
    price: '₹14,999',
    description: 'High-quality videos for your product launches and promotions',
    features: [
      'Revisions included',
      'Priority support',
      '5-day turnaround',
    ],
    ctaText: 'Book Now',
    ctaHref: '#contact',
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Contact Us',
    description: 'For enterprise and custom needs',
    features: [
      'Realstate walkthroughs',
      'Industrial videos',
      'Custom workflows',
      'Integrated strategy sessions',
      '24-hour support',
      'Bulk Orders'
    ],
    ctaText: 'Schedule Call',
    ctaHref: 'mailto:hello@neuralframestudio.com?subject=Custom%20Pricing%20Inquiry',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your creative needs. All plans include unlimited
            revisions and full ownership of your content.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Trust Note */}
        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-gray-400 text-sm">
            ✓ No long-term contracts. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
