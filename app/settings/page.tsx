'use client';

import { useState } from 'react';
import { defaultSettings, validateSettings, type SettingsForm } from '@/src/features/settings';
import { PageShell } from '@/src/shared/components/page-shell';
import { useLocalStorage } from '@/src/shared/hooks/use-local-storage';

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<SettingsForm>('ishadeed-settings', defaultSettings);
  const [errors, setErrors] = useState<Partial<Record<keyof SettingsForm, string>>>({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof SettingsForm, value: string | boolean) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateSettings(settings);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1400);
    }
  };

  return (
    <PageShell title="Settings">
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={settings.username}
            onChange={(event) => handleChange('username', event.target.value)}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={settings.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="switch-row">
          <label htmlFor="notifications">Notifications</label>
          <input
            id="notifications"
            type="checkbox"
            checked={settings.notifications}
            onChange={(event) => handleChange('notifications', event.target.checked)}
          />
        </div>

        <div className="field">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(event) => handleChange('theme', event.target.value as 'light' | 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button type="submit" className="primary-button">Save</button>
        {saved && <span className="success-text">Saved successfully.</span>}
      </form>
    </PageShell>
  );
}
