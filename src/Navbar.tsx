import {
  FaHeart,
  FaHome,
  FaInstagram,
  FaMoon,
  FaPlusSquare,
  FaSearch,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-group">
          <FaInstagram size={24} className="brand-icon" />
          <span className="brand-text">My Instagram</span>
        </div>

        <div className="navbar-icons">
          <button className="nav-icon-btn" aria-label="Home">
            <FaHome size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Search">
            <FaSearch size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Create">
            <FaPlusSquare size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Likes">
            <FaHeart size={18} />
          </button>
          <button
            className="nav-icon-btn theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <button className="nav-icon-btn profile-btn" aria-label="Profile">
            <FaUserCircle size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;