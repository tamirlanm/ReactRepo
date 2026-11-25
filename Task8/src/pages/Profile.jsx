
import { useAuth } from "../context/authContext";
import { useAuthAction } from "../hooks/useAuthAction";

function Profile() {
  const { user, logout } = useAuth();

  const {
    pending,
    error,
    run,
  } = useAuthAction();

  return (
    <section className="section">
      <div className="page-heading">
        <h1>My Profile</h1>

        <p>
          Manage your ProductExplorer account.
        </p>
      </div>

      <div className="content-card profile-card">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile avatar"
            className="profile-avatar"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="profile-avatar avatar-placeholder">
            {user.email?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        <h2>
          {user.displayName || "ProductExplorer User"}
        </h2>

        <dl className="details-list">
          <div className="detail-row">
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>

          <div className="detail-row">
            <dt>User ID</dt>
            <dd>{user.uid}</dd>
          </div>

          <div className="detail-row">
            <dt>Account</dt>
            <dd>
              {user.providerData
                .map((provider) => provider.providerId)
                .join(", ") || "Unknown"}
            </dd>
          </div>
        </dl>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="button"
          className="button logout-button"
          disabled={pending}
          onClick={() => void run(logout)}
        >
          {pending ? "Signing out..." : "Logout"}
        </button>
      </div>
    </section>
  );
}

export default Profile;
