export interface NoShowWindow {
  category: string;
  opens: number; // mins
  closes: number; // mins
  reversal: number; // mins
}

export const INITIAL_NO_SHOW_WINDOWS: NoShowWindow[] = [
  { category: "Beauty & Wellness", opens: 15, closes: 120, reversal: 90 },
  { category: "Health & Fitness", opens: 15, closes: 120, reversal: 90 },
  { category: "Sports & Activities", opens: 15, closes: 120, reversal: 90 },
  { category: "Automotive", opens: 15, closes: 180, reversal: 90 },
  { category: "Pets & Home", opens: 15, closes: 45, reversal: 90 },
  { category: "Experiences & Tours", opens: 15, closes: 360, reversal: 90 },
  { category: "Entertainment & Events", opens: 15, closes: 1440, reversal: 90 },
  { category: "Creative & Education", opens: 15, closes: 120, reversal: 90 },
];
