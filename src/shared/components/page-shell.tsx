'use client';

import { AppShell } from '@/src/shared/components/app-shell';

export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AppShell>
      <section className="page-panel card">
        <div className="page-panel__heading">
          <h1>{title}</h1>
        </div>
        {children}
      </section>
    </AppShell>
  );
}
