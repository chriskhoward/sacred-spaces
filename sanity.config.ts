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
const singletonTypes = new Set(['home', 'about', 'teacherCollectiveFaqs', 'teacherCollectiveDashboard', 'siteSettings', 'teacherCollectivePage'])

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
      structure: (S) => {
        const hiddenFromList = new Set([
          ...singletonTypes,
          'page',
          'founderPage',
          'teacherOnboardingCategory',
          'teacherOnboardingItem',
          'navigation',
        ])

        return S.list()
          .title('Content')
          .items([
            // ── Global Settings ──
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            // ── Navigation ──
            S.listItem()
              .title('Navigation Menus')
              .id('navigation-group')
              .child(
                S.documentTypeList('navigation').title('Navigation Menus')
              ),

            S.divider(),

            // ── Pages ──
            S.listItem()
              .title('Homepage')
              .id('home')
              .child(S.document().schemaType('home').documentId('home')),

            S.listItem()
              .title('About Page')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),

            S.documentTypeListItem('page').title('Dynamic Pages'),

            S.documentTypeListItem('founderPage').title('Founder Pages'),

            S.divider(),

            // ── Teacher Collective ──
            S.listItem()
              .title('Teacher Collective')
              .id('tc-group')
              .child(
                S.list()
                  .title('Teacher Collective')
                  .items([
                    S.listItem()
                      .title('Teacher Collective Page')
                      .id('teacherCollectivePage')
                      .child(S.document().schemaType('teacherCollectivePage').documentId('teacherCollectivePage')),
                    S.listItem()
                      .title('FAQs')
                      .id('teacherCollectiveFaqs')
                      .child(S.document().schemaType('teacherCollectiveFaqs').documentId('teacherCollectiveFaqs')),
                    S.listItem()
                      .title('Dashboard')
                      .id('teacherCollectiveDashboard')
                      .child(S.document().schemaType('teacherCollectiveDashboard').documentId('teacherCollectiveDashboard')),
                  ])
              ),

            // ── Teacher Onboarding ──
            S.listItem()
              .title('Teacher Onboarding')
              .id('start-here')
              .child(
                S.list()
                  .title('Teacher Onboarding')
                  .items([
                    S.documentTypeListItem('teacherOnboardingCategory').title('Onboarding Categories'),
                    S.documentTypeListItem('teacherOnboardingItem').title('Onboarding Items'),
                  ])
              ),

            S.divider(),

            // ── Remaining document types ──
            ...S.documentTypeListItems().filter(
              (listItem) => !hiddenFromList.has(listItem.getId() || '')
            ),
          ])
      },
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
          founderPage: {
            select: { title: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [{ title: doc.title || 'Founder', href: `/${doc.slug}` }]
                : [],
            }),
          },
          teacherCollectivePage: {
            select: { title: 'title' },
            resolve: () => ({
              locations: [{ title: 'Teacher Collective', href: '/teacher-collective' }],
            }),
          },
          siteSettings: {
            select: { title: 'title' },
            resolve: () => ({
              locations: [{ title: 'Homepage', href: '/' }],
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
