import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext.jsx";

function ProductCard({ product }) {
  const { id, title, image, price } = product;
  const { favourites, toggleFavourite } = useFavourites();

  const isFavourite = favourites.includes(id);

  return (
    <div className="product-card">
      <button
        type="button"
        className="fav-button"
        onClick={() => toggleFavourite(id)}
      >
        {isFavourite ? "❤️" : "♡"}
      </button>

      <Link to={`/product/${id}`} className="card-content">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
