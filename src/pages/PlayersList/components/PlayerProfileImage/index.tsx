import React from 'react';
import './style.css'; // Make sure to include your CSS file for styles

interface PlayerProfileImageProps {
  name?: string; // User's name, to get the initial
  profileImg?: string; // URL of the user's profile image
}

const PlayerProfileImage: React.FC<PlayerProfileImageProps> = ({ name, profileImg }) => {
  // Get the first letter of the name or default to a question mark
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="default-image-container">
      {profileImg ? (
        <img src={profileImg} className="players__card-img" alt="User Profile" />
      ) : (
        <div className="default-user-image">
          <span className="default-user-initials">{initials}</span>
        </div>
      )}
    </div>
  );
};

export default PlayerProfileImage;