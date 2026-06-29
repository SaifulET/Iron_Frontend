export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description?: string;
  type: "duration" | "hours" | "person";
  ratePerHour?: number;
  ratePerPerson?: number;
  minPerson?: number;
  maxPerson?: number;
  maxHours?: number;
  selected?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface VenueData {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  category: string;
  openStatus: string;
  phone: string;
  facebookUrl: string;
  instagramUrl: string;
  aboutText: string;
  services: ServiceItem[];
  reviews: ReviewItem[];
  team: TeamMember[];
  galleryImages: string[];
}

export const mockVenueDetails: VenueData = {
  id: "1",
  name: "Uncle SAM Gents Salon",
  rating: 5.0,
  reviewsCount: 534,
  location: "Sobha Hartland, Dubaï",
  category: "Barber",
  openStatus: "Closed - opens at 10:30 AM",
  phone: "+12355666",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  aboutText: "Looking for the best barber in Dubai? Look no further than Uncle SAM Gents Salon in Sobha Hartland! Our expert barbers provide top-notch men's grooming services, including haircuts, styling, coloring, facials, and beard trims. We offer a luxurious experience with skilled professionals dedicated to helping you look and feel your best. Experience the difference of a truly exceptional barbershop. Visit Uncle SAM Gents Salon today! Best barber Sobha Hartland.",
  services: [
    {
      id: "s1",
      name: "Wedding Pic",
      duration: "1 hr 30 min",
      price: 90,
      type: "duration",
      selected: true
    },
    {
      id: "s2",
      name: "Wedding Pic",
      duration: "max 4 hours",
      price: 35,
      type: "hours",
      maxHours: 4,
      ratePerHour: 35
    },
    {
      id: "s3",
      name: "Wedding Pic",
      duration: "1 hr 30 min",
      price: 30,
      type: "person",
      minPerson: 2,
      maxPerson: 4,
      ratePerPerson: 30
    },
    {
      id: "s4",
      name: "Wedding Pic",
      duration: "max 4 hours",
      price: 35,
      type: "hours",
      maxHours: 4,
      ratePerHour: 35
    },
    {
      id: "s5",
      name: "Wedding Pic, Video graphy",
      duration: "2 hr 30 min",
      price: 390,
      originalPrice: 490,
      type: "duration",
      description: "Description of the service if it's written"
    }
  ],
  reviews: [
    {
      id: "r1",
      author: "Hani A",
      date: "Sat, May 2, 2026 at 12:33 PM",
      rating: 5.0,
      comment: "Great experience at this men's barber shop. Clean, professional, and the vibe is on point. Special shoutout to George who pays absolute attention to fade details and style alignment. Highly recommend!",
      avatar: "/image/profile.jpg"
    },
    {
      id: "r2",
      author: "Hani A",
      date: "Sat, May 2, 2026 at 12:33 PM",
      rating: 5.0,
      comment: "Great experience at this men's barber shop. Clean, professional, and the vibe is on point. Special shoutout to George who pays absolute attention to fade details and style alignment. Highly recommend!",
      avatar: "/image/profile.jpg"
    },
    {
      id: "r3",
      author: "Hani A",
      date: "Sat, May 2, 2026 at 12:33 PM",
      rating: 5.0,
      comment: "Great experience at this men's barber shop. Clean, professional, and the vibe is on point. Special shoutout to George who pays absolute attention to fade details and style alignment. Highly recommend!",
      avatar: "/image/profile.jpg"
    }
  ],
  team: [
    { id: "t1", name: "Olabi", role: "Hairdresser", avatar: "/image/profile.jpg" },
    { id: "t2", name: "Mery", role: "Beautician", avatar: "/image/profile.jpg" },
    { id: "t3", name: "Tarek", role: "Hairdresser", avatar: "/image/profile.jpg" },
    { id: "t4", name: "Basel", role: "Hairdresser", avatar: "/image/profile.jpg" },
    { id: "t5", name: "Ali", role: "Hairdresser", avatar: "/image/profile.jpg" },
    { id: "t6", name: "Mae", role: "Beautician", avatar: "/image/profile.jpg" }
  ],
  galleryImages: [
    "/image/imgOfService.png",
    "/image/imgOfService.png",
    "/image/imgOfService.png",
    "/image/imgOfService.png",
    "/image/imgOfService.png",
    "/image/imgOfService.png"
  ]
};
