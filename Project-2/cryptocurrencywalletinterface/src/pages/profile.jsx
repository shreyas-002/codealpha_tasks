function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="page">
        <h2>No user logged in</h2>
      </div>
    );
  }

  return (
    <div
      className="page"
      style={{ background: "linear-gradient(135deg, #eef1ff, #f7eaff)" }}
    >
      <h2>Profile</h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Account Type:</strong> Demo User
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
