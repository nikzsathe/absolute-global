import {homepage} from './documents/homepage'
import {siteSettings} from './documents/siteSettings'
import {service} from './documents/service'
import {testimonial} from './documents/testimonial'
import {post} from './documents/post'
import {author} from './documents/author'
import {category} from './documents/category'
import {blockContent} from './objects/blockContent'
import {seo} from './shared/seo'

export const schemaTypes = [
  // Singletons
  homepage,
  siteSettings,
  // Documents
  service,
  testimonial,
  post,
  author,
  category,
  // Objects
  blockContent,
  seo,
]
