import ProductCard from "../components/ProductCard.jsx";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="status">No products found</p>;
  }

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
