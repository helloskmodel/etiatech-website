// Tencent COS "imageMogr2" on-the-fly image processing. The source assets in
// the bucket are multi-megabyte originals (some 4–5 MB), which made pages feel
// slow. Appending an imageMogr2 query makes COS return a resized/compressed
// image from its CDN instead — e.g. a 4.6 MB photo drops to ~200 KB.
// No-op for non-COS URLs (local /images/*) and for URLs already processed.
const COS_HOST = "etiatech-1303055923.cos.ap-singapore.myqcloud.com";

/**
 * Resize a COS image URL to at most `width` px wide. By default it keeps the
 * original format (so Next's optimizer can still choose WebP/AVIF); pass
 * `webp` to have COS return WebP directly (use for raw <img>, which is not
 * further optimized).
 */
export function cosResize(url: string, width = 1600, webp = false): string {
  if (!url || !url.includes(COS_HOST) || url.includes("imageMogr2")) return url;
  if (url.includes("?")) return url; // don't fight an existing query
  return `${url}?imageMogr2/thumbnail/${width}x${webp ? "/format/webp" : ""}`;
}

/**
 * Rewrite COS <img> tags in rendered Markdown HTML to load a resized WebP and
 * lazy-load below the fold. Leaves non-COS images and any existing attributes
 * untouched.
 */
export function optimizeBodyImages(html: string): string {
  return html.replace(
    /<img\b([^>]*?)\bsrc="(https:\/\/etiatech-1303055923\.cos\.ap-singapore\.myqcloud\.com\/[^"]+)"([^>]*)>/g,
    (match, pre: string, src: string, post: string) => {
      const opt = cosResize(src, 1600, true);
      const lazy = /\bloading=/.test(match) ? "" : ' loading="lazy" decoding="async"';
      return `<img${pre}src="${opt}"${post}${lazy}>`;
    }
  );
}
