import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList.jsx";
import ProductList from "../components/ProductList.jsx";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        setError(null);
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to load categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        setError(null);

        let url = "https://fakestoreapi.com/products";
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="container">
      <h1 className="page-title">Products</h1>

      {loadingCategories && (
        <p className="status">Loading categories...</p>
      )}

      {error && <p className="status error">{error}</p>}

      <CategoryList
        categories={categories}
        selected={selectedCategory}
        onSelect={(category) =>
          setSelectedCategory((current) =>
            current === category ? null : category
          )
        }
      />

      {loadingProducts ? (
        <p className="status">Loading products...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default HomePage;
