
import { useState } from "react";
import { Link, Navigate } from "react-router";

import { useAuth } from "../context/authContext";
import { useAuthAction } from "../hooks/useAuthAction";

function Login() {
  const {
    user,
    loading,
    sessionError,
    login,
    loginWithGoogle,
  } = useAuth();

  const {
    pending,
    error,
    run,
  } = useAuthAction();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    void run(() => login(email.trim(), password));
  }

  function handleGoogleLogin() {
    void run(loginWithGoogle);
  }

  if (loading) {
    return (
      <output className="status-message">
        Checking authentication...
      </output>
    );
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <section className="section">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p className="muted">
          Sign in to your ProductExplorer account.
        </p>

        {(error || sessionError) && (
          <div className="auth-error" role="alert">
            {error || sessionError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>

            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              disabled={pending}
            />
          </label>

          <label className="form-field">
            <span>Password</span>

            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              disabled={pending}
            />
          </label>

          <button
            type="submit"
            className="button"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="button button-secondary google-button"
          disabled={pending}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
