
import { useState } from "react";
import { Link, Navigate } from "react-router";

import { useAuth } from "../context/authContext";
import { useAuthAction } from "../hooks/useAuthAction";

function Signup() {
  const { user, loading, sessionError, signup } = useAuth();

  const {
    pending,
    error,
    setError,
    run,
  } = useAuthAction();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    void run(() => signup(email.trim(), password));
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
        <h1>Create Account</h1>

        <p className="muted">
          Join ProductExplorer today.
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
              value={email}
              placeholder="Enter your email"
              autoComplete="email"
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
              value={password}
              placeholder="Create a password"
              autoComplete="new-password"
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              disabled={pending}
            />
          </label>

          <label className="form-field">
            <span>Confirm Password</span>

            <input
              type="password"
              value={confirmPassword}
              placeholder="Repeat your password"
              autoComplete="new-password"
              onChange={(event) =>
                setConfirmPassword(event.target.value)
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
            {pending
              ? "Creating account..."
              : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
