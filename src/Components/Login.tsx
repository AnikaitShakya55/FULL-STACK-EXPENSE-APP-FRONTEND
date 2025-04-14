import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = isSignup ? { username, email, password } : { email, password };

    console.log(isSignup ? "Signing up data:" : "Logging in data:", data);

    try {
      const endpoint = isSignup
        ? `${process.env.REACT_APP_BACKEND_URL}/user_api/register`
        : `${process.env.REACT_APP_BACKEND_URL}/user_api/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        navigate("/expenseForm");
        localStorage.setItem("token", resData.token);
      } else {
        throw new Error(resData.message || "Something went wrong");
      }

      console.log("Success:", resData);
    } catch (error: any) {
      console.error("Error during auth:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className={styles.toggleText}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span className={styles.toggleLink} onClick={toggleForm}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
