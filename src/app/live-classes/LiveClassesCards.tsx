'use client';

import { useState } from 'react';
import Link from 'next/link';
import { isPaidTier } from '../../lib/tier';

interface LiveClassCard {
  _id: string;
  title: string;
  instructor: string;
  dateTime: string;
  duration?: string;
  type?: string;
  description?: string;
  zoomLink?: string;
  isLocked?: boolean;
}

interface LiveClassesCardsProps {
  classes: LiveClassCard[];
  userTier: string;
  userId: string | null;
}

function getGoogleCalendarUrl(call: LiveClassCard): string {
  const startDate = new Date(call.dateTime);

  let durationMin = 60;
  if (call.duration) {
    const match = call.duration.match(/(\d+)/);
    if (match) durationMin = parseInt(match[1]);
  }

  const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000);

  const fmtDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: call.title,
    dates: `${fmtDate(startDate)}/${fmtDate(endDate)}`,
    details: `${call.description || call.title}\n\nJoin via Zoom: ${call.zoomLink || 'Link will be provided'}`,
    location: call.zoomLink || 'Online',
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export default function LiveClassesCards({ classes, userTier, userId }: LiveClassesCardsProps) {
  const [lockedClass, setLockedClass] = useState<LiveClassCard | null>(null);

  if (classes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-xl text-gray-500">No upcoming sessions scheduled at this time. Check back soon!</p>
      </div>
    );
  }

  const isLockedForUser = (call: LiveClassCard) => call.isLocked && !isPaidTier(userTier);

  return (
    <>
      {/* Upgrade Modal */}
      {lockedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setLockedClass(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-(--color-primary) mb-2">{lockedClass.title}</h3>
              <p className="text-gray-600 mb-6">
                This live session is available to premium members. Upgrade your membership to join.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/join"
                  className="px-6 py-3 bg-(--color-roti) text-white font-bold rounded-full hover:opacity-90 transition-opacity text-center"
                >
                  Upgrade Now
                </Link>
                <button
                  onClick={() => setLockedClass(null)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {classes.map((call, idx) => {
          const callDate = new Date(call.dateTime);
          const locked = isLockedForUser(call);

          const month = callDate.toLocaleString(undefined, { month: 'short' });
          const day = callDate.getDate();
          const time = callDate.toLocaleString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          });

          return (
            <div
              key={`${call._id}-${idx}`}
              className={`bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-xl transition-shadow ${locked ? 'opacity-80' : ''}`}
            >
              {/* Date Badge */}
              <div className="bg-(--color-sidecar) text-(--color-bronzetone) p-4 md:p-6 rounded-xl text-center min-w-[120px]">
                <span className="block text-3xl md:text-4xl font-bold mb-1">{month}</span>
                <span className="block text-xl md:text-2xl font-bold">{day}</span>
                <span className="block text-xs md:text-sm font-bold uppercase mt-2">{time}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-1">
                      {call.title}
                      {locked && (
                        <span className="ml-2 text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full align-middle">
                          🔒 Premium
                        </span>
                      )}
                    </h3>
                    {call.type && (
                      <span className="inline-block bg-(--color-gallery) text-(--color-primary) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                        {call.type}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-500 mb-2 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-(--color-roti)"></span>
                  {call.instructor} {call.duration && `· ${call.duration}`}
                </p>

                {call.description && (
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {call.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <a
                    href={getGoogleCalendarUrl(call)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full text-sm hover:bg-(--color-roti) hover:text-white transition-colors"
                  >
                    + Add to Calendar
                  </a>
                  {locked ? (
                    <button
                      onClick={() => setLockedClass(call)}
                      className="px-6 py-2 bg-gray-300 text-gray-600 font-bold rounded-full text-sm hover:bg-gray-400 hover:text-white transition-colors"
                    >
                      🔒 Upgrade to Join
                    </button>
                  ) : userId && call.zoomLink ? (
                    <a
                      href={call.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-(--color-primary) text-white font-bold rounded-full text-sm hover:bg-(--color-roti) transition-colors"
                    >
                      Join via Zoom
                    </a>
                  ) : !userId ? (
                    <Link
                      href="/sign-in"
                      className="px-6 py-2 bg-(--color-primary) text-white font-bold rounded-full text-sm hover:bg-(--color-roti) transition-colors"
                    >
                      Sign in to Join
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
