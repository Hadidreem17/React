import { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

function FavouritesPage() {
  const { favourites } = useFavourites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavourites() {
      if (favourites.length === 0) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const promises = favourites.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((res) => {
            if (!res.ok) {
              throw new Error("Failed to load product");
            }
            return res.json();
          })
        );

        const data = await Promise.all(promises);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFavourites();
  }, [favourites]);

  if (loading) {
    return (
      <div className="container">
        <p className="status">Loading favourites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="status error">{error}</p>
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="container">
        <h1>Favourites</h1>
        <p>No favourites yet.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Favourites</h1>
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
