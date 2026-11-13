import { defaultProfile } from '@/src/features/profile';
import { PageShell } from '@/src/shared/components/page-shell';

export default function ProfilePage() {
  return (
    <PageShell title="Profile">
      <div className="profile-card">
        <img src={defaultProfile.avatar} alt={defaultProfile.name} className="profile-card__avatar" />
        <div>
          <h2>{defaultProfile.name}</h2>
          <p>{defaultProfile.role}</p>
          <ul className="list-styled">
            <li>Email: {defaultProfile.email}</li>
            <li>Location: {defaultProfile.location}</li>
            <li>Joined: {defaultProfile.joined}</li>
          </ul>
          <button type="button" className="primary-button">Edit profile</button>
        </div>
      </div>
    </PageShell>
  );
}
