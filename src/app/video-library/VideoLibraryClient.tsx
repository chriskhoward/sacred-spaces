'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Gem, Check } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';

interface Video {
  _id: string;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  categorySlug?: string;
  level: string;
  description: string;
  thumbnail: any;
  videoUrl?: string;
  isFeatured?: boolean;
  isLocked?: boolean;
  targetAudience?: string[];
}

interface Category {
  _id: string;
  title: string;
  slug: string;
}

interface VideoLibraryClientProps {
  initialVideos: Video[];
  categories: Category[];
  /** Video to show in the "New Release" hero. Set in Sanity via "Feature as New Release" on a video. */
  featuredVideo?: Video | null;
  userTier?: string;
  membershipType?: string;
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

// Get thumbnail URL from video URL (YouTube/Vimeo)
function getVideoThumbnail(url: string): string | null {
  if (!url) return null;

  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (youtubeMatch) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }

  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
  }

  return null;
}

// Get the best available thumbnail
function getThumbnailUrl(video: { thumbnail?: any; videoUrl?: string }): string {
  if (video.thumbnail) {
    return urlForImage(video.thumbnail).url();
  }

  if (video.videoUrl) {
    const autoThumbnail = getVideoThumbnail(video.videoUrl);
    if (autoThumbnail) {
      return autoThumbnail;
    }
  }

  return '/assets/images/placeholder_teacher.png';
}

export default function VideoLibraryClient({ initialVideos, categories, featuredVideo: featuredVideoProp }: VideoLibraryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedTeacher, setSelectedTeacher] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [lockedVideo, setLockedVideo] = useState<Video | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Strip invisible Unicode (zero-width, BOM) so "All Levels" and "All\u200B Levels" match
  const stripInvisible = (s: string) => (s ?? '').replace(/[\u200B-\u200D\u2060\uFEFF]/g, '');

  // Normalize for dedupe: strip invisible, trim, collapse Unicode whitespace, lowercase
  const normalizeKey = (s: string) =>
    stripInvisible(s)
      .trim()
      .replace(/\s+/gu, ' ')
      .toLowerCase();

  // Helper: unique options by normalized key; clean display value and dedupe by Set
  const uniqueOptions = (values: (string | undefined | null)[], sort = true) => {
    const byKey = new Map<string, string>();
    for (const raw of values) {
      const cleaned = stripInvisible((raw ?? '').trim()).replace(/\s+/gu, ' ').trim();
      if (!cleaned) continue;
      const key = cleaned.toLowerCase();
      if (byKey.has(key)) continue;
      byKey.set(key, cleaned);
    }
    const arr = Array.from(byKey.values());
    const deduped = [...new Set(arr)];
    return sort ? deduped.sort((a, b) => a.localeCompare(b)) : deduped;
  };

  // Build category list with "All" at the front (dedupe by normalized key + display string)
  const categoryOptions = useMemo(
    () => ['All', ...uniqueOptions(categories.map(c => c.title).filter(Boolean), false)],
    [categories]
  );

  // Extract unique teachers (dedupe by key + display string)
  const teacherOptions = useMemo(
    () => ['All', ...uniqueOptions(initialVideos.map(v => v.instructor).filter(Boolean))],
    [initialVideos]
  );

  // Level options: fixed list from schema so each level appears exactly once
  const levelOptions = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Duration buckets
  const durationOptions = ['All', 'Under 15 min', '15-30 min', '30-60 min', '60+ min'];

  // Parse duration to minutes
  function parseDurationMinutes(dur: string | undefined): number {
    if (!dur) return 0;
    const match = dur.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  function matchesDurationFilter(dur: string | undefined): boolean {
    if (selectedDuration === 'All') return true;
    const mins = parseDurationMinutes(dur);
    switch (selectedDuration) {
      case 'Under 15 min': return mins > 0 && mins < 15;
      case '15-30 min': return mins >= 15 && mins <= 30;
      case '30-60 min': return mins > 30 && mins <= 60;
      case '60+ min': return mins > 60;
      default: return true;
    }
  }

  const filteredVideos = initialVideos.filter(v => {
    if (selectedCategory !== 'All' && normalizeKey(v.category ?? '') !== normalizeKey(selectedCategory)) return false;
    if (selectedTeacher !== 'All' && normalizeKey(v.instructor ?? '') !== normalizeKey(selectedTeacher)) return false;
    if (selectedLevel !== 'All' && normalizeKey(v.level ?? '') !== normalizeKey(selectedLevel)) return false;
    if (!matchesDurationFilter(v.duration)) return false;
    return true;
  });

  // Use explicitly passed featured video, or fall back to first in list
  const featuredVideo = featuredVideoProp ?? initialVideos[0] ?? null;

  const openVideo = (video: Video) => {
    if (video.isLocked) {
      setLockedVideo(video);
      setShowUpgradeModal(true);
      return;
    }
    if (video.videoUrl) {
      setSelectedVideo(video);
    }
  };

  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
    setLockedVideo(null);
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

            {/* Video info - full description */}
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
              <p className="text-gray-400 mt-1">with {selectedVideo.instructor} · {selectedVideo.duration} · {selectedVideo.level}</p>
              {selectedVideo.description && (
                <p className="text-gray-300 mt-4 leading-relaxed">{selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && lockedVideo && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeUpgradeModal}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Design Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-sidecar) opacity-20 rounded-bl-full -mr-16 -mt-16"></div>

            <div className="text-center mb-8 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-(--color-gallery) rounded-full mb-4">
                <Gem className="w-10 h-10 text-(--color-roti)" />
              </div>
              <h3 className="text-3xl font-bold text-(--color-primary) mb-3">
                Unlock Premium
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This session, <span className="font-bold text-(--color-primary)">&ldquo;{lockedVideo.title}&rdquo;</span>, is exclusive to our
                <span className="text-(--color-roti) font-bold ml-1">Pro members</span>.
              </p>
            </div>

            <div className="bg-(--color-gallery) p-6 rounded-2xl mb-8 border border-gray-100">
              <h4 className="font-bold text-(--color-primary) mb-4 text-sm uppercase tracking-widest">Pro Member Benefits:</h4>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <Check className="w-4 h-4 text-(--color-roti) shrink-0" /> Full Access to the On-Demand Library
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <Check className="w-4 h-4 text-(--color-roti) shrink-0" /> Paid Teaching Opportunities
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <Check className="w-4 h-4 text-(--color-roti) shrink-0" /> Visibility via Promotion of Your Offerings
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                href="/join"
                className="block w-full px-8 py-4 bg-(--color-roti) text-white rounded-full font-bold hover:bg-(--color-primary) transition-all text-center shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Upgrade to Pro Now
              </Link>
              <button
                onClick={closeUpgradeModal}
                className="block w-full px-8 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors text-sm"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero: directory-style when no featured video, or featured video block */}
      {!featuredVideo && (
        <header className="bg-(--color-primary) pt-[200px] pb-24 text-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/images/tc_logo.png"
                alt="Flow in Faith Teachers Collective Logo"
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">On-Demand Library</span>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">On-Demand Library</h1>
            <p className="text-xl text-(--color-sidecar) opacity-90">
              Browse classes, workshops, and teachings on your schedule.
            </p>
          </div>
        </header>
      )}
      {featuredVideo && (
        <section className="pt-[200px] pb-24 bg-(--color-primary) text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">New Release</span>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">{featuredVideo.title}</h1>
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
                  className="btn btn-primary flex items-center gap-3"
                >
                  {featuredVideo.isLocked ? (
                    <><Lock className="w-6 h-6" /> Upgrade to Watch</>
                  ) : (
                    <><span className="text-2xl">▶</span> Watch Now</>
                  )}
                </button>
              </div>
              <div className="lg:w-1/2 w-full">
                <div
                  onClick={() => openVideo(featuredVideo)}
                  className="relative aspect-video bg-black/20 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer hover:border-(--color-roti) transition-all"
                >
                  <Image
                    src={getThumbnailUrl(featuredVideo)}
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
          <div className="mb-12">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {categoryOptions.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${selectedCategory === cat ? 'bg-(--color-primary) text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-(--color-primary)'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Additional Filters Row */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Duration Filter */}
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-(--color-roti) focus:border-transparent"
              >
                {durationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Durations' : opt}</option>
                ))}
              </select>

              {/* Teacher Filter */}
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-(--color-roti) focus:border-transparent"
              >
                {teacherOptions.map((opt, i) => (
                  <option key={`teacher-${i}-${opt}`} value={opt}>{opt === 'All' ? 'All Teachers' : opt}</option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-(--color-roti) focus:border-transparent"
              >
                {levelOptions.map((opt, i) => (
                  <option key={`level-${i}-${opt}`} value={opt}>{opt === 'All' ? 'All Levels' : opt}</option>
                ))}
              </select>

              {/* Clear All Filters */}
              {(selectedCategory !== 'All' || selectedDuration !== 'All' || selectedTeacher !== 'All' || selectedLevel !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDuration('All');
                    setSelectedTeacher('All');
                    setSelectedLevel('All');
                  }}
                  className="px-4 py-2.5 text-sm font-bold text-(--color-roti) hover:text-(--color-primary) transition-colors underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                onClick={() => openVideo(video)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative aspect-video bg-gray-200">
                  <Image
                    src={getThumbnailUrl(video)}
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
                      {video.isLocked ? (
                        <Lock className="w-6 h-6 text-(--color-primary)" />
                      ) : (
                        <span className="text-(--color-primary) text-2xl">▶</span>
                      )}
                    </div>
                  </div>
                  {video.isLocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20 scale-90 group-hover:scale-100 transition-transform">
                        <span className="text-(--color-primary) text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5" /> Premium
                        </span>
                      </div>
                    </div>
                  )}
                  {!video.videoUrl && !video.isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded">Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{video.title}</h3>
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
              No videos found matching your filters.
            </div>
          )}

        </div>
      </section>
    </>
  );
}
