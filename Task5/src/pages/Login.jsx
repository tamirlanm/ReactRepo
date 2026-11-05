
function Login() {
  return (
    <section className="section">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p className="muted">
          Login interface for future authentication.
        </p>

        <form onSubmit={(event) => event.preventDefault()}>
          <label className="form-field">
            <span>Email</span>

            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>

            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="button"
            className="button"
            disabled
          >
            Login (Coming Soon)
          </button>
        </form>

        <p className="muted">
          Authentication is not implemented yet.
        </p>
      </div>
    </section>
  );
}

export default Login;
