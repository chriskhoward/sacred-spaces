export interface Teacher {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  certifications: string[];
  bio: string;
  image: string;
  email: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
  };
}

// Predefined specialties for directory filters
export const SPECIALTIES_LIST = [
  'Vinyasa',
  'Hatha',
  'Restorative',
  'Yin',
  'Ashtanga',
  'Power Yoga',
  'Trauma-Informed',
  'Meditation',
  'Prenatal',
  'Yoga Therapy',
  'Kids Yoga',
  'Chair Yoga',
  'Christian Meditation',
  'Breathwork',
  'Yoga Nidra',
];

// Teachers are now fetched from Clerk (real users with membershipType: 'teacher')
// This file only exports the Teacher interface
export const teachers: Teacher[] = [];
