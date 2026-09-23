import {
  FaEnvelope,
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
  username?: string;
  onToggleTheme: () => void;
  onLogout: () => void;
  onSelectView: (view: "home" | "profile" | "messages" | "explore") => void;
  onToggleNotifications: () => void;
  showNotifications: boolean;
}

function Navbar({
  darkMode,
  username,
  onToggleTheme,
  onLogout,
  onSelectView,
  onToggleNotifications,
  showNotifications,
}: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-group">
          <FaInstagram size={24} className="brand-icon" />
          <span className="brand-text">My Instagram</span>
        </div>

        <div className="navbar-icons">
          <button className="nav-icon-btn" aria-label="Home" onClick={() => onSelectView("home")}>
            <FaHome size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Explore" onClick={() => onSelectView("explore")}>
            <FaSearch size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Create">
            <FaPlusSquare size={18} />
          </button>
          <button
            className={showNotifications ? "nav-icon-btn active" : "nav-icon-btn"}
            aria-label="Notifications"
            onClick={onToggleNotifications}
          >
            <FaHeart size={18} />
          </button>
          <button className="nav-icon-btn" aria-label="Messages" onClick={() => onSelectView("messages")}>
            <FaEnvelope size={18} />
          </button>
          <button
            className="nav-icon-btn theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <button className="nav-icon-btn profile-btn" aria-label="Profile" onClick={() => onSelectView("profile")}>
            <FaUserCircle size={22} />
          </button>
          {username && (
            <div className="user-badge">
              <span>{username}</span>
              <button type="button" className="logout-btn" onClick={onLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;