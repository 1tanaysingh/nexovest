import { useNavigate } from "react-router-dom";

import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => navigate("/home")} className="nav-btn active">
          Explore
        </button>

        <button onClick={() => navigate("/sendstocks")} className="nav-btn">
          Favourites
        </button>

        <button onClick={() => navigate("/choice")} className="nav-btn">
          🔄 Switch to Crypto
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
