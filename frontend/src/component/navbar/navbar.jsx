import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <button className="nav-btn active">
          Explore
        </button>

        <button className="nav-btn">
          Favourites
        </button>

        <button className="nav-btn">
          AI Suggestions
        </button>
      </div>
    </nav>
  );
}

export default Navbar;