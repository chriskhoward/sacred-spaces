'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['home', 'about'])

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    ...schema,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly allowed
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Homepage
            S.listItem()
              .title('Homepage')
              .id('home')
              .child(S.document().schemaType('home').documentId('home')),
            // Singleton: About Page
            S.listItem()
              .title('About Page')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            // Regular types: Pages
            S.documentTypeListItem('page').title('Dynamic Pages'),
            S.divider(),
            // Regular types
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || '') && listItem.getId() !== 'page'
            ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        // Map document types to their preview URLs
        locations: {
          home: {
            select: { title: 'title' },
            resolve: () => ({
              locations: [{ title: 'Homepage', href: '/' }],
            }),
          },
          about: {
            select: { title: 'title' },
            resolve: () => ({
              locations: [{ title: 'About Page', href: '/about' }],
            }),
          },
          page: {
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [{ title: doc.title || 'Untitled', href: `/${doc.slug}` }]
                : [],
            }),
          },
        },
      },
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
