/**
 * Create or replace the Teacher Collective FAQs singleton in Sanity
 * so it appears when you open "Teacher Collective FAQs" in the Studio.
 *
 * Run with: npx tsx scripts/seed-teacher-collective-faqs.ts
 *
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN.
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set');
  process.exit(1);
}

const FAQ_DOC = {
  _id: 'teacherCollectiveFaqs',
  _type: 'teacherCollectiveFaqs',
  title: 'Teacher Collective FAQs',
  intro: "Still have questions? I understand. Let's chat!",
  heading: 'FAQs',
  items: [
    { _key: '1', question: 'Who is the Flow in Faith Teachers Collective for?', answer: "The Flow in Faith Teachers Collective is for yoga teachers of color who identify as Christian and are seeking a culturally aware, faith-affirming community where they can grow, teach, and be poured into as whole people. It's especially supportive for those navigating the tension between the yoga world, the church world, and their own desire to teach authentically without overextending, overexplaining, or shrinking." },
    { _key: '2', question: 'Do I have to be a Christian to join?', answer: 'No, you do not have to identify as Christian to join the Collective. However, our conversations, offerings, and gatherings are rooted in Christ-centered principles, language and practice. Participation in this space requires respect for that foundation and the faith-centered nature of the community.' },
    { _key: '3', question: 'Who is this membership NOT for?', answer: 'The Flow in Faith Teachers Collective may not be aligned if you are not interested in community, collaboration, or engaging faith and yoga together with intention. It may also not be the right fit if you are looking for a purely secular yoga business group or a space that centers dominant cultural perspectives rather than lived experience.' },
    { _key: '4', question: 'How can I support if I am not a Person of Color?', answer: 'We deeply appreciate your desire to support this work. You can support by amplifying Flow in Faith, sharing our offerings, attending public events, hiring teachers from our directory, and honoring the importance of culturally specific spaces created for and led by teachers of color. You can also sponsor a membership for a teacher by emailing collective@flowinfaith.com' },
    { _key: '5', question: 'What does the Flow in Faith Teachers Collective program offer?', answer: 'The Flow in Faith Teachers Collective offers a private community space, monthly community check-ins, teacher directory placement, and quarterly masterclasses focused on spiritually aligned and culturally grounded growth. Premium members also receive opportunities for visibility, promotion, paid teaching, and contribution to the on-demand library.' },
    { _key: '6', question: 'What kind of support can I expect as a member?', answer: 'As a member, you can expect relational, spiritual, and professional support rooted in community rather than hierarchy. Support shows up through shared dialogue, facilitated gatherings, collaborative opportunities, and access to aligned resources and leadership.' },
    { _key: '7', question: 'Are the LIVE Q&A Sessions Recorded?', answer: "Yes, live gatherings such as community check-ins and masterclasses are recorded whenever possible and made available inside the membership space. This allows you to revisit conversations or catch up if you're unable to attend live." },
    { _key: '8', question: 'Is there a commitment period for the membership?', answer: 'There is no long-term contract or required commitment period. You are free to cancel your membership at any time, and we trust you to stay as long as the Collective serves you well.' },
    { _key: '9', question: 'What sets your membership program apart from others?', answer: 'Flow in Faith Teachers Collective is the only space intentionally created for Christian Yoga Teachers of Color where faith, culture, and calling are honored together without compromise. Our difference lies in culturally grounded community, spiritually aligned growth, and leadership rooted in lived experience.' },
    { _key: '10', question: 'How do I access the resources and materials included in the membership?', answer: "Once you join, you'll receive access to our private online platform where all community spaces, resources, recordings, and announcements live. Everything is designed to be easy to access from any device, so you can engage in a way that fits your life." },
  ],
};

async function main() {
  await client.createOrReplace(FAQ_DOC);
  console.log('Teacher Collective FAQs document created/updated with _id: teacherCollectiveFaqs');
  console.log('Open Studio → Content → Teacher Collective FAQs to edit.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
