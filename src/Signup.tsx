import { useState } from "react";

interface SignupProps {
  onSubmit: (values: { name: string; email: string; password: string }) => void;
  onSwitchToLogin: () => void;
  error: string;
}

function Signup({ onSubmit, onSwitchToLogin, error }: SignupProps) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
      />

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
        Create account
      </button>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <button type="button" className="auth-link-btn" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </form>
  );
}

export default Signup;
