'use client';

import { useState } from 'react';

export default function CommunityClient() {
    const [agreed, setAgreed] = useState(false);

    const guidelines = [
        {
            title: "Lead with Love & Respect",
            description: "Treat every member with kindness and respect. We are a diverse community united by faith — honor each person's journey, background, and perspective."
        },
        {
            title: "Keep It Christ-Centered",
            description: "Our community is rooted in faith. Discussions should uplift and align with our shared values of Christ-centered wellness. Be mindful of the sacred nature of this space."
        },
        {
            title: "Confidentiality Is Sacred",
            description: "What is shared in the community stays in the community. Do not screenshot, share, or repost another member's personal stories or content without their explicit permission."
        },
        {
            title: "No Spam or Self-Promotion",
            description: "Please refrain from unsolicited promotions, sales pitches, or spam. If you'd like to share a resource or offering, ask a community leader first. We have dedicated spaces for sharing opportunities."
        },
        {
            title: "Engage Authentically",
            description: "Show up as your genuine self. Ask questions, share your journey, encourage others. This community thrives when everyone participates with authenticity and vulnerability."
        },
        {
            title: "Disagree with Grace",
            description: "Healthy dialogue is welcome. If you disagree, do so respectfully and without personal attacks. Seek to understand before being understood. If a conversation becomes heated, step back and pray."
        },
        {
            title: "Report Concerns",
            description: "If you witness behavior that violates these guidelines or makes you feel unsafe, please reach out to a community leader directly. We take every concern seriously and will address it with care."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto">
            {/* Guidelines Section */}
            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-(--color-primary) mb-4">Community Guidelines</h2>
                    <p className="text-gray-600 text-lg">
                        To keep our space sacred and supportive, we ask that all members honor these guidelines.
                    </p>
                </div>

                <div className="space-y-6">
                    {guidelines.map((g, idx) => (
                        <div key={idx} className="flex gap-5 items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm">
                                {idx + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-(--color-primary) mb-2">{g.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{g.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-(--color-primary) rounded-3xl text-center text-white shadow-xl relative overflow-hidden">
                    {/* Design element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-sidecar) opacity-10 rounded-bl-full -mr-16 -mt-16"></div>

                    <p className="text-lg font-medium text-(--color-sidecar) mb-8 relative z-10">
                        By joining our community, you agree to uphold these guidelines and contribute to a space where faith, wellness, and community flourish together.
                    </p>

                    <div className="flex flex-col items-center gap-6 relative z-10">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <div className="w-6 h-6 border-2 border-(--color-sidecar) rounded-md peer-checked:bg-(--color-roti) peer-checked:border-(--color-roti) transition-all"></div>
                                <svg
                                    className="absolute top-1 left-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-white font-medium group-hover:text-(--color-sidecar) transition-colors">
                                I have read and agree to the community guidelines
                            </span>
                        </label>

                        <div className={`transition-all duration-500 transform ${agreed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <a
                                href="https://chat.whatsapp.com/IUiYAER2VWW0OnFPoZwLmZ?mode=gi_t"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-(--color-roti) text-white font-bold rounded-full hover:bg-white hover:text-(--color-primary) transition-all shadow-lg hover:shadow-2xl"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Join the WhatsApp Group
                            </a>
                        </div>

                        {!agreed && (
                            <p className="text-white/60 text-sm animate-pulse">
                                Please check the box above to reveal the link
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
        </div >
    );
}
