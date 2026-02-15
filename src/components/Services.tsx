import { ServiceCard } from '@/components/ServiceCard'

const services = [
  {
    title: 'AI Video Creation',
    icon: '🎬',
    description: 'Generate stunning video content powered by cutting-edge AI',
    features: [
      'Short-form reels optimized for social',
      'AI spokesperson videos with natural voice',
      'Explainer videos for complex concepts',
      'Custom branding and styling',
      'Multi-language support',
    ],
  },
  {
    title: 'AI Ad Creatives',
    icon: '📢',
    description: 'High-converting ad creatives for your paid campaigns',
    features: [
      'Meta ads (Instagram, Facebook)',
      'Google ads (Search, Display, YouTube)',
      'UGC-style authentic-looking ads',
      'A/B tested variations',
      'Platform-optimized dimensions',
    ],
  },
  {
    title: 'Professional Video Editing',
    icon: '✂️',
    description: 'Polished video content that stands out',
    features: [
      'Podcast episode editing and mastering',
      'Short-form clipping and repurposing',
      'Dynamic subtitle generation',
      'Motion graphics and animations',
      'Color grading and sound design',
    ],
  },
]

export function Services() {
  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive creative solutions designed to drive results across all your
            marketing channels
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Ready to transform your content strategy?
          </p>
          <a
            href="#strategy-call"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
