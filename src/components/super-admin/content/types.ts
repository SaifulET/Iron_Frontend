export interface BlogPost {
  id: string;
  category: "Founding Partner" | "Bookly News" | "For Business" | "Customer Tips";
  status: "Published" | "Draft";
  date: string;
  title: string;
  description: string;
  fbLink: string;
  igLink: string;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  status: "Published" | "Draft";
  lastUpdated: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  status: "Published" | "Draft";
}
