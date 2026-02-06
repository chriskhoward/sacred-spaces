'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Teacher, SPECIALTIES_LIST } from '@/data/teachers';

interface DirectoryClientProps {
  teachers: Teacher[];
}

export default function DirectoryClient({ teachers }: DirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Use the predefined specialties list so the dropdown always has all options
  const allSpecialties = ['All', ...SPECIALTIES_LIST];

  const filteredTeachers = teachers.filter(teacher => {
    const name = teacher.name || '';
    const location = teacher.location || '';
    const specialties = teacher.specialties || [];

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'All' || specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <>
      <section className="bg-white py-10 shadow-md sticky top-[80px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="relative flex-2 w-full min-w-[300px]">
              <input 
                type="text" 
                placeholder="Search by name, location, or specialty..." 
                className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-(--color-gallery) focus:border-(--color-roti) outline-none transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">🔍</span>
            </div>
            
            <div className="flex items-center gap-4 flex-1 w-full min-w-[250px]">
              <label className="font-bold text-gray-700 whitespace-nowrap">Specialty:</label>
              <select 
                className="flex-1 px-4 py-4 rounded-2xl border-2 border-(--color-gallery) bg-white outline-none focus:border-(--color-roti) transition-all cursor-pointer"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {allSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 font-medium text-gray-600">
            {filteredTeachers.length} {filteredTeachers.length === 1 ? 'teacher' : 'teachers'} found
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {filteredTeachers.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col group">
                <div className="h-[350px] relative overflow-hidden bg-(--color-gallery)">
                  <Image 
                    src={teacher.image || '/assets/images/placeholder_teacher.png'} 
                    alt={teacher.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 grow flex flex-col">
                  <h3 className="text-3xl font-bold mb-2 text-(--color-primary)">{teacher.name}</h3>
                  {teacher.location && (
                    <p className="text-gray-500 mb-4 font-medium">📍 {teacher.location}</p>
                  )}
                  {teacher.specialties && teacher.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {teacher.specialties.slice(0, 3).map(s => (
                        <span key={s} className="bg-(--color-sidecar) text-(--color-bronzetone) px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                          {s}
                        </span>
                      ))}
                      {teacher.specialties.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">+{teacher.specialties.length - 3} more</span>
                      )}
                    </div>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-8 grow">{(teacher.bio || '').substring(0, 120)}{(teacher.bio || '').length > 120 ? '...' : ''}</p>
                  <Link href={`/teachers/${teacher.id}`} className="w-full py-3 bg-(--color-primary) text-white text-center rounded-full font-bold text-sm hover:bg-(--color-roti) transition-all">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="py-32 text-center text-2xl text-gray-500 italic">
              <p>No teachers found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
