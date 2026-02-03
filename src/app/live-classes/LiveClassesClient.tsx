'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LiveClass {
  _id: string;
  title: string;
  instructor: string;
  dateTime: string;
  duration: string;
  type: string;
  description: string;
  zoomLink?: string;
  isRecurring?: boolean;
}

interface LiveClassesClientProps {
  classes: LiveClass[];
  userId: string | null;
  membershipType: string;
}

type ViewMode = 'list' | 'calendar';

export default function LiveClassesClient({ classes, userId, membershipType }: LiveClassesClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }),
      fullDate: date,
    };
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getClassesForDate = (year: number, month: number, day: number) => {
    return classes.filter(cls => {
      const clsDate = new Date(cls.dateTime);
      return clsDate.getFullYear() === year &&
             clsDate.getMonth() === month &&
             clsDate.getDate() === day;
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(selectedMonth);
  const monthName = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) => {
    return today.getFullYear() === year &&
           today.getMonth() === month &&
           today.getDate() === day;
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('list')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-(--color-primary) text-white'
                : 'bg-white text-(--color-primary) border-2 border-(--color-primary) hover:bg-(--color-primary)/10'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              viewMode === 'calendar'
                ? 'bg-(--color-primary) text-white'
                : 'bg-white text-(--color-primary) border-2 border-(--color-primary) hover:bg-(--color-primary)/10'
            }`}
          >
            📅 Calendar View
          </button>
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="bg-white rounded-[3rem_0_3rem_0] shadow-xl overflow-hidden">
            {classes.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No upcoming live classes scheduled at the moment. Check back soon!
              </div>
            ) : (
              classes.map((cls, index) => {
                const { weekday, day, time } = formatDate(cls.dateTime);
                return (
                  <div
                    key={cls._id}
                    className={`p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-gray-50 transition-colors ${
                      index !== classes.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="bg-(--color-sidecar)/30 p-6 rounded-2xl text-center min-w-[140px] border border-(--color-sidecar)">
                      <div className="text-(--color-primary) font-bold text-lg">{weekday}</div>
                      <div className="text-3xl font-bold text-(--color-bronzetone) my-1">{day}</div>
                      <div className="text-sm font-bold text-gray-500 uppercase">{time}</div>
                      {cls.isRecurring && (
                        <div className="mt-2 text-xs text-(--color-roti) font-bold">🔄 Recurring</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="bg-(--color-primary) text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                          {cls.type}
                        </span>
                        <span className="text-gray-500 text-sm font-medium">
                          {cls.duration} • with {cls.instructor}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-(--color-primary) mb-3">{cls.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {cls.description}
                      </p>
                      {userId && cls.zoomLink ? (
                        <a
                          href={cls.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary px-8 py-3 text-sm inline-flex items-center gap-2"
                        >
                          <span>Join Class</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : userId ? (
                        <span className="text-gray-400 text-sm">Link available soon</span>
                      ) : (
                        <Link href="/sign-in" className="btn btn-primary px-8 py-3 text-sm inline-flex items-center gap-2">
                          Sign in to Join
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-[3rem_0_3rem_0] shadow-xl overflow-hidden p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--color-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-(--color-primary)">{monthName}</h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--color-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-gray-500 py-2 text-sm">
                  {day}
                </div>
              ))}

              {/* Empty cells before first day */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-2 bg-gray-50 rounded-lg"></div>
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayClasses = getClassesForDate(year, month, day);
                const hasClasses = dayClasses.length > 0;

                return (
                  <div
                    key={day}
                    className={`aspect-square p-2 rounded-lg border transition-all ${
                      isToday(day)
                        ? 'border-2 border-(--color-roti) bg-(--color-roti)/10'
                        : hasClasses
                        ? 'border-(--color-primary) bg-(--color-primary)/5 hover:bg-(--color-primary)/10'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-sm font-bold mb-1 ${isToday(day) ? 'text-(--color-roti)' : 'text-gray-700'}`}>
                      {day}
                    </div>
                    {hasClasses && (
                      <div className="space-y-1">
                        {dayClasses.slice(0, 2).map(cls => (
                          <div
                            key={cls._id}
                            className="text-xs bg-(--color-primary) text-white px-1 py-0.5 rounded truncate"
                            title={`${cls.title} - ${formatDate(cls.dateTime).time}`}
                          >
                            {formatDate(cls.dateTime).time.split(' ')[0]}
                          </div>
                        ))}
                        {dayClasses.length > 2 && (
                          <div className="text-xs text-gray-500">+{dayClasses.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Month Classes List */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold text-(--color-primary) mb-4">Classes this month</h3>
              {classes.filter(cls => {
                const clsDate = new Date(cls.dateTime);
                return clsDate.getMonth() === month && clsDate.getFullYear() === year;
              }).length === 0 ? (
                <p className="text-gray-500">No classes scheduled for this month.</p>
              ) : (
                <div className="space-y-4">
                  {classes
                    .filter(cls => {
                      const clsDate = new Date(cls.dateTime);
                      return clsDate.getMonth() === month && clsDate.getFullYear() === year;
                    })
                    .map(cls => {
                      const { weekday, day, time } = formatDate(cls.dateTime);
                      return (
                        <div key={cls._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="text-center min-w-[80px]">
                            <div className="text-sm text-gray-500">{weekday}</div>
                            <div className="font-bold text-(--color-primary)">{day}</div>
                            <div className="text-xs text-gray-500">{time}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="bg-(--color-primary) text-white text-xs px-2 py-0.5 rounded-full">
                                {cls.type}
                              </span>
                              {cls.isRecurring && <span className="text-xs text-(--color-roti)">🔄</span>}
                            </div>
                            <div className="font-bold text-(--color-primary)">{cls.title}</div>
                            <div className="text-sm text-gray-500">with {cls.instructor}</div>
                          </div>
                          {userId && cls.zoomLink && (
                            <a
                              href={cls.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary px-4 py-2 text-sm"
                            >
                              Join
                            </a>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-(--color-primary) mb-4">Want to teach a class?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We are always looking for passionate teachers to lead our community.
            Join the Teacher Collective to apply for teaching opportunities.
          </p>
          {userId ? (
            <Link href="/dashboard" className="text-(--color-roti) font-bold text-lg hover:underline">
              Go to Dashboard →
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-up" className="text-(--color-roti) font-bold text-lg hover:underline">
                Join the Collective →
              </Link>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <Link href="/sign-in" className="text-gray-600 font-bold text-lg hover:underline">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
