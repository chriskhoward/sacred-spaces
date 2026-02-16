'use client';

import { useState } from 'react';
import LiveClassesCards from './LiveClassesCards';
import type { LiveClass } from '@/sanity/lib/live-classes';

export type LiveClassCategory = {
  _id: string;
  title: string;
  slug: string | null;
};

interface LiveClassesSectionProps {
  categories: LiveClassCategory[];
  classes: LiveClass[];
  userTier: string;
  userId: string | null;
}

export default function LiveClassesSection({
  categories,
  classes,
  userTier,
  userId,
}: LiveClassesSectionProps) {
  const [selectedId, setSelectedId] = useState<string>('all');

  const filtered =
    selectedId === 'all'
      ? classes
      : classes.filter((c) => c.categoryRef === selectedId);

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedId('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              selectedId === 'all'
                ? 'bg-(--color-primary) text-white'
                : 'bg-white text-(--color-primary) border-2 border-(--color-primary) hover:bg-(--color-gallery)'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              type="button"
              onClick={() => setSelectedId(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                selectedId === cat._id
                  ? 'bg-(--color-primary) text-white'
                  : 'bg-white text-(--color-primary) border-2 border-(--color-primary) hover:bg-(--color-gallery)'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}
      <LiveClassesCards
        classes={filtered}
        userTier={userTier}
        userId={userId}
      />
    </>
  );
}
