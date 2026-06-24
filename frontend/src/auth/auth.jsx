import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Auth() {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");

  const [semail, setSemail] = useState("");
  const [spassword, setSpassword] = useState("");
  const [dob, setDob] = useState("");

  const [active, setActive] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!lemail || !lpassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: lemail,
          password: lpassword,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      alert("Login successful");

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (!semail || !spassword || !dob) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/signup",
        {
          email: semail,
          password: spassword,
          dob: dob,
        }
      );

      alert("Signup successful");

      navigate("/choice");
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  return (
    <div
      className="auth-container"
      onMouseLeave={() => setActive("")}
    >
      <div
        className="hover-left"
        onMouseEnter={() => setActive("login")}
      ></div>

      <div
        className="hover-right"
        onMouseEnter={() => setActive("signup")}
      ></div>

      <div className="welcome-panel">
        <h1>Nexovest</h1>

        <p>Smart Investing Starts Here</p>

        <span>
          Hover left for Login • Hover right for Sign Up
        </span>
      </div>

      <div
        className={`login-form ${
          active === "login" ? "show" : ""
        }`}
      >
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={lemail}
            onChange={(e) => setLemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={lpassword}
            onChange={(e) => setLpassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>

      <div
        className={`signup-form ${
          active === "signup" ? "show" : ""
        }`}
      >
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={semail}
            onChange={(e) => setSemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={spassword}
            onChange={(e) => setSpassword(e.target.value)}
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;