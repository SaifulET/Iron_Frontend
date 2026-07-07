export interface Addon {
  id: number;
  title: string;
  price: string;
  attachedTo: string;
  category: string;
  isActive: boolean;
  isDraft?: boolean;
}

export const initialAddons: Addon[] = [
  {
    id: 1,
    title: "Eyebrow Shaping",
    price: "€25",
    attachedTo: "Bridal make-up +3",
    category: "Lashes",
    isActive: true
  },
  {
    id: 2,
    title: "Eyebrow Shaping",
    price: "€25",
    attachedTo: "Bridal make-up",
    category: "Lashes",
    isActive: true
  },
  {
    id: 3,
    title: "Eyebrow Shaping",
    price: "€25",
    attachedTo: "Bridal make-up",
    category: "Lashes",
    isActive: false,
    isDraft: true
  }
];
