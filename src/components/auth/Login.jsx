import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await login(loginCredentials);
      if (response.errors) {
        setError(response.errors.error || "Login failed");
        setIsSubmitting(false);
        return;
      }
      await refreshUser();
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="email" value={loginCredentials.email} onChange={handleChange} placeholder="Email" />
        <input
          name="password"
          type="password"
          value={loginCredentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
