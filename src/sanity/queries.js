// The homepage singleton (hero + client logos)
export const HOMEPAGE_QUERY = `*[_id == "homepage" && !(_id in path("drafts.**"))][0]{
  heroEyebrow,
  heroHeadline,
  heroTagline,
  clients[]{ _key, name, "logoUrl": logo.asset->url },
  seo
}`

// Published services ordered by display order
export const SERVICES_QUERY = `*[_type == "service" && !(_id in path("drafts.**"))] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  ctaLabel,
  ctaRoute,
  "imageUrl": featuredImage.asset->url,
  "imageAlt": featuredImage.alt,
  body
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(featured desc, order asc){
  _id,
  quote,
  authorName,
  authorTitle,
  company,
  "authorImageUrl": authorImage.asset->url,
  "companyLogoUrl": companyLogo.asset->url
}`

export const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "imageUrl": mainImage.asset->url,
  publishedAt,
  "categories": categories[]->title
}`

// Fetch a service by slug
export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  category,
  featuredImage,
  body,
  ctaLabel,
  ctaRoute,
  seo
}`
