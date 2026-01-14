import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <h2 className="logo">Ecommerce</h2>
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/favourites">
            Favourites
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
