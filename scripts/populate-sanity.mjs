import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// To use this: 
// 1. Get a Write Token from sanity.io/manage
// 2. Run: SANITY_WRITE_TOKEN=your_token node scripts/populate-sanity.mjs

const client = createClient({
  projectId: 'fyiqx87d',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

const data = JSON.parse(fs.readFileSync('./migration_data.json', 'utf8'));

async function uploadImage(localPath) {
  if (!fs.existsSync(localPath)) {
    console.warn(`⚠️ Warning: Image not found at ${localPath}`);
    return null;
  }
  console.log(`📸 Uploading: ${localPath}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(localPath), {
    filename: path.basename(localPath),
  });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function processBlocks(blocks) {
  const processed = [];
  for (const block of blocks) {
    const newBlock = { ...block };
    
    // Handle top-level local image
    if (newBlock.localImage) {
      const imageAsset = await uploadImage(newBlock.localImage);
      if (imageAsset) {
        newBlock.image = imageAsset;
      }
      delete newBlock.localImage;
    }

    // Handle nested local images (e.g. members array)
    if (newBlock.members && Array.isArray(newBlock.members)) {
      for (const member of newBlock.members) {
        if (member.localImage) {
          const memberImage = await uploadImage(member.localImage);
          if (memberImage) {
            member.image = memberImage;
          }
          delete member.localImage;
        }
      }
    }

    processed.push(newBlock);
  }
  return processed;
}

async function migrate() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_WRITE_TOKEN is not set.');
    console.log('Please run: SANITY_WRITE_TOKEN=your_token node scripts/populate-sanity.mjs');
    process.exit(1);
  }

  console.log('🚀 Starting deep migration with image uploads...');

  try {
    // Process Home content
    console.log('🏠 Processing Home page content...');
    data.home.content = await processBlocks(data.home.content);
    await client.createOrReplace(data.home);
    console.log('✅ Home page migrated with images.');

    // Process About content
    console.log('🌿 Processing About page content...');
    data.about.content = await processBlocks(data.about.content);
    await client.createOrReplace(data.about);
    console.log('✅ About page migrated with images.');

    console.log('🎉 Migration complete! Your Sanity Studio is now fully populated with images and content.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.error(err);
  }
}

migrate();
