import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function JoinProPage() {
    return (
        <main className="bg-white min-h-screen">
            <Navbar />
            <section className="pt-[160px] pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-(--color-primary) mb-6">Collective Pro</h1>
                        <p className="text-xl text-gray-600">The premium experience for leadership and growth.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center bg-(--color-martinique) p-8 md:p-12 rounded-[40px] text-white">
                        <div>
                            <ul className="space-y-4">
                                {[
                                    'Teacher Directory Placement',
                                    'Monthly Community Check-Ins',
                                    'Daily Community Space',
                                    'Quarterly Masterclasses',
                                    'Promotion of Offerings',
                                    'Paid Teaching Opportunities',
                                    'Contribution to On-Demand Library'
                                ].map(feature => (
                                    <li key={feature} className="flex items-start gap-4 text-white/90">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-roti) flex items-center justify-center text-white mt-1">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:border-l-2 md:border-white/20 md:pl-12">
                            <p className="text-4xl font-bold text-white mb-2">$67</p>
                            <p className="text-white/60 mb-8 uppercase tracking-widest text-sm">per month</p>
                            <Link
                                href="/sign-up?redirect_url=/join"
                                className="inline-block w-full px-8 py-4 bg-(--color-roti) text-white font-bold rounded-full text-xl shadow-xl hover:scale-105 transition-transform"
                            >
                                Join Pro Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
