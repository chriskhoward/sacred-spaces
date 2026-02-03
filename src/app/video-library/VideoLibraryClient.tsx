'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Video {
  _id: string;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  level: string;
  description: string;
  thumbnail: any;
  videoUrl?: string;
}

interface VideoLibraryClientProps {
  initialVideos: Video[];
}

// Helper to convert video URLs to embeddable format
function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Direct video URL (S3, etc.)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return url;
  }

  return url;
}

// Check if URL is a direct video file
function isDirectVideo(url: string): boolean {
  return !!url?.match(/\.(mp4|webm|ogg)$/i);
}

export default function VideoLibraryClient({ initialVideos }: VideoLibraryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const categories = ['All', 'Vinyasa', 'Restorative', 'Meditation', 'Workshop'];

  const filteredVideos = selectedCategory === 'All'
    ? initialVideos
    : initialVideos.filter(v => v.category === selectedCategory);

  const featuredVideo = initialVideos[0]; // Picking the first as featured

  const openVideo = (video: Video) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
    }
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-(--color-roti) transition-colors text-lg font-bold flex items-center gap-2"
            >
              Close <span className="text-2xl">&times;</span>
            </button>

            {/* Video container */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {selectedVideo.videoUrl && isDirectVideo(selectedVideo.videoUrl) ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              ) : selectedVideo.videoUrl ? (
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl) || ''}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  No video URL available
                </div>
              )}
            </div>

            {/* Video info */}
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              <p className="text-gray-400 mt-1">with {selectedVideo.instructor} • {selectedVideo.duration} • {selectedVideo.level}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero / Featured Section */}
      {featuredVideo && (
        <section className="pt-[160px] pb-16 bg-(--color-primary) text-white">
            <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                    <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">New Release</span>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">{featuredVideo.title}</h1>
                    <p className="text-xl text-(--color-sidecar) mb-8 leading-relaxed max-w-xl">
                    {featuredVideo.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider mb-8">
                    <span className="bg-white/10 px-4 py-2 rounded-full">{featuredVideo.category}</span>
                    <span className="bg-white/10 px-4 py-2 rounded-full">{featuredVideo.duration}</span>
                    <span className="text-(--color-roti)">with {featuredVideo.instructor}</span>
                    </div>
                    <button
                      onClick={() => openVideo(featuredVideo)}
                      className="btn btn-primary px-8 py-4 text-lg flex items-center gap-3"
                    >
                    <span className="text-2xl">▶</span> Watch Now
                    </button>
                </div>
                <div className="lg:w-1/2 w-full">
                <div
                  onClick={() => openVideo(featuredVideo)}
                  className="relative aspect-video bg-black/20 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer hover:border-(--color-roti) transition-all"
                >
                    <Image
                    src={featuredVideo.thumbnail ? urlForImage(featuredVideo.thumbnail).url() : '/assets/images/placeholder_teacher.png'}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                        <span className="text-white text-3xl">▶</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
      )}

      {/* Library Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${selectedCategory === cat ? 'bg-(--color-primary) text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-(--color-primary)'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                onClick={() => openVideo(video)}
                className="bg-white rounded-[2rem_0_2rem_0] overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative aspect-video bg-gray-200">
                  <Image
                     src={video.thumbnail ? urlForImage(video.thumbnail).url() : '/assets/images/placeholder_teacher.png'}
                     alt={video.title}
                     fill
                     className="object-cover"
                   />
                   <div className="absolute top-4 left-4">
                     <span className="bg-(--color-primary)/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                       {video.category}
                     </span>
                   </div>
                   <div className="absolute bottom-4 right-4">
                     <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold">
                       {video.duration}
                     </span>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <span className="text-(--color-primary) text-2xl">▶</span>
                     </div>
                   </div>
                   {!video.videoUrl && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                       <span className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded">Coming Soon</span>
                     </div>
                   )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2 line-clamp-1">{video.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">with {video.instructor}</p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">
                    {video.description}
                  </p>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                     <span>{video.level}</span>
                     <span className="text-(--color-roti)">{video.videoUrl ? 'Watch' : 'Coming Soon'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
             <div className="text-center py-20 text-gray-500">
               No videos found in this category.
             </div>
          )}

        </div>
      </section>
    </>
  );
}
