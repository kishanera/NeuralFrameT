import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Portfolio } from '@/components/Portfolio'

// Lazy load non-critical sections
const Services = dynamic(() =>
  import('@/components/Services').then((mod) => ({ default: mod.Services })),
  {
    loading: () => (
      <section className="py-20 bg-black animate-pulse">
        <div className="max-w-7xl mx-auto px-4 h-96" />
      </section>
    ),
  }
)

const Pricing = dynamic(() =>
  import('@/components/Pricing').then((mod) => ({ default: mod.Pricing })),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-black to-slate-950 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 h-96" />
      </section>
    ),
  }
)

const Contact = dynamic(() =>
  import('@/components/Contact').then((mod) => ({ default: mod.Contact })),
  {
    loading: () => (
      <section className="py-20 bg-black animate-pulse">
        <div className="max-w-4xl mx-auto px-4 h-96" />
      </section>
    ),
  }
)

export default function Home() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything <span className="gradient-text">you need</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools designed to streamline your creative workflow and
              maximize ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎬',
                title: 'AI Video Generation',
                description:
                  'Create professional videos from text in seconds with our advanced AI models',
              },
              {
                icon: '🎨',
                title: 'Smart Design System',
                description:
                  'Access thousands of templates optimized for conversion across all platforms',
              },
              {
                icon: '⚡',
                title: 'Real-time Rendering',
                description:
                  'See instant previews and iterate continuously without waiting for rendering',
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                description:
                  'Track performance metrics and ROI for every creative you produce',
              },
              {
                icon: '🤖',
                title: 'Brand AI Assistant',
                description:
                  'Custom AI trained on your brand guidelines for consistent creative output',
              },
              {
                icon: '🔗',
                title: 'Multi-platform Export',
                description:
                  'Optimize and export content for Instagram, TikTok, YouTube, and more',
              },
            ].map((feature, index) => (
              <article
                key={index}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/5 rounded-xl p-8 hover:border-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Services />

      <Portfolio />

      <Pricing />

      <Contact />
    </>
  )
}
