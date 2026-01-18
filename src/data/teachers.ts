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

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Aisha Johnson",
    location: "Houston, TX",
    specialties: ["Christ-centered Vinyasa", "Somatic Healing", "Meditation"],
    certifications: ["RYT-500", "Trauma-Informed Yoga Utility"],
    bio: "Aisha is dedicated to helping women of color find peace and presence through the intersection of faith and movement. With 10 years of experience, she focuses on somatic practices that honor the body as a temple.",
    image: "/assets/images/our_team_1.png",
    email: "aisha@flowinfaith.com",
    website: "https://aishaflows.com"
  },
  {
    id: "2",
    name: "Dr. Marcus Chen",
    location: "Atlanta, GA",
    specialties: ["Restorative Yoga", "Biblical Meditation", "Breathwork"],
    certifications: ["RYT-200", "Ph.D. in Theology"],
    bio: "Dr. Marcus combines his deep theological background with restorative yoga to create a space for profound spiritual and physical rest. He believes that stillness is where we hear God's voice most clearly.",
    image: "/assets/images/our_team_2.png",
    email: "marcus@flowinfaith.com"
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    location: "Chicago, IL",
    specialties: ["Prenatal Yoga", "Gentle Flow", "Prayer-in-Motion"],
    certifications: ["RPYT (Registered Prenatal)", "RYT-200"],
    bio: "Elena specializes in supporting mothers through every stage of their pregnancy journey, integrating scripture and gentle movement to provide comfort and spiritual grounding.",
    image: "/assets/images/our_team_3.png",
    email: "elena@flowinfaith.com"
  },
  {
    id: "4",
    name: "Sarah Williams",
    location: "Los Angeles, CA",
    specialties: ["Power Yoga", "Youth Empowerment", "Mindfulness"],
    certifications: ["RYT-200", "Youth Yoga Specialist"],
    bio: "Sarah brings high energy and a big heart to her classes, focusing on empowering the next generation of Christian leaders to lead with mindfulness and physical strength.",
    image: "/assets/images/our_team_4.png",
    email: "sarah@flowinfaith.com"
  }
];
