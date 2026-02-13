import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function JoinCorePage() {
    return (
        <main className="bg-white min-h-screen">
            <Navbar />
            <section className="pt-[160px] pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-(--color-primary) mb-6">Collective Core</h1>
                        <p className="text-xl text-gray-600">The foundational membership for dedicated teachers.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center bg-(--color-gallery) p-8 md:p-12 rounded-[40px]">
                        <div>
                            <ul className="space-y-6">
                                {[
                                    'Teacher Directory Placement',
                                    'Monthly Community Check-Ins',
                                    'Daily Community Space',
                                    'Quarterly Masterclasses'
                                ].map(feature => (
                                    <li key={feature} className="flex items-start gap-4 text-gray-800 text-lg">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-1">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:border-l-2 md:border-gray-200 md:pl-12">
                            <p className="text-4xl font-bold text-(--color-primary) mb-2">$47</p>
                            <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm">per month</p>
                            <Link
                                href="/sign-up?redirect_url=/join"
                                className="inline-block w-full px-8 py-4 bg-(--color-roti) text-white font-bold rounded-full text-xl shadow-xl hover:scale-105 transition-transform"
                            >
                                Join Core Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
