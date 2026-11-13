export type Article = {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedAt: string;
  description: string;
  thumbnailType: 'trophy' | 'touch';
  keywords: string[];
};

export const articleList: Article[] = [
  {
    id: 'logo-5-steps',
    title: 'How to design a logo in 5 steps',
    author: 'Ahmad Shadeed',
    category: 'Design',
    publishedAt: '2024-08-13',
    description:
      'Learn a practical approach for conceptualizing, refining, and presenting a memorable brand mark that works across digital and print mediums.',
    thumbnailType: 'trophy',
    keywords: ['logo', 'branding', 'design', 'marketing', 'process'],
  },
  {
    id: 'ux-business',
    title: 'The Importance of UX Design in Business',
    author: 'John Smith',
    category: 'UX',
    publishedAt: '2024-07-12',
    description:
      'This article explains how strong UX decisions improve customer trust, reduce friction, and drive measurable growth for digital brands.',
    thumbnailType: 'touch',
    keywords: ['ux', 'business', 'strategy', 'customer', 'growth'],
  },
  {
    id: 'brand-identity',
    title: 'Building a stronger brand identity',
    author: 'Ahmad Shadeed',
    category: 'Branding',
    publishedAt: '2024-06-02',
    description:
      'A guide to establishing clear positioning, consistent messaging, and a visual system that helps your brand stand out in competitive markets.',
    thumbnailType: 'trophy',
    keywords: ['brand', 'identity', 'positioning', 'visual', 'strategy'],
  },
  {
    id: 'mobile-ux',
    title: 'Mobile UX patterns that increase retention',
    author: 'John Smith',
    category: 'UX',
    publishedAt: '2024-05-18',
    description:
      'Understand the interactions and design choices that keep users engaged on mobile devices and encourage repeat behavior.',
    thumbnailType: 'touch',
    keywords: ['mobile', 'ux', 'retention', 'patterns', 'interaction'],
  },
  {
    id: 'storefront-growth',
    title: 'Designing a storefront for growth',
    author: 'Ahmad Shadeed',
    category: 'Ecommerce',
    publishedAt: '2024-09-01',
    description:
      'Optimize your storefront hierarchy, messaging, and calls-to-action to convert more visitors into loyal customers without overwhelming the experience.',
    thumbnailType: 'trophy',
    keywords: ['storefront', 'growth', 'ecommerce', 'design', 'conversion'],
  },
  {
    id: 'seo-copy',
    title: 'Using content strategy for SEO wins',
    author: 'John Smith',
    category: 'Marketing',
    publishedAt: '2024-04-27',
    description:
      'Explore how strategic content planning aligns SEO performance, audience needs, and brand trust across the entire customer journey.',
    thumbnailType: 'touch',
    keywords: ['seo', 'content', 'strategy', 'digital', 'marketing'],
  },
  {
    id: 'dashboard-ui',
    title: 'Dashboard UI patterns that reduce friction',
    author: 'Ahmad Shadeed',
    category: 'Product',
    publishedAt: '2024-03-19',
    description:
      'This article covers operating dashboards, hierarchy, and visual clarity techniques that help teams move faster with less confusion.',
    thumbnailType: 'trophy',
    keywords: ['dashboard', 'ui', 'product', 'workflow', 'friction'],
  },
  {
    id: 'creative-process',
    title: 'Creative workflows for faster output',
    author: 'John Smith',
    category: 'Process',
    publishedAt: '2024-02-12',
    description:
      'Learn how to streamline research, ideation, and iteration to move from raw direction to polished concepts without losing creative quality.',
    thumbnailType: 'touch',
    keywords: ['workflow', 'creativity', 'process', 'design', 'output'],
  },
];

export function matchesArticleQuery(article: Article, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const searchable = [
    article.title,
    article.author,
    article.category,
    article.description,
    article.keywords.join(' '),
  ]
    .join(' ')
    .toLowerCase();

  return searchable.includes(q);
}
