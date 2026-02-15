'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageItem {
  id: string
  title: string
  category: string
  src: string
  description: string
}

const images: ImageItem[] = [
  // Fashion & Apparel
  { id: 1, title: 'Clothing Brand Model', category: 'Fashion', src: '/assets/Product photography/Clothing brand model.jpg', description: 'Professional model photoshoot for clothing line' },
  { id: 2, title: 'Akira Pose', category: 'Fashion', src: '/assets/Product photography/akira pose.jpg', description: 'Dynamic pose for fashion brand campaign' },

  // Jewelry & Accessories
  { id: 3, title: 'Brand Jewelry', category: 'Jewelry', src: '/assets/Product photography/Brand jewellery_.jpg', description: 'Elegant jewelry showcase photography' },
  { id: 4, title: 'Brand Jewelry Collection', category: 'Jewelry', src: '/assets/Product photography/Brand jewellery_(1).jpg', description: 'Premium jewelry collection display' },
  { id: 5, title: 'Necklace Showcase', category: 'Jewelry', src: '/assets/Product photography/Necklace_.jpg', description: 'Close-up necklace product photography' },
  { id: 6, title: 'Jewelry Model Closeup', category: 'Jewelry', src: '/assets/Product photography/jwelery upclose model.jpeg', description: 'Detailed jewelry product with model' },
  { id: 7, title: 'Toxic Tale Jewelry', category: 'Jewelry', src: '/assets/Product photography/Toxic Tale jewellery_.jpg', description: 'Premium dark jewelry collection' },

  // Beverages & Food
  { id: 8, title: 'Akira Energy Drink 1', category: 'Beverage', src: '/assets/Product photography/akira energy drink 1.jpeg', description: 'Energetic beverage product shot' },
  { id: 9, title: 'Akira Energy Drink 2', category: 'Beverage', src: '/assets/Product photography/akira energy drink 2.jpg', description: 'Dynamic beverage campaign image' },
  { id: 10, title: 'Tea Ad Photoshoot', category: 'Beverage', src: '/assets/Product photography/Tea ad photoshoot_.jpg', description: 'Elegant tea product photography' },

  // Bags & Travel
  { id: 11, title: 'Akira Bag', category: 'Accessories', src: '/assets/Product photography/akira bag.jpg', description: 'Premium bag product showcase' },
  { id: 12, title: 'Akira Trolley Ad', category: 'Accessories', src: '/assets/Product photography/Akira trolley ad.jpg', description: 'Travel luggage product display' },

  // Professional Shots
  { id: 13, title: 'Model Photoshoot', category: 'Professional', src: '/assets/Product photography/Model photoshoot_.png', description: 'High-end professional model shoot' },
  { id: 14, title: 'General Photoshoot', category: 'Professional', src: '/assets/Product photography/Photoshoot.png', description: 'Studio professional photography' },
  { id: 15, title: 'Image Portfolio 1', category: 'Professional', src: '/assets/Product photography/image1.1.jpeg', description: 'Professional product portfolio shot' },
  { id: 16, title: 'Image Portfolio 2', category: 'Professional', src: '/assets/Product photography/image3.1.jpeg', description: 'Creative professional photography' },
  { id: 17, title: 'Trailer Scene', category: 'Professional', src: '/assets/Product photography/Trailer scene.png', description: 'Cinematic scene photography' },

  // Templates & Design
  { id: 18, title: 'Agensee Template 1', category: 'Design', src: '/assets/Product photography/Agensee Template .png', description: 'Professional template design showcase' },
  { id: 19, title: 'Agensee Template 2', category: 'Design', src: '/assets/Product photography/Agensee Template  (1).png', description: 'Modern design template' },
  { id: 20, title: 'Agensee Template 3', category: 'Design', src: '/assets/Product photography/Agensee Template  (2).png', description: 'Creative template design' },
  { id: 21, title: 'Agensee Template 4', category: 'Design', src: '/assets/Product photography/Agensee Template  (3).png', description: 'Premium design template' },
]

const categories = ['All', 'Fashion', 'Jewelry', 'Beverage', 'Accessories', 'Professional', 'Design']

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [filter, setFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter)

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

      {/* Masonry Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
        {filteredImages.map((image, idx) => (
          <div
            key={image.id}
            className={`group cursor-pointer overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 ${
              // Create height variety for masonry effect
              idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-800">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-cyan-500/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                    {image.category}
                  </span>
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{image.title}</h3>
                  <p className="text-xs text-gray-300">{image.description}</p>
                </div>
              </div>

              {/* Icon Badge - Top Right */}
              <div className="absolute top-3 right-3 bg-cyan-500/20 backdrop-blur-md rounded-full p-2 group-hover:bg-cyan-500/40 transition-colors">
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl w-full max-h-screen flex flex-col bg-gray-900 rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedImage.title}</h2>
                <p className="text-sm text-gray-400 mt-1">{selectedImage.description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="relative flex-1 w-full bg-gray-950 flex items-center justify-center overflow-hidden min-h-96">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 bg-gray-900 flex justify-between items-center">
              <span className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">{selectedImage.category}</span>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Use This Style
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
