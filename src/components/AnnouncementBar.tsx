import { getClient } from '@/sanity/lib/client';
import Link from 'next/link';
import { draftMode } from 'next/headers';

export default async function AnnouncementBar() {
    const { isEnabled } = await draftMode();
    const client = getClient(isEnabled);
    const query = `*[_type == "announcementBar"][0] {
    isActive,
    text,
    link,
    backgroundColor
  }`;

    const announcement = await client.fetch(query);

    if (!announcement || !announcement.isActive) return null;

    const content = (
        <div className={`${announcement.backgroundColor || 'bg-roti'} text-white py-2 px-4 text-center text-sm font-medium`}>
            {announcement.text}
        </div>
    );

    if (announcement.link) {
        return (
            <Link href={announcement.link} className="block hover:opacity-90 transition-opacity">
                {content}
            </Link>
        );
    }

    return content;
}
