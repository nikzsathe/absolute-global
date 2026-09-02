import {createClient} from '@sanity/client'

// Public values, identical to studio-absolute-global/sanity.config.ts.
// Hardcoded so production builds don't depend on build-time env vars.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'msknl5l1',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
})
