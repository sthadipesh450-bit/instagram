import { FaHeart, FaPlusSquare, FaCompass, FaMoon, FaSun } from "react-icons/fa";

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="logo">My Instagram</h1>
        <div className="navbar-icons">
          <FaCompass size={24} />
          <FaPlusSquare size={24} />
          <FaHeart size={24} />
          <button className="theme-toggle-btn" onClick={onToggleTheme}>
            {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;