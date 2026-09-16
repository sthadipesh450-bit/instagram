import {
  FiHome,
  FiSearch,
  FiCompass,
  FiFilm,
  FiMessageCircle,
  FiHeart,
  FiPlusSquare,
  FiUser,
} from "react-icons/fi";
import Logo from "./Logo";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Logo size={26} />
        <span>My Instagram</span>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link">
          <FiHome size={22} /> <span>Home</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiSearch size={22} /> <span>Search</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiCompass size={22} /> <span>Explore</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiFilm size={22} /> <span>Reels</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiMessageCircle size={22} /> <span>Messages</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiHeart size={22} /> <span>Notifications</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiPlusSquare size={22} /> <span>Create</span>
        </a>
        <a href="#" className="sidebar-link">
          <FiUser size={22} /> <span>Profile</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;