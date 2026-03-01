import { isAllowedIframeUrl } from '@/lib/iframe-utils';

interface VideoBlockProps {
  title?: string;
  url?: string;
}

export default function VideoBlock({
  title,
  url
}: VideoBlockProps) {
  if (!url) return null;

  // Simple helper to get embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('vimeo.com')) {
      const id = url.split('/').pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(url);

  if (!isAllowedIframeUrl(embedUrl)) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {title && (
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-(--color-primary) mb-16 underline decoration-(--color-roti) decoration-4 underline-offset-12">
            {title}
          </h2>
        )}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <iframe
            src={embedUrl}
            title={title || "Video Player"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
