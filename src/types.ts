export type CategoryId = 
  | 'pricing-tactics' 
  | 'brand-strategy' 
  | 'advertising-media' 
  | 'consumer-psychology' 
  | 'luxury-prestige';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  count?: number;
}

export interface Author {
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface KeyTakeaway {
  title: string;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategoryId;
  categoryName: string;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  heroTheme: {
    accentColor: string;
    bgGradient: string;
    pattern: string;
    symbol: string;
  };
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      pullQuote?: string;
      exampleBox?: {
        brandName: string;
        context: string;
        takeaway: string;
      };
    }[];
    takeaways: KeyTakeaway[];
    conclusion: string;
  };
  tags: string[];
}
