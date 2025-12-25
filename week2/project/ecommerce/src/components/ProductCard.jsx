import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, title, image, price } = product;

  return (
    <Link to={`/product/${id}`} className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price}</p>
    </Link>
  );
}

export default ProductCard;
