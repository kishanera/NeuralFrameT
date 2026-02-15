'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validation'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitStatus('error')
        setSubmitMessage(
          result.error || 'Failed to send message. Please try again.'
        )
        return
      }

      setSubmitStatus('success')
      setSubmitMessage(result.message || 'Message sent successfully!')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage('')
      }, 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setSubmitMessage('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions or ready to start your creative transformation? We&apos;d love
            to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/5 rounded-xl p-8 sm:p-12"
        >
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm font-medium">
                ✓ {submitMessage}
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-medium">⚠ {submitMessage}</p>
            </div>
          )}

          {/* Name Field */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white mb-2"
            >
              Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-2"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Company Field */}
          <div className="mb-6">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-white mb-2"
            >
              Company <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              {...register('company')}
              id="company"
              type="text"
              placeholder="Your company"
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
            />
            {errors.company && (
              <p className="mt-2 text-sm text-red-400">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-white mb-2"
            >
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('message')}
              id="message"
              placeholder="Tell us about your project..."
              rows={6}
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>

          {/* Helper text */}
          <p className="mt-4 text-sm text-gray-400 text-center">
            We typically respond within 24 hours.
          </p>
        </form>

        {/* Contact Info Sidebar */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📧',
              title: 'Email',
              content: 'hello@neuralframestudio.com',
            },
            {
              icon: '🌐',
              title: 'Website',
              content: 'neuralframestudio.com',
            },
            {
              icon: '⏱️',
              title: 'Response Time',
              content: '24 hours',
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
