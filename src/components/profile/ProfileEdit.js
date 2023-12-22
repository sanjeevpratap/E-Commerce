// ProfileEdit.js
import React, { useState } from 'react';

const ProfileEdit = ({ profile, onEdit }) => {
  const [editedProfile, setEditedProfile] = useState({
    bio: profile.bio,
    dob: profile.dob,
    address: profile.address,
    contact: profile.contact,
    // Add more fields as needed
  });

  const handleEditChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(profile.id, editedProfile);
  };

  return (
    <div className="profile-edit">
      <h2>Edit Profile</h2>
      <form onSubmit={handleEditSubmit}>
        {/* Input fields for editing */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
