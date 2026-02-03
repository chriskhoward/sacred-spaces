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
}

// Teachers are now fetched from Clerk (real users with membershipType: 'teacher')
// This file only exports the Teacher interface
export const teachers: Teacher[] = [];
