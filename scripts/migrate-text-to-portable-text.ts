// Usage: npx tsx scripts/migrate-text-to-portable-text.ts [--dry-run]
// Requires: SANITY_API_TOKEN environment variable with write access
// Also requires NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const dryRun = process.argv.includes('--dry-run')
if (dryRun) console.log('=== DRY RUN MODE - no changes will be made ===\n')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-12-21',
  token,
  useCdn: false,
})

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Convert a plain text string into a Portable Text block array */
function textToPortableText(text: string): any[] {
  if (!text || typeof text !== 'string') return []

  // Split on double newlines for paragraphs, fallback to single newlines
  const paragraphs = text.split(/\n\n|\n/).filter((p) => p.trim().length > 0)

  return paragraphs.map((p) => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomKey(),
        text: p.trim(),
        marks: [],
      },
    ],
  }))
}

/** Check if a value is a plain string (needs migration) */
function isPlainText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** Get a nested value from an object by dot path */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((curr, key) => curr?.[key], obj)
}

/** Set a nested value on an object by dot path */
function setNestedPatch(patches: Record<string, any>, path: string, value: any) {
  patches[path] = value
}

interface MigrationConfig {
  type: string
  fields?: string[]
  nestedArrays?: { field: string; nestedFields: string[] }[]
  arrayOfTextFields?: string[]
  // For page builder content[] blocks
  arrayField?: string
  blockMigrations?: {
    blockType: string
    fields?: string[]
    nestedArray?: { field: string; nestedFields: string[] }
    arrayOfTextFields?: string[]
  }[]
}

const MIGRATIONS: MigrationConfig[] = [
  // Summit
  { type: 'summit', fields: ['labels.upgradeCtaDescription'] },

  // Pages with page builder content
  {
    type: 'page',
    arrayField: 'content',
    blockMigrations: [
      { blockType: 'heroBlock', fields: ['subtitle'] },
      { blockType: 'homeHeroBlock', fields: ['subtitle'] },
      { blockType: 'brandBlock', fields: ['quote', 'body'] },
      {
        blockType: 'pillarsBlock',
        fields: ['description'],
        nestedArray: { field: 'items', nestedFields: ['description'] },
      },
      {
        blockType: 'benefitsBlock',
        fields: ['description'],
        nestedArray: { field: 'items', nestedFields: ['description'] },
      },
      { blockType: 'teamBlock', fields: ['description'] },
      { blockType: 'ctaBlock', fields: ['description'] },
      { blockType: 'faqBlock', nestedArray: { field: 'items', nestedFields: ['answer'] } },
      { blockType: 'testimonialBlock', nestedArray: { field: 'items', nestedFields: ['quote'] } },
      {
        blockType: 'featureGridBlock',
        nestedArray: { field: 'items', nestedFields: ['description'] },
      },
      {
        blockType: 'premiumFeaturesBlock',
        nestedArray: { field: 'items', nestedFields: ['description'] },
      },
      { blockType: 'founderBioBlock', fields: ['closingText'] },
      { blockType: 'twoColumnCompareBlock', fields: ['closingText'] },
      {
        blockType: 'spaceCardsBlock',
        fields: ['subheading', 'description'],
        nestedArray: { field: 'cards', nestedFields: ['description'] },
      },
      { blockType: 'empathySectionBlock', arrayOfTextFields: ['items'] },
      { blockType: 'highlightTextBlock', arrayOfTextFields: ['statements'] },
      { blockType: 'checklistBlock', arrayOfTextFields: ['items'] },
      { blockType: 'proseSectionBlock', arrayOfTextFields: ['paragraphs'] },
    ],
  },

  // Teacher Collective Page
  {
    type: 'teacherCollectivePage',
    fields: ['heroSubtext', 'visionariesSubtext'],
    nestedArrays: [
      { field: 'imagineCards', nestedFields: ['text'] },
      { field: 'benefitCards', nestedFields: ['description'] },
      { field: 'premiumItems', nestedFields: ['description'] },
    ],
    arrayOfTextFields: ['youDontHaveToItems', 'itsTimeToPoints'],
  },

  // Founder pages
  { type: 'founderPage', fields: ['philosophyQuote', 'ctaText'] },

  // Teachers
  { type: 'teacher', fields: ['bio'] },

  // Resources
  { type: 'resource', fields: ['description'] },

  // Videos
  { type: 'video', fields: ['description'] },

  // Live Classes
  { type: 'liveClass', fields: ['description'] },

  // Teacher Collective FAQs
  {
    type: 'teacherCollectiveFaqs',
    nestedArrays: [{ field: 'items', nestedFields: ['answer'] }],
  },

  // Site Settings
  { type: 'siteSettings', fields: ['tagline', 'notFoundQuote'] },

  // Teacher Collective Dashboard
  {
    type: 'teacherCollectiveDashboard',
    nestedArrays: [{ field: 'cards', nestedFields: ['description'] }],
  },

  // Teacher Onboarding Items
  { type: 'teacherOnboardingItem', fields: ['description'] },
]

async function migrateSimpleFields(doc: any, fields: string[]): Promise<Record<string, any>> {
  const patches: Record<string, any> = {}

  for (const field of fields) {
    const value = getNestedValue(doc, field)
    if (isPlainText(value)) {
      setNestedPatch(patches, field, textToPortableText(value))
    }
  }

  return patches
}

async function migrateNestedArrays(
  doc: any,
  nestedArrays: { field: string; nestedFields: string[] }[]
): Promise<Record<string, any>> {
  const patches: Record<string, any> = {}

  for (const { field, nestedFields } of nestedArrays) {
    const arr = doc[field]
    if (!Array.isArray(arr)) continue

    let changed = false
    const newArr = arr.map((item: any) => {
      const newItem = { ...item }
      for (const nf of nestedFields) {
        if (isPlainText(item[nf])) {
          newItem[nf] = textToPortableText(item[nf])
          changed = true
        }
      }
      return newItem
    })

    if (changed) {
      patches[field] = newArr
    }
  }

  return patches
}

async function migrateArrayOfTextFields(
  doc: any,
  arrayOfTextFields: string[]
): Promise<Record<string, any>> {
  const patches: Record<string, any> = {}

  for (const field of arrayOfTextFields) {
    const arr = doc[field]
    if (!Array.isArray(arr)) continue

    const hasStrings = arr.some((item: any) => typeof item === 'string')
    if (hasStrings) {
      // Convert each string to a Portable Text block
      patches[field] = arr.map((item: any) => {
        if (typeof item === 'string') {
          return textToPortableText(item)[0] || {
            _type: 'block',
            _key: randomKey(),
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: randomKey(), text: item, marks: [] }],
          }
        }
        return item
      })
    }
  }

  return patches
}

async function migratePageBuilderBlocks(doc: any, config: MigrationConfig): Promise<Record<string, any>> {
  const patches: Record<string, any> = {}
  const arrayField = config.arrayField!
  const content = doc[arrayField]
  if (!Array.isArray(content) || !config.blockMigrations) return patches

  let contentChanged = false
  const newContent = content.map((block: any) => {
    const migration = config.blockMigrations!.find((m) => m.blockType === block._type)
    if (!migration) return block

    const newBlock = { ...block }

    // Simple fields
    if (migration.fields) {
      for (const field of migration.fields) {
        if (isPlainText(block[field])) {
          newBlock[field] = textToPortableText(block[field])
          contentChanged = true
        }
      }
    }

    // Nested array fields
    if (migration.nestedArray) {
      const { field, nestedFields } = migration.nestedArray
      const arr = block[field]
      if (Array.isArray(arr)) {
        let arrChanged = false
        const newArr = arr.map((item: any) => {
          const newItem = { ...item }
          for (const nf of nestedFields) {
            if (isPlainText(item[nf])) {
              newItem[nf] = textToPortableText(item[nf])
              arrChanged = true
            }
          }
          return newItem
        })
        if (arrChanged) {
          newBlock[field] = newArr
          contentChanged = true
        }
      }
    }

    // Array of text fields
    if (migration.arrayOfTextFields) {
      for (const field of migration.arrayOfTextFields) {
        const arr = block[field]
        if (Array.isArray(arr)) {
          const hasStrings = arr.some((item: any) => typeof item === 'string')
          if (hasStrings) {
            newBlock[field] = arr.map((item: any) => {
              if (typeof item === 'string') {
                return textToPortableText(item)[0] || {
                  _type: 'block',
                  _key: randomKey(),
                  style: 'normal',
                  markDefs: [],
                  children: [{ _type: 'span', _key: randomKey(), text: item, marks: [] }],
                }
              }
              return item
            })
            contentChanged = true
          }
        }
      }
    }

    return newBlock
  })

  if (contentChanged) {
    patches[arrayField] = newContent
  }

  return patches
}

async function runMigration() {
  let totalPatched = 0
  let totalSkipped = 0

  for (const config of MIGRATIONS) {
    console.log(`\n--- Migrating ${config.type} ---`)

    const docs = await client.fetch(`*[_type == "${config.type}"]`)
    console.log(`  Found ${docs.length} documents`)

    for (const doc of docs) {
      const allPatches: Record<string, any> = {}

      // Simple fields
      if (config.fields) {
        Object.assign(allPatches, await migrateSimpleFields(doc, config.fields))
      }

      // Nested arrays
      if (config.nestedArrays) {
        Object.assign(allPatches, await migrateNestedArrays(doc, config.nestedArrays))
      }

      // Array-of-text fields
      if (config.arrayOfTextFields) {
        Object.assign(allPatches, await migrateArrayOfTextFields(doc, config.arrayOfTextFields))
      }

      // Page builder blocks
      if (config.arrayField && config.blockMigrations) {
        Object.assign(allPatches, await migratePageBuilderBlocks(doc, config))
      }

      const patchKeys = Object.keys(allPatches)
      if (patchKeys.length === 0) {
        totalSkipped++
        continue
      }

      const docLabel = doc.title || doc.name || doc._id
      console.log(`  Patching "${docLabel}" (${doc._id}): ${patchKeys.join(', ')}`)

      if (!dryRun) {
        try {
          await client.patch(doc._id).set(allPatches).commit()
          totalPatched++
        } catch (err: any) {
          console.error(`  ERROR patching ${doc._id}: ${err.message}`)
        }
      } else {
        totalPatched++
        for (const key of patchKeys) {
          const val = allPatches[key]
          const preview = Array.isArray(val)
            ? `[${val.length} blocks]`
            : JSON.stringify(val).slice(0, 80)
          console.log(`    ${key} -> ${preview}`)
        }
      }
    }
  }

  console.log(`\n=== Done ===`)
  console.log(`Patched: ${totalPatched}, Skipped (already migrated): ${totalSkipped}`)
  if (dryRun) console.log('(dry run - no changes were made)')
}

runMigration().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
