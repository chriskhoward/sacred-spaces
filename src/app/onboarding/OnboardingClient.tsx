'use client';

import { useState } from 'react';
import SpecialtiesSelect from '@/components/SpecialtiesSelect';

type CompleteOnboarding = (formData: FormData) => Promise<void>;
type CompleteTeacherOnboarding = (formData: FormData) => Promise<void>;

interface OnboardingClientProps {
  needsTeacherProfile: boolean;
  userFirstName: string;
  userLastName: string;
  completeOnboarding: CompleteOnboarding;
  completeTeacherOnboarding: CompleteTeacherOnboarding;
}

function TeacherDirectoryForm({
  defaultName,
  completeTeacherOnboarding,
  showHeading = true,
}: {
  defaultName: string;
  completeTeacherOnboarding: CompleteTeacherOnboarding;
  showHeading?: boolean;
}) {
  return (
    <div className="bg-white p-12 rounded-[30px_0_30px_0] shadow-xl">
      {showHeading && (
        <>
          <h2 className="text-3xl font-bold text-(--color-primary) mb-6">Complete Your Directory Profile</h2>
          <p className="text-gray-600 mb-8">
            To appear in the Teacher Directory, please provide the following information:
          </p>
        </>
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
          className="w-full bg-(--color-roti) text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-(--color-primary) transition-all shadow-lg"
        >
          Complete Profile & Continue
        </button>
      </form>
    </div>
  );
}

export default function OnboardingClient({
  needsTeacherProfile,
  userFirstName,
  userLastName,
  completeOnboarding,
  completeTeacherOnboarding,
}: OnboardingClientProps) {
  const [selectedPath, setSelectedPath] = useState<'teacher' | 'practitioner' | null>(null);

  const defaultName = [userFirstName, userLastName].filter(Boolean).join(' ').trim() || '';

  // Already chose Teacher in a previous session; show only the directory form
  if (needsTeacherProfile) {
    return (
      <TeacherDirectoryForm
        defaultName={defaultName}
        completeTeacherOnboarding={completeTeacherOnboarding}
        showHeading={true}
      />
    );
  }

  // User just selected Teacher on this page; show directory form, hide path cards
  if (selectedPath === 'teacher') {
    return (
      <TeacherDirectoryForm
        defaultName={defaultName}
        completeTeacherOnboarding={completeTeacherOnboarding}
        showHeading={true}
      />
    );
  }

  // Path choice: Practitioner submits form; Teacher sets state to show form
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <button
        type="button"
        onClick={() => setSelectedPath('teacher')}
        className="bg-white p-10 rounded-[30px_0_30px_0] shadow-xl border-2 border-transparent hover:border-(--color-roti) transition-all text-left group"
      >
        <div className="text-5xl mb-6">🧘‍♀️</div>
        <h3 className="text-2xl font-bold text-(--color-primary) mb-4">I am a Teacher</h3>
        <p className="text-gray-600 mb-8">
          I want to join the Teacher Collective, list myself in the directory, and access resources for Christ-Centered Yoga Teachers of Color.
        </p>
        <span className="inline-block px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full group-hover:bg-(--color-roti) group-hover:text-white transition-colors">
          Select Teacher Path
        </span>
      </button>

      <form action={completeOnboarding} className="contents">
        <input type="hidden" name="membershipType" value="practitioner" />
        <button
          type="submit"
          className="bg-white p-10 rounded-[30px_0_30px_0] shadow-xl border-2 border-transparent hover:border-(--color-roti) transition-all text-left group"
        >
          <div className="text-5xl mb-6">✨</div>
          <h3 className="text-2xl font-bold text-(--color-primary) mb-4">I am a Practitioner</h3>
          <p className="text-gray-600 mb-8">
            I want to join the community, access the on-demand video library, and find Christ-centered yoga classes.
          </p>
          <span className="inline-block px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full group-hover:bg-(--color-roti) group-hover:text-white transition-colors">
            Select Practitioner Path
          </span>
        </button>
      </form>
    </div>
  );
}
