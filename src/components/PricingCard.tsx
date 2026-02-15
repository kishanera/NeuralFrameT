import Link from 'next/link'

interface PricingCardProps {
  name: string
  price: string
  features: string[]
  ctaText: string
  ctaHref: string
  featured?: boolean
  description?: string
}

export function PricingCard({
  name,
  price,
  features,
  ctaText,
  ctaHref,
  featured = false,
  description,
}: PricingCardProps) {
  return (
    <article
      className={`relative rounded-xl p-8 transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border-2 border-cyan-400/50 md:scale-105 lg:scale-100 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30'
          : 'bg-slate-900/50 border border-white/5 hover:border-white/10'
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-black text-xs font-bold rounded-full">
            RECOMMENDED
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>

      {/* Description */}
      {description && (
        <p className="text-gray-400 text-sm mb-6">{description}</p>
      )}

      {/* Pricing */}
      <div className="mb-8">
        {price === 'Contact Us' ? (
          <div className="text-3xl font-bold text-cyan-400">{price}</div>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{price}</span>
              <span className="text-gray-400 text-sm">/per order</span>
            </div>
          </>
        )}
      </div>

      {/* Features list */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
          featured
            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:shadow-lg hover:shadow-cyan-500/40'
            : 'border-2 border-white/20 text-white hover:border-white/60 hover:bg-white/10'
        }`}
      >
        {ctaText}
      </Link>

      {/* Hover border accent for non-featured */}
      {!featured && (
        <div className="absolute inset-0 rounded-xl border border-cyan-400/0 hover:border-cyan-400/20 transition-all duration-300 pointer-events-none" />
      )}
    </article>
  )
}
