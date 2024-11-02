import './style.css';

const UserDefaultImage = ({ name }: {name: string}) => {
  const initials = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div className="user-default-image">
      {initials}
    </div>
  );
};

export default UserDefaultImage;