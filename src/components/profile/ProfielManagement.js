// ProfileManagement.js
import React from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

const ProfileManagement = ({ profiles, onEdit }) => (
  <div className="profile-management">
    {profiles.map((profile) => (
      <div key={profile.id} className="profile-item">
        <ProfileView profile={profile} />
        <ProfileEdit profile={profile} onEdit={onEdit} />
      </div>
    ))}
  </div>
);

export default ProfileManagement;
