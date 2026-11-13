import { PageShell } from '@/src/shared/components/page-shell';

const factCards = [
  {
    title: 'Mission',
    description: 'Turn raw product and content data into a focused, beautiful dashboard that supports decisions faster.',
  },
  {
    title: 'Audience',
    description: 'Designed for operators, founders, and content teams who need a clean overview of sales, stores, and ideas.',
  },
  {
    title: 'Approach',
    description: 'Blends structured commerce insights with editorial depth in a single, easy-to-navigate brand interface.',
  },
];

export default function AboutPage() {
  return (
    <PageShell title="About">
      <div className="info-grid">
        <div className="info-panel">
          <h2>iShadeed Store</h2>
          <p>
            iShadeed Store is a modern dashboard experience that brings together commerce, content, favorite items,
            and a polished storefront workflow in one place.
          </p>
          <p>
            The platform is designed for teams who need clarity, speed, and a premium visual system while managing
            products, articles, promotions, and customer-facing stories.
          </p>
        </div>

        <div className="info-panel">
          <h3>Purpose of the dashboard</h3>
          <ul className="list-styled">
            <li>Track storefront performance and top sellers.</li>
            <li>Organize article content and content discovery.</li>
            <li>Manage customer interactions, saved content, and settings.</li>
            <li>Support a responsive workflow for desktop and mobile devices.</li>
          </ul>
        </div>
      </div>

      <div className="facts-grid">
        {factCards.map((card) => (
          <div key={card.title} className="fact-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
