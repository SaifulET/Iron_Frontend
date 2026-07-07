export interface Review {
  id: string;
  bookingId: string;
  clientName: string;
  clientRole: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const initialReviewsData: Review[] = [
  {
    id: "1",
    bookingId: "123-456",
    clientName: "George",
    clientRole: "Client",
    clientAvatar: "/img/dumyUser.jpeg",
    rating: 5,
    comment: "Absolutely amazing for my wedding day! Elna was professional, punctual, and the make-up lasted all day. The home visit service is so convenient!",
    date: "25 May 2026"
  },
  {
    id: "2",
    bookingId: "123-457",
    clientName: "George",
    clientRole: "Client",
    clientAvatar: "/img/dumyUser.jpeg",
    rating: 5,
    comment: "Absolutely amazing for my wedding day! Elna was professional, punctual, and the make-up lasted all day. The home visit service is so convenient!",
    date: "25 May 2026"
  },
  {
    id: "3",
    bookingId: "123-458",
    clientName: "George",
    clientRole: "Client",
    clientAvatar: "/img/dumyUser.jpeg",
    rating: 5,
    comment: "Absolutely amazing for my wedding day! Elna was professional, punctual, and the make-up lasted all day. The home visit service is so convenient!",
    date: "25 May 2026"
  }
];
