'use client';

import { useEffect, useRef } from 'react';
import { SPECIALTIES_LIST } from '@/data/teachers';

interface SpecialtiesSelectProps {
  name: string;
  defaultValue?: string[];
  required?: boolean;
}

const specialties = SPECIALTIES_LIST;

export default function SpecialtiesSelect({ name, defaultValue = [], required = true }: SpecialtiesSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current && defaultValue.length > 0) {
      // Set selected options
      Array.from(selectRef.current.options).forEach((option) => {
        option.selected = defaultValue.includes(option.value);
      });
    }
  }, [defaultValue]);

  return (
    <select
      ref={selectRef}
      id={name}
      name={name}
      multiple
      size={6}
      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all"
      required={required}
    >
      {specialties.map((specialty) => (
        <option
          key={specialty}
          value={specialty}
        >
          {specialty}
        </option>
      ))}
    </select>
  );
}
