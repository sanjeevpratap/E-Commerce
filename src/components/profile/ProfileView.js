// ProfileView.js
import React from 'react';

const ProfileView = ({ profile }) => (
  <div className="profile-view">
    <h2>{profile.user.username}'s Profile</h2>
    <img src={profile.profile_picture} alt="Profile" />
    <p>Bio: {profile.bio}</p>
    <p>Date of Birth: {profile.dob}</p>
    <p>Address: {profile.address}</p>
    <p>Contact: {profile.contact}</p>
  </div>
);

export default ProfileView;
