import { UserProfile } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'

export default function UserProfilePage() {
  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 flex justify-center">
           <UserProfile 
              path="/user-profile" 
              appearance={{
                elements: {
                  rootBox: "w-full max-w-4xl shadow-xl rounded-[30px]",
                  card: "shadow-none rounded-[30px]",
                  navbar: "hidden", // We can hide the internal navbar if we want, but keeping it is better for full settings
                }
              }}
           />
        </div>
      </section>
    </main>
  )
}
