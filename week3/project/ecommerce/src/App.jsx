import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";

function App() {
  return (
    <FavouritesProvider>
      <header className="navbar">
        <div className="navbar-inner container">
          <h1 className="logo">Ecommerce</h1>
          <nav className="nav-links">
            <NavLink to="/">Products</NavLink>
            <NavLink to="/favourites">Favourites</NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </FavouritesProvider>
  );
}

export default App;
