import {
  FiHome,
  FiSearch,
  FiFilm,
  FiSend,
  FiHeart,
  FiPlusSquare,
  FiMenu,
  FiGrid,
} from "react-icons/fi";
import Logo from "./Logo";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-icon logo-icon">
          <Logo size={26} />
        </div>

        <a href="#" className="sidebar-icon">
          <FiHome size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiFilm size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiSend size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiSearch size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiHeart size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiPlusSquare size={24} />
        </a>
        <a href="#" className="sidebar-icon avatar-icon">
          <div className="mini-avatar" />
        </a>
      </div>

      <div className="sidebar-bottom">
        <a href="#" className="sidebar-icon">
          <FiMenu size={24} />
        </a>
        <a href="#" className="sidebar-icon">
          <FiGrid size={24} />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;