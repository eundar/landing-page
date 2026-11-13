import { PageShell } from '@/src/shared/components/page-shell';

const projects = [
  { title: 'Storefront Revamp', category: 'Ecommerce', description: 'Improved conversion paths, merchandising, and color rhythm for a premium storefront.' },
  { title: 'Content Platform', category: 'Editorial', description: 'Designed a content-driven publishing system with article discovery and category navigation.' },
  { title: 'Dashboard UX', category: 'Analytics', description: 'Created a cleaner reporting and sales summary interface tailored for product teams.' },
  { title: 'Mobile Commerce', category: 'Mobile', description: 'Built a mobile-first commerce journey with reduced friction and stronger retention patterns.' },
];

export default function WorksPage() {
  return (
    <PageShell title="Works">
      <div className="works-grid">
        {projects.map((project) => (
          <article key={project.title} className="work-card">
            <div className="work-card__thumb" aria-hidden="true" />
            <div className="work-card__body">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
