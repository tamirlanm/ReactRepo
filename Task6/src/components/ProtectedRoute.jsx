
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";

function ProtectedRoute() {
  const { user, loading, sessionError } = useAuth();

  if (loading) {
    return (
      <output className="status-message">
        Checking your session...
      </output>
    );
  }

  if (sessionError) {
    return (
      <div className="error-message" role="alert">
        {sessionError}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
