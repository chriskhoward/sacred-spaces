
import HeroBlock from '@/components/Blocks/Hero';

export default function SanctuaryPage() {
    return (
        <>
            <HeroBlock
                badge="THE SANCTUARY"
                title="Where Wellness Meets Worship"
                subtitle="A sacred space at the intersection of Christian spirituality, emotional wellness, and embodied practice."
                primaryButtonText="Join the Sanctuary"
                primaryButtonLink="/join"
                secondaryButtonText="Learn More"
            />
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-(--color-primary) mb-6">Coming Soon</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    We are currently preparing the Sanctuary space. This page will be updated with full details shortly.
                    <br /><br />
                    In the meantime, we invite you to join our waitlist or explore the Teachers Collective.
                </p>
            </div>
        </>
    );
}
