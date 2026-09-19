import { useState } from "react";

interface LoginProps {
  onSubmit: (values: { email: string; password: string }) => void;
  onSwitchToSignup: () => void;
  error: string;
}

function Login({ onSubmit, onSwitchToSignup, error }: LoginProps) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
      />

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-submit-btn">
        Log In
      </button>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button type="button" className="auth-social-btn">
        Continue with Facebook
      </button>

      <button type="button" className="auth-forgot-btn">
        Forgot password?
      </button>

      <p className="auth-switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" className="auth-link-btn" onClick={onSwitchToSignup}>
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;
