# Visual Editing Guide for Flow in Faith Website

## Overview

Your website uses **Sanity Studio** as a Content Management System (CMS) with **visual editing** capabilities. This means you can edit your website content and see changes in real-time, similar to page builders like Elementor.

## Accessing Sanity Studio

### Local Development
- URL: `http://localhost:3000/studio`
- Use this when running the site locally on your computer

### Production (Live Site)
- URL: `https://flowinfaith.com/studio`
- Use this to edit your live website

---

## Two Ways to Edit Content

### Method 1: Structure View (Traditional CMS)

This is the standard way to edit content, similar to WordPress.

1. **Navigate to Studio**: Go to `/studio`
2. **Click "Content"** in the left sidebar
3. **Select a document** (e.g., "Homepage")
4. **Edit the fields** directly
5. **Click "Publish"** to make changes live

### Method 2: Presentation Mode (Visual Editing) ⭐ **Recommended**

This is the visual editing mode that lets you see changes in real-time.

1. **Navigate to Studio**: Go to `/studio`
2. **Click "Presentation"** tab at the top
3. **Select a page** from the list (e.g., "Homepage")
4. **See the live preview** on the left side
5. **Edit content** on the right side
6. **Changes appear instantly** in the preview
7. **Click "Publish"** when ready

![Presentation Mode](file:///Users/cj/.gemini/antigravity/brain/46f7a409-f8da-4acd-a9c3-bed345928293/presentation_tab.png)

---

## Editing the Homepage

### Step 1: Open the Homepage in Presentation Mode

1. Go to `/studio/presentation`
2. Click on "Homepage" in the document list
3. The preview will load on the left, showing your live site
4. The editor will appear on the right

### Step 2: Understanding Content Blocks

The homepage is built using **content blocks**. Each block represents a section of your page:

| Block Type | What It Does |
|:-----------|:-------------|
| **Hero** | The main banner at the top with title, subtitle, and buttons |
| **Intro Text** | Short introductory lines below the hero |
| **Prose Section** | Longer text sections with headings and paragraphs |
| **Two Column Compare** | Side-by-side comparison (problems vs solutions) |
| **Space Cards** | Cards for different offerings (Teachers Collective, Sanctuary) |
| **Path Chooser** | Call-to-action section with multiple paths |
| **Closing Statement** | Branded closing message |

### Step 3: Editing a Block

1. **In the editor (right side)**, you'll see a list of content blocks
2. **Click on a block** to expand it
3. **Edit the fields**:
   - Text fields: Type directly
   - Text areas: For longer content
   - Images: Click to upload or select from library
   - Buttons: Edit text and links
4. **Changes appear instantly** in the preview

### Step 4: Reordering Blocks

1. **Hover over a block** in the editor
2. **Click and drag** the handle (⋮⋮) on the left
3. **Drop it** in the new position
4. The preview updates automatically

### Step 5: Adding New Blocks

1. **Click the "+ Add item"** button at the bottom of the content list
2. **Select a block type** from the menu
3. **Fill in the content**
4. The new block appears in the preview

### Step 6: Deleting Blocks

1. **Click on a block** to expand it
2. **Click the trash icon** (🗑️) at the top right
3. **Confirm deletion**
4. The block disappears from the preview

### Step 7: Publishing Changes

1. **Review your changes** in the preview
2. **Click "Publish"** button at the bottom right
3. **Wait for confirmation**
4. **Your changes are now live!**

![Publish Button](file:///Users/cj/.gemini/antigravity/brain/46f7a409-f8da-4acd-a9c3-bed345928293/publish_button.png)

---

## Common Editing Tasks

### Changing the Hero Section

The hero is the first thing visitors see. To edit it:

1. Open Homepage in Presentation mode
2. Find the **"Hero"** block (usually first in the list)
3. Click to expand it
4. Edit these fields:
   - **Badge Text**: Small label above the title
   - **Title**: Main heading
   - **Subtitle**: Description text
   - **Primary Button Text**: Text for the main button
   - **Primary Button Link**: Where the button goes (e.g., `/sign-up`)
   - **Secondary Button Text**: Text for the second button
   - **Secondary Button Link**: Where it goes
   - **Hero Image**: Main image
   - **Secondary Image**: Optional decorative overlay

### Editing Text Sections

For sections like "What Is Flow in Faith?":

1. Find the **"Prose Section"** block
2. Click to expand
3. Edit:
   - **Heading**: Section title
   - **Paragraphs**: Add/edit/remove paragraphs
   - **Style**: Choose background color (light/cream)

### Updating the Two Sacred Spaces Cards

1. Find the **"Space Cards"** block
2. Click to expand
3. Edit the **Heading** and **Subheading**
4. Click on a **Card** to edit:
   - Title
   - Badge/Tagline
   - Description
   - Bullet points
   - Button text and link

---

## Tips for Success

### ✅ Do's

- **Save often**: Click "Publish" regularly to save your work
- **Preview before publishing**: Review changes in the preview
- **Use descriptive button text**: Make it clear what happens when clicked
- **Keep titles concise**: Shorter titles are more impactful
- **Test links**: Make sure buttons go to the right pages

### ❌ Don'ts

- **Don't leave unpublished changes**: Always publish when done
- **Don't delete blocks without reviewing**: Check the preview first
- **Don't use external links without `https://`**: Links need the full URL
- **Don't forget image alt text**: Important for accessibility
- **Don't make too many changes at once**: Publish incrementally

---

## Troubleshooting

### Changes Not Appearing in Preview

1. **Wait a few seconds**: The preview can take a moment to update
2. **Refresh the preview**: Click the refresh icon in the preview toolbar
3. **Check if you're editing the right document**: Make sure "Homepage" is selected

### Can't Find the Publish Button

1. **Scroll down** in the editor sidebar
2. **Look for the green "Publish" button** at the bottom
3. **If it's grayed out**: No changes have been made yet

### Preview Shows an Error

1. **Check the browser console**: Press F12 to see errors
2. **Refresh the page**: Sometimes a simple refresh fixes it
3. **Clear browser cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Content Looks Different on Mobile

1. **Use the device preview**: Click the device icons in the preview toolbar
2. **Test on actual devices**: Always check on real phones/tablets
3. **Keep mobile users in mind**: Shorter text works better on small screens

---

## Advanced Features

### Draft Mode

- **What it is**: A way to preview changes before publishing
- **How to use it**: Changes in the editor appear in the preview instantly, but aren't live until you publish
- **Benefits**: Test changes without affecting the live site

### Visual Editing Markers

- **What they are**: Invisible markers that link preview elements to editor fields
- **How they work**: When you click on content in the preview, the corresponding field opens in the editor
- **Note**: This feature is active in Presentation mode

### Scheduling (Future Feature)

- **What it is**: Schedule content to publish at a specific time
- **Status**: Not currently enabled, but can be added if needed

---

## Getting Help

### Common Questions

**Q: How do I add a new page?**
A: Go to Structure view → Click "+" next to "Pages" → Fill in the content → Publish

**Q: Can I undo changes?**
A: Yes! Use the document history feature (clock icon) to restore previous versions

**Q: How do I add images?**
A: Click on an image field → Upload from your computer or select from the media library

**Q: What image sizes should I use?**
A: 
- Hero images: 1920x1080px minimum
- Card images: 800x600px minimum
- Profile images: 400x400px minimum

**Q: Can I edit the navigation menu?**
A: The navigation is currently hardcoded. Contact your developer to change menu items.

**Q: How do I change colors or fonts?**
A: Design settings are in the code. Contact your developer for design changes.

---

## Quick Reference

### Keyboard Shortcuts

| Action | Shortcut |
|:-------|:---------|
| Publish | `Cmd+S` (Mac) / `Ctrl+S` (Windows) |
| Undo | `Cmd+Z` / `Ctrl+Z` |
| Redo | `Cmd+Shift+Z` / `Ctrl+Shift+Z` |
| Search | `Cmd+K` / `Ctrl+K` |

### Content Block Cheat Sheet

| Block | Best For |
|:------|:---------|
| Hero | Page headers with images and CTAs |
| Intro Text | Short, impactful statements |
| Prose Section | Longer explanatory text |
| Two Column Compare | Before/after, problems/solutions |
| Space Cards | Showcasing offerings or services |
| Path Chooser | Multiple call-to-action options |
| Checklist | Lists with checkmarks |
| FAQ | Questions and answers |
| Testimonials | Customer reviews |

---

## Next Steps

1. **Practice editing**: Try changing the hero title and publishing
2. **Explore blocks**: Click through each block type to see what's available
3. **Bookmark the studio**: Save `/studio` for easy access
4. **Set up your account**: Make sure you have proper access permissions

---

## Support

If you need help:
1. **Check this guide first**: Most questions are answered here
2. **Contact your developer**: For technical issues or feature requests
3. **Sanity documentation**: [sanity.io/docs](https://www.sanity.io/docs) for advanced topics

---

**Happy editing! 🎉**
