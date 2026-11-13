export type SettingsForm = {
  username: string;
  email: string;
  notifications: boolean;
  theme: 'light' | 'dark';
};

export const defaultSettings: SettingsForm = {
  username: 'ahmadshadeed',
  email: 'ahmad@ishadeed.store',
  notifications: true,
  theme: 'light',
};

export function validateSettings(settings: SettingsForm) {
  const errors: Partial<Record<keyof SettingsForm, string>> = {};

  if (!settings.username.trim()) {
    errors.username = 'Username is required.';
  }

  if (!settings.email.trim() || !settings.email.includes('@')) {
    errors.email = 'Please enter a valid email.';
  }

  return errors;
}
