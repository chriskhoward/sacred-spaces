# Client Handoff Guide

A practical guide for managing your Sacred Spaces website. This covers content editing through Sanity Studio, code changes with Google Antigravity IDE, local development, and deploying updates.

---

## 1. Content Changes (No Code Needed)

All content is managed through Sanity Studio. No technical skills required.

### Accessing Sanity Studio

1. Go to `yoursite.com/studio` in your browser.
2. Log in with your Sanity account credentials.
3. You will see a list of document types in the left sidebar.

### Editing Text, Images, and Rich Text

1. Select the document you want to edit from the sidebar.
2. Click into any text field to edit it directly.
3. For rich text fields, use the toolbar to apply formatting:
   - **Bold** and *italic* text
   - Links (highlight text, click the link icon, paste the URL)
   - Bulleted and numbered lists
   - Headings (H2, H3, H4)
   - Inline images
   - Blockquotes
4. For image fields, click the image area to upload a new file or select from existing assets.

### Using the Styles Tab on Summit Documents

Each summit document has a **Styles** tab where you can customize the visual appearance without touching code.

#### Button Presets

You can configure primary and secondary button styles with these options:

- **Background color** - the fill color of the button
- **Text color** - the label color
- **Size** - small, medium, or large

#### Section Background Colors

Choose from the brand palette for section backgrounds:

| Color   | Hex Code  |
|---------|-----------|
| Purple  | #413356   |
| Gold    | #C7A254   |
| Cream   | #F6EDC8   |
| Gray    | #ECECEC   |
| Bronze  | #553F0F   |
| White   | #FFFFFF   |
| Black   | #000000   |

#### Section Padding

Control the vertical spacing of each section. Choose from:

- None
- Tight
- Normal
- Loose
- Extra Loose
- Custom CSS value (for advanced users, e.g. `4rem 0`)

### Per-Page Background Color Overrides

Individual summit pages can have their own background color that overrides the default. This applies to:

- Schedule
- Contact
- Start Here
- All Access
- Community
- Yoga Classes
- Speakers

Open the relevant page document in Sanity Studio and set the background color field.

### Per-Button Color and Size Overrides

Individual buttons on specific components can override the global button presets. Look for the button style fields on each component in Sanity Studio to set a custom background color, text color, or size for that particular button.

### Publishing Changes

1. After making your edits, click the **Publish** button in the bottom-right corner of Sanity Studio.
2. Changes go live immediately. There is no separate deploy step for content updates.

---

## 2. Code Changes with Google Antigravity IDE

For changes that go beyond content (layout adjustments, new components, styling tweaks), use Google Antigravity IDE.

1. Download and install Antigravity from [antigravity.google](https://antigravity.google).
2. Clone the repository:
   - Open Antigravity and select "Clone Repository."
   - Paste the GitHub repository URL and choose a local folder.
3. Open the project folder in Antigravity.
4. Use the built-in AI agent to describe your changes. Be specific:
   - Reference exact file names when possible (e.g. "In `src/components/summit/HeroSection.tsx`, change the heading font size to 3rem").
   - Describe what you want to achieve, not just what to change (e.g. "Make the speaker cards display in a 3-column grid on desktop").
5. Review the diffs before committing:
   - Antigravity will show you exactly what lines changed.
   - Read through the changes to confirm they match your intent.
   - Accept or reject each change.

---

## 3. Local Development

To preview the site on your own machine before deploying:

1. Open a terminal in the project folder.
2. Install dependencies (only needed the first time or after pulling new changes):
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:3000` to see the site.
5. Sanity Studio is available locally at `http://localhost:3000/studio`.
6. For a production-accurate preview (optimized build, same as what visitors see):
   ```
   npm run build && npx next start
   ```

---

## 4. Deploying to Production

All deployments go through GitHub and Vercel. Follow these steps:

1. Create a new branch for your change:
   ```
   git checkout -b my-change
   ```
2. Stage and commit your files:
   ```
   git add . && git commit -m "description of change"
   ```
3. Push the branch to GitHub:
   ```
   git push origin my-change
   ```
4. Vercel automatically creates a preview deploy for the branch. Check the deploy link in the GitHub pull request or Vercel dashboard.
5. Create a Pull Request on GitHub to propose merging your branch into `main`.
6. Review the preview deploy to confirm everything looks correct.
7. Merge the Pull Request into `main`. Vercel will automatically deploy to production.

---

## 5. Troubleshooting

### Build Failures

- Check the terminal output (local) or Vercel build logs (production) for error messages.
- Common causes: missing imports, syntax errors, or a dependency that needs installing.

### Missing Content

- Open Sanity Studio and verify the document has been published (not just saved as a draft).
- Look for the green "Published" indicator on the document.

### Rolling Back a Deploy

1. Go to the Vercel dashboard.
2. Navigate to **Deployments**.
3. Find the previous working deploy.
4. Click the "..." menu on that deployment and select **Redeploy**.

### Styling Not Applying

- Open the document in Sanity Studio and check the **Styles** tab.
- Verify that the relevant fields (background color, button colors, padding) are filled in.
- If a field is empty, the component will use its default styling.
