import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useFavourites();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <p className="status">Loading product...</p>
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

  if (!product) {
    return null;
  }

  const isFavourite = favourites.includes(product.id);
  const heart = isFavourite ? "♥" : "♡";

  function handleHeartClick() {
    toggleFavourite(product.id);
  }

  return (
    <div className="container">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="product-detail">
        <div className="product-detail-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
          <button
            type="button"
            className="favourite-button"
            onClick={handleHeartClick}
          >
            {heart}
          </button>
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-price">${product.price}</p>
          <p>{product.description}</p>
          <p className="product-detail-category">{product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
