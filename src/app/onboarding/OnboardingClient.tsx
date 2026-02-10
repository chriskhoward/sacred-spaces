'use client';

import SpecialtiesSelect from '@/components/SpecialtiesSelect';
import { SPECIALTIES_LIST } from '@/data/teachers';

type CompleteTeacherOnboarding = (formData: FormData) => Promise<void>;

interface AlignmentPrefill {
  name?: string;
  location?: string;
  yogaFormats?: string[];
  whyJoin?: string;
}

interface OnboardingClientProps {
  userFirstName: string;
  userLastName: string;
  prefill?: AlignmentPrefill;
  completeTeacherOnboarding: CompleteTeacherOnboarding;
}

/**
 * Match Fillout yoga-format answers to SPECIALTIES_LIST values.
 * Uses case-insensitive substring matching so "vinyasa flow" matches "Vinyasa",
 * "power" matches "Power Yoga", etc.
 */
function matchSpecialties(yogaFormats: string[]): string[] {
  if (!yogaFormats || yogaFormats.length === 0) return [];

  const matched: string[] = [];

  for (const format of yogaFormats) {
    const lower = format.toLowerCase().trim();
    if (!lower) continue;

    for (const specialty of SPECIALTIES_LIST) {
      const specLower = specialty.toLowerCase();

      // Exact match
      if (lower === specLower) {
        if (!matched.includes(specialty)) matched.push(specialty);
        continue;
      }

      // Either side contains the other (e.g. "vinyasa flow" contains "vinyasa")
      if (lower.includes(specLower) || specLower.includes(lower)) {
        if (!matched.includes(specialty)) matched.push(specialty);
      }
    }
  }

  return matched;
}

export default function OnboardingClient({
  userFirstName,
  userLastName,
  prefill = {},
  completeTeacherOnboarding,
}: OnboardingClientProps) {
  // Prefer alignment form name, fall back to Clerk name
  const defaultName = prefill.name
    || [userFirstName, userLastName].filter(Boolean).join(' ').trim()
    || '';

  const defaultLocation = prefill.location || '';
  const defaultBio = prefill.whyJoin || '';
  const defaultSpecialties = matchSpecialties(prefill.yogaFormats || []);

  const hasPrefill = !!(prefill.location || prefill.whyJoin || (prefill.yogaFormats && prefill.yogaFormats.length > 0));

  return (
    <div className="bg-white p-12 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-(--color-primary) mb-6">Complete Your Directory Profile</h2>
      <p className="text-gray-600 mb-4">
        To appear in the Teacher Directory, please provide the following information:
      </p>

      {hasPrefill && (
        <div className="bg-(--color-sidecar)/30 border border-(--color-roti)/30 rounded-xl p-4 mb-8">
          <p className="text-sm text-(--color-bronzetone) font-medium">
            We&apos;ve pre-filled some fields from your alignment form. Feel free to review and edit anything before submitting.
          </p>
        </div>
      )}

      <form action={completeTeacherOnboarding} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Display Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={defaultName}
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={defaultLocation}
            placeholder="e.g. Houston, TX"
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio *</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={defaultBio}
            placeholder="Share your journey, teaching philosophy, and what students can expect..."
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
            required
          />
          <p className="text-sm text-gray-500 mt-2">Recommended: 300-500 characters</p>
        </div>
        <div>
          <label htmlFor="website" className="block text-gray-700 font-bold mb-2">Website URL</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://yourwebsite.com"
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">Include https:// (not required to submit)</p>
        </div>
        <div>
          <label htmlFor="specialties" className="block text-gray-700 font-bold mb-2">Specialties *</label>
          <SpecialtiesSelect
            name="specialties"
            defaultValue={defaultSpecialties}
            required
          />
          <p className="text-sm text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple</p>
        </div>
        <div>
          <label htmlFor="certifications" className="block text-gray-700 font-bold mb-2">Certifications *</label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            placeholder="e.g. RYT-200, RYT-500, YACEP"
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
            required
          />
          <p className="text-sm text-gray-500 mt-2">Separate with commas</p>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-bold text-(--color-primary) mb-4">Social Media <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instagram" className="block text-gray-700 font-bold mb-2 text-sm">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="@yourhandle"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="facebook" className="block text-gray-700 font-bold mb-2 text-sm">Facebook</label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                placeholder="https://facebook.com/yourpage"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="twitter" className="block text-gray-700 font-bold mb-2 text-sm">Twitter/X</label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="@yourhandle"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="tiktok" className="block text-gray-700 font-bold mb-2 text-sm">TikTok</label>
              <input
                type="text"
                id="tiktok"
                name="tiktok"
                placeholder="@yourhandle"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="youtube" className="block text-gray-700 font-bold mb-2 text-sm">YouTube</label>
              <input
                type="text"
                id="youtube"
                name="youtube"
                placeholder="https://youtube.com/@yourchannel"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-gray-700 font-bold mb-2 text-sm">LinkedIn</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-(--color-roti) text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-(--color-primary) transition-all shadow-lg"
        >
          Complete Profile & Continue
        </button>
      </form>
    </div>
  );
}
