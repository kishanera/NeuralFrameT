interface ServiceCardProps {
  title: string
  icon: string
  description?: string
  features: string[]
}

export function ServiceCard({
  title,
  icon,
  description,
  features,
}: ServiceCardProps) {
  return (
    <article className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/5 rounded-xl p-8 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-900/70 hover:shadow-lg hover:shadow-cyan-500/10">
      {/* Icon */}
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>
      )}

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-gray-300 text-sm"
          >
            <svg
              className="w-5 h-5 text-cyan-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Hover border accent */}
      <div className="absolute inset-0 rounded-xl border border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-300 pointer-events-none" />
    </article>
  )
}
