const AccountPage = (user: TeamUser) => {
  return (
    <div>
      AccountPage: {user.name} {user.uid}{" "}
    </div>
  );
};

export default AccountPage;
