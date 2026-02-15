'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const VideoGallery = dynamic(() => import('./VideoGallery'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />,
})

const ImageGallery = dynamic(() => import('./ImageGallery'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />,
})

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos')

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Creative Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase of stunning AI-powered video ads and product photography that convert
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Video Ads {/* (15) */}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'images'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
              Product Photography {/* (21) */}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="relative">
          {activeTab === 'videos' && <VideoGallery />}
          {activeTab === 'images' && <ImageGallery />}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-cyan-500/20">
          <h3 className="text-2xl font-bold mb-4">Impressed by our work?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let&apos;s create stunning AI-powered creatives that drive real results for your brand. Transform your marketing with content that converts.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
