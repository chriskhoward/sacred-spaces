import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-(--color-primary) text-white pt-20 relative">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-16 mb-[60px]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/">
            <Image 
              src="/assets/images/logo.png" 
              alt="Sacred Spaces Logo" 
              width={180} 
              height={60}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="text-white text-base mt-6">A dedicated space for Christ-Centered Yoga Teachers of Color and their students to connect, learn, and grow together.</p>
        </div>
        
        <div className="text-center md:text-left">
          <h4 className="text-white text-2xl font-bold mb-8">Quick Links</h4>
          <ul className="list-none p-0 m-0 space-y-4">
            <li><Link href="/" className="hover:text-(--color-roti) transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-(--color-roti) transition-colors">About Us</Link></li>
            <li><Link href="/teacher-collective" className="hover:text-(--color-roti) transition-colors">Teacher Collective</Link></li>
            <li><Link href="/directory" className="hover:text-(--color-roti) transition-colors">Directory</Link></li>
            <li><Link href="/video-library" className="hover:text-(--color-roti) transition-colors">Video Library</Link></li>
          </ul>
        </div>
        
        <div className="text-center md:text-left">
          <h4 className="text-white text-2xl font-bold mb-8">Connect With Us</h4>
          <ul className="list-none p-0 m-0 space-y-4">
            <li className="text-base flex items-center justify-center md:justify-start gap-2">
              <span className="text-(--color-roti)">✉️</span> 
              <a href="mailto:collective@flowinfaith.com" className="hover:text-(--color-roti) transition-colors">collective@flowinfaith.com</a>
            </li>
            <li className="text-base flex items-center justify-center md:justify-start gap-2">
              <span className="text-(--color-roti)">🌐</span> 
              <a href="https://www.flowinfaith.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-roti) transition-colors">www.flowinfaith.com</a>
            </li>
            <li className="pt-4">
              <p className="mb-2 text-sm text-gray-400">Follow us on Social Media:</p>
              <div className="flex gap-4 justify-center md:justify-start">
                 <a href="https://instagram.com/itsflowinfaith" target="_blank" rel="noopener noreferrer" className="text-white hover:text-(--color-roti) transition-colors">@itsflowinfaith</a>
                 <span className="text-gray-500">|</span>
                 <a href="https://instagram.com/sacredspacesyoga" target="_blank" rel="noopener noreferrer" className="text-white hover:text-(--color-roti) transition-colors">@sacredspacesyoga</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm opacity-70 m-0">Copyright {new Date().getFullYear()}, Flow in Faith Teacher&apos;s Collective. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
