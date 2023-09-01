type UserProps = {
  user: WithId<AscentUser>;
};

const User = ({ user }: UserProps) => {
  if (user.firstName || user.lastName) {
    return (
      <span>
        {user.firstName} {user.lastName}
      </span>
    );
  } else {
    return <span>{user.username}</span>;
  }
};

export default User;
