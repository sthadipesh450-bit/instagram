import { FaHeart, FaPlusSquare, FaCompass } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="logo">My Instagram</h1>
        <div className="navbar-icons">
          <FaCompass size={24} />
          <FaPlusSquare size={24} />
          <FaHeart size={24} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;