import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");

  // Signup
  const [semail, setSemail] = useState("");
  const [spassword, setSpassword] = useState("");
  const [dob, setDob] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!lemail || !lpassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://nexovest-backend.onrender.com/login",
        {
          email: lemail,
          password: lpassword,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      alert("Login Successful");

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Invalid Credentials");
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
        "https://nexovest-backend.onrender.com/signup",
        {
          email: semail,
          password: spassword,
          dob,
        }
      );

      alert("Account Created Successfully");

      setIsLogin(true);
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  }

  return (
    <div className="auth-page">

      <div className="bg-circle one"></div>
      <div className="bg-circle two"></div>

      <div className="left-side">

        <h1>Nexovest</h1>

        <p>
          Smart Investing Starts Here
        </p>

        <span>
          Track • Invest • Grow
        </span>

      </div>

      <div className="right-side">

        <div
          className={`auth-card ${
            isLogin ? "login-mode" : "signup-mode"
          }`}
        >

          {isLogin ? (
            <>
              <h2>Welcome Back 👋</h2>

              <p className="subtitle">
                Login to continue investing.
              </p>

              <form onSubmit={handleLogin}>

                <input
                  type="email"
                  placeholder="Email"
                  value={lemail}
                  onChange={(e) =>
                    setLemail(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={lpassword}
                  onChange={(e) =>
                    setLpassword(e.target.value)
                  }
                />

                <button type="submit">
                  Login
                </button>

              </form>

              <p className="switch">

                Don't have an account?

                <span
                  onClick={() =>
                    setIsLogin(false)
                  }
                >
                  Sign Up
                </span>

              </p>
            </>
          ) : (
            <>
              <h2>Create Account 🚀</h2>

              <p className="subtitle">
                Start your investing journey.
              </p>

              <form onSubmit={handleSignup}>

                <input
                  type="email"
                  placeholder="Email"
                  value={semail}
                  onChange={(e) =>
                    setSemail(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={spassword}
                  onChange={(e) =>
                    setSpassword(e.target.value)
                  }
                />

                <input
                  type="date"
                  value={dob}
                  onChange={(e) =>
                    setDob(e.target.value)
                  }
                />

                <button type="submit">
                  Create Account
                </button>

              </form>

              <p className="switch">

                Already have an account?

                <span
                  onClick={() =>
                    setIsLogin(true)
                  }
                >
                  Login
                </span>

              </p>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Auth;