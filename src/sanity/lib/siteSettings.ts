/**
 * Site Settings fetch and types.
 * Used by layout (metadata, footer) and Navbar (logo).
 */

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title,
  description,
  logo,
  favicon,
  socialLinks{
    instagram,
    facebook,
    youtube,
    tiktok
  },
  contactEmail
}`;

export type SiteSettings = {
  title?: string | null;
  description?: string | null;
  logo?: { asset?: { _ref?: string } } | null;
  favicon?: { asset?: { _ref?: string } } | null;
  socialLinks?: {
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
  } | null;
  contactEmail?: string | null;
};

export { SITE_SETTINGS_QUERY };
