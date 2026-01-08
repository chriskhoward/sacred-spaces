import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePageContent from '@/components/Home/HomePageContent';

export default async function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomePageContent />
      <Footer />
    </main>
  );
}
