# Fillout Alignment Form – Setup Instructions

Use this guide to connect your Alignment Form (Fillout) to the website so submissions are saved and used to **pre-fill the teacher onboarding profile**.

---

## How It Works

1. A teacher fills out the Alignment Form on `/apply`.
2. Fillout sends the answers to a webhook on your site.
3. The site stores the submission in Sanity (name, email, location, yoga formats, why they want to join, etc.).
4. Fillout redirects the teacher to `/join` where they pick a plan via Clerk.
5. When the teacher reaches the onboarding profile form (`/onboarding`), **fields are pre-filled** from their alignment submission so they don't have to re-enter the same information.

---

## What You Need

- Your live site URL (e.g. `https://www.flowinfaith.com`)
- Access to the Fillout form editor for the Alignment Form
- The form must have at least one question that collects the person's **email**

---

## Step 1: Open the Webhook in Fillout

1. Log in to **Fillout** and open the **Alignment Form** (the one embedded on `/apply`).
2. In the form editor, click **Integrate** at the top.
3. Click **Webhook**.
4. Leave the webhook panel open for the next steps.

---

## Step 2: Set the Webhook URL

1. In the **Webhook URL** field, enter:
   ```
   https://www.flowinfaith.com/api/webhooks/fillout
   ```
   *(Replace `www.flowinfaith.com` with your actual domain if different.)*

2. Click **Test** to confirm the endpoint responds (optional but recommended).

3. Click **Finish setup** (or equivalent) to save the webhook.

---

## Step 3: Map Form Fields to the Webhook Body

The site expects the submission in the **body** of the webhook request. The more fields you map, the more the onboarding form can pre-fill for the teacher.

1. In the webhook settings, turn on **Advanced view** (or the option that lets you edit the request body).
2. Under **Body** (for a POST request), add key/value pairs:
   - **Left side (key):** exact name from the table below.
   - **Right side (value):** use the form field reference (e.g. the question that collects that info).

| Key (use exactly)      | Required? | What to map it to                                        | Pre-fills                  |
|------------------------|-----------|----------------------------------------------------------|----------------------------|
| `email`                | **Yes**   | "Email Address" question                                  | *(used to match the user)* |
| `name`                 | Recommended | "Full Name" question                                    | Display Name               |
| `location`             | Recommended | "Location (City, State, Country)" question              | Location                   |
| `yoga_formats`         | Recommended | "What Yoga formats do you teach?" question              | Specialties (fuzzy match)  |
| `why_join`             | Recommended | "What drew you to join the Flow in Faith Teachers Collective?" question | Bio (starting draft) |
| `teaching_experience`  | Optional  | "How long have you been teaching yoga?" question          | *(stored for reference)*   |

3. You can add more body keys for any other questions. All keys are stored in the raw "Form Responses" JSON in Sanity regardless.

4. Save the webhook / integration.

> **Note:** The webhook is smart about key names — it tries common variations (e.g. `Location`, `location`, `city`). But using the exact keys above guarantees the best results.

---

## Step 4: Redirect to Join Page After Submit

So users go straight from the Alignment Form to the membership selection page:

1. In Fillout, find the form's **Settings** or **Confirmation** / **Redirect** options.
2. Set **Redirect after submit** (or "Redirect URL after submission") to:
   ```
   https://www.flowinfaith.com/join
   ```
   *(Again, replace with your real domain if different.)*

3. Save the form and **Publish** so the changes go live.

---

## Step 5: Verify

1. Submit a test response on the Alignment Form (use a real email you can search for).
2. In **Sanity Studio**, open **Alignment Form Submission**.
3. Confirm a new document appeared with that email, and check that the **Location**, **Yoga Formats**, and **Why Join** fields are populated (not just the raw JSON).
4. Sign up with that same email through Clerk on `/join`.
5. On the `/onboarding` profile form, confirm the fields are **pre-filled** with the alignment form data.

---

## Quick Checklist

- [ ] Webhook URL set to: `https://YOUR-DOMAIN/api/webhooks/fillout`
- [ ] Body includes: `email` → (Email Address question)
- [ ] Body includes: `name` → (Full Name question)
- [ ] Body includes: `location` → (Location question)
- [ ] Body includes: `yoga_formats` → (What Yoga formats question)
- [ ] Body includes: `why_join` → (What drew you to join question)
- [ ] Optional: `teaching_experience` → (How long teaching question)
- [ ] Redirect after submit set to: `https://YOUR-DOMAIN/join`
- [ ] Form published
- [ ] Test submission appears in Sanity with structured fields populated
- [ ] Onboarding form pre-fills from alignment data

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| No document in Sanity after submit | Webhook URL correct? Body includes a field the site can read as email? Check Fillout's webhook logs for errors. |
| 400 "Missing email" | In the webhook Body, add a row with key `email` (lowercase) mapped to your form's email question. The 400 response includes a hint listing the keys received. |
| User not redirected to /join | Redirect URL is set in Fillout's redirect/confirmation settings and the form is published. |
| Onboarding form not pre-filling | Check Sanity: does the alignment submission for that email have `location`, `yogaFormats`, `whyJoin` fields populated? If they are empty, the webhook body keys may not be mapped correctly in Fillout. |
| Specialties not pre-selected | The system uses fuzzy matching (e.g. "Vinyasa Flow" matches "Vinyasa"). If the Fillout answer doesn't resemble any option in the specialties list, it won't match. |

---

*Document: Fillout Alignment Form setup. Update the domain in the URLs if your site is hosted elsewhere.*
