import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Headline - focused on outcomes */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
          Turn Creative Ideas Into
          <br />
          <span className="gradient-text">Revenue-Generating Assets</span>
        </h1>

        {/* Subheading - value proposition in one sentence */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Create, test, and deploy high-converting video ads and marketing creatives in
          days, not weeks—without the expensive creative team.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/strategy-call"
            className="group relative px-8 py-4 text-base sm:text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 ease-out w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Book Free Strategy Call
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
          </Link>

          <Link
            href="#features"
            className="group inline-block px-8 py-4 text-base sm:text-lg font-semibold rounded-lg border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
          >
            <span className="flex items-center justify-center gap-2">
              View Work
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Trust indicator */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-6">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {[
              'TechCorp',
              'CreativeVentures',
              'MarketingPro',
              'DigitalFirst',
            ].map((brand) => (
              <div
                key={brand}
                className="text-gray-500 font-semibold text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</p>
          <svg
            className="w-6 h-6 text-gray-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
