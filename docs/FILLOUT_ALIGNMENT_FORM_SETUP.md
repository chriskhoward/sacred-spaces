# Fillout Alignment Form – Setup Instructions

Use this guide to connect your Alignment Form (Fillout) to the website so submissions are saved and linked to ThriveCart purchases.

---

## What You Need

- Your live site URL (e.g. `https://www.flowinfaith.com`)
- Access to the Fillout form editor for the Alignment Form
- The form must have at least one question that collects the person’s **email**

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

The site expects the submission in the **body** of the webhook request. You must send at least the submitter’s email.

1. In the webhook settings, turn on **Advanced view** (or the option that lets you edit the request body).
2. Under **Body** (for a POST request), add key/value pairs:
   - **Left side (key):** exact name from the table below.  
   - **Right side (value):** use the form field reference (e.g. the question that collects that info).

| Key (use exactly) | Required? | What to map it to |
|-------------------|-----------|--------------------|
| `email`           | **Yes**   | The form question that asks for their email address. |
| `name`            | No        | The form question that asks for their name (or first/last if you combine). |

3. You can add more body keys for any other questions (e.g. `story`, `goals`). Those will be stored under “Form Responses” in Sanity. Use short, simple keys (e.g. `name`, `email`, `story`, `goals`).

4. Save the webhook / integration.

---

## Step 4: Redirect to Checkout After Submit

So users go straight from the Alignment Form to the Join/checkout page:

1. In Fillout, find the form’s **Settings** or **Confirmation** / **Redirect** options.
2. Set **Redirect after submit** (or “Redirect URL after submission”) to:
   ```
   https://www.flowinfaith.com/join
   ```
   *(Again, replace with your real domain if different.)*

3. Save the form and **Publish** so the changes go live.

---

## Step 5: Verify in Sanity

1. Submit a test response on the Alignment Form (use a real email you can search for).
2. In **Sanity Studio**, open **Alignment Form Submission** (in the schema).
3. Confirm a new document appeared with that email and the responses you mapped.
4. After a test purchase with the same email, open **Allowed User** and confirm that record has an **Alignment Submission** value pointing to that submission.

---

## Quick Checklist

- [ ] Webhook URL set to: `https://YOUR-DOMAIN/api/webhooks/fillout`
- [ ] Body includes at least: `email` → (form email question)
- [ ] Optional: `name` → (form name question)
- [ ] Redirect after submit set to: `https://YOUR-DOMAIN/join`
- [ ] Form published
- [ ] Test submission appears in Sanity under **Alignment Form Submission**

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| No document in Sanity after submit | Webhook URL correct? Body includes a field the site can read as email (key `email` or a value that looks like an email)? Check Fillout’s webhook logs for errors. |
| 400 “Missing email” | The body key must be `email` (lowercase) or the value in another mapped field must be a valid email address. |
| User not redirected to /join | Redirect URL is set in Fillout’s redirect/confirmation settings and the form is published. |

---

*Document: Fillout Alignment Form setup. Update the domain in the URLs if your site is hosted elsewhere.*
