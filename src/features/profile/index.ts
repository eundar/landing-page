export type Profile = {
  name: string;
  email: string;
  avatar: string;
  location: string;
  joined: string;
  role: string;
};

export const defaultProfile: Profile = {
  name: 'Ahmad Shadeed',
  email: 'ahmad@ishadeed.store',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  location: 'Amman, Jordan',
  joined: 'March 2021',
  role: 'Lead Product Designer',
};
