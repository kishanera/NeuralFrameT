'use client'

import { useState } from 'react'
import { useEffect } from 'react'

interface VideoItem {
  id: string
  title: string
  category: string
  src: string
  description: string
  thumbnail?: string
}

const videos: VideoItem[] = [
  { id: 'bellavita', title: 'Bellavita', category: 'Real Estate', src: '/assets/AI ADs/Bellavita.mp4', description: 'Luxury real estate showcase with cinematic visuals' },
  { id: 'clone', title: 'Clone Video', category: 'Creative', src: '/assets/AI ADs/Clone video_.mp4', description: 'Innovative AI-generated creative content' },
  { id: 'insurance', title: 'Insurance UGC', category: 'Insurance', src: '/assets/AI ADs/Copy of Insurance UGC.mp4', description: 'User-generated content style insurance ad' },
  { id: 'ugc-color', title: 'UGC Color Grade', category: 'UGC', src: '/assets/AI ADs/Copy of ugc color grade_2.mp4', description: 'Professional color graded UGC content' },
  { id: 'fhi-plot', title: 'FHI 10 Plot', category: 'Real Estate', src: '/assets/AI ADs/fhi 10 plot 2.mp4', description: 'Premium property promotion video' },
  { id: 'hero', title: 'Hero Video', category: 'Hero', src: '/assets/AI ADs/HeroVideo.mp4', description: 'Dynamic hero section promotional video' },
  { id: 'moana', title: 'Moana Trailer', category: 'Entertainment', src: '/assets/AI ADs/Moana trailer.mp4', description: 'Entertainment style promotional trailer' },
  { id: 'app', title: 'Mobile App Ad', category: 'App', src: '/assets/AI ADs/MobileApp Ad.mp4', description: 'Mobile application promotion video' },
  { id: 'momos', title: 'Momos Ad', category: 'Food & Beverage', src: '/assets/AI ADs/Momos ad.mp4', description: 'Food product promotional video' },
  { id: 'narmada', title: 'Narmada Residency', category: 'Real Estate', src: '/assets/AI ADs/Narmada Residency ad.mp4', description: 'Residential complex marketing video' },
  { id: 'promo', title: 'Promotional Ad', category: 'Promotional', src: '/assets/AI ADs/Promotional ad.mp4', description: 'General promotional content' },
  { id: 'realestate', title: 'Real Estate Ad', category: 'Real Estate', src: '/assets/AI ADs/Real estate ad.mp4', description: 'Commercial real estate promotion' },
  { id: 'shakti', title: 'Shakti Ki Pehnchaan', category: 'Brand', src: '/assets/AI ADs/Shakti ki pehnchaan.mp4', description: 'Brand-focused storytelling video' },
  { id: 'elon', title: 'UGC Elon Musk', category: 'UGC', src: '/assets/AI ADs/UGC , elon musk.mp4', description: 'Celebrity-inspired UGC content' },
  { id: 'wildstone', title: 'Wild Stone', category: 'Brand', src: '/assets/AI ADs/wild stone.mp4', description: 'Consumer brand promotional video' },
]

const categories = ['All', 'Real Estate', 'UGC', 'Food & Beverage', 'Creative', 'Brand', 'Entertainment', 'Promotional']

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [filter, setFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredVideos = filter === 'All' ? videos : videos.filter(video => video.category === filter)

  return (
    <div className="space-y-8">
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              filter === category
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Video Card Container */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 aspect-video group">
              {/* Video Preview / Thumbnail */}
              <video
                src={video.src}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                muted
                onMouseEnter={e => {
                  const video = e.currentTarget
                  video.currentTime = 0
                  video.play().catch(() => {})
                }}
                onMouseLeave={e => {
                  const video = e.currentTarget
                  video.pause()
                  video.currentTime = 0
                }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* Play Button - Always Visible */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:backdrop-blur-sm transition-all duration-300">
                <div className="relative">
                  {/* Animated Ring */}
                  <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/30 rounded-full scale-100 group-hover:scale-125 transition-all duration-500 animate-pulse" />

                  {/* Play Icon */}
                  <button className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-300 text-white">
                    <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-semibold text-white">
                    {/* Auto-detect duration would require metadata */}
                    Video
                  </div>
                </div>
              </div>

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold text-white text-sm line-clamp-1">{video.title}</h3>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">{video.description}</p>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-cyan-500/20 backdrop-blur-md rounded-full text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                {video.category}
              </div>

              {/* View Count / Stats */}
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Preview
              </div>
            </div>

            {/* Card Title Below */}
            <div className="mt-3 px-2">
              <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">{video.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{video.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => {
            setSelectedVideo(null)
            setIsPlaying(false)
          }}
        >
          <div
            className="w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Video Container */}
            <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden group">
              <video
                src={selectedVideo.src}
                autoPlay
                controls
                className="w-full h-full"
                controlsList="nodownload"
              />

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedVideo(null)
                  setIsPlaying(false)
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 p-2 rounded-lg transition-colors z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Info */}
            <div className="p-6 border-t border-gray-800 bg-gray-900">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                  <p className="text-gray-400">{selectedVideo.description}</p>
                </div>
                <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-sm font-semibold text-cyan-300">
                  {selectedVideo.category}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                  Get This Style
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
