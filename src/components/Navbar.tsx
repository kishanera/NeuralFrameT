'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NF</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">
              NeuralFrame
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-white/5 py-4 space-y-4">
            <Link
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium px-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium px-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium px-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="block text-gray-300 hover:text-white transition-colors text-sm font-medium px-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </nav>
  )
}
