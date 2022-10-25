import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    handleLogin(userData);
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h2 className="auth__title">Log in</h2>
          <input
            type="email"
            name="email"
            id="email"
            className="auth__input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="auth__input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="auth__button">
          {isLoading ? "Logging In..." : "Log in"}
        </button>
        <p className="auth__text">
          Not a member yet?{" "}
          <Link to="/signup" className="auth__link">
            Sign up here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
