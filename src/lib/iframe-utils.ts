const ALLOWED_IFRAME_HOSTS = [
  'www.youtube.com',
  'youtube.com',
  'youtube-nocookie.com',
  'player.vimeo.com',
];

/** Returns true if the URL points to a known safe embed host. */
export function isAllowedIframeUrl(url: string): boolean {
  try {
    return ALLOWED_IFRAME_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}
