import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList.jsx";
import ProductList from "../components/ProductList.jsx";
import useFetch from "../hooks/useFetch.js";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useFetch("https://fakestoreapi.com/products/categories", {
    initialData: [],
  });

  const {
    data: products,
    loading: loadingProducts,
    error: productsError,
    setUrl: setProductsUrl,
  } = useFetch("https://fakestoreapi.com/products", {
    initialData: [],
  });

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    if (selectedCategory) {
      url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
        selectedCategory
      )}`;
    }
    setProductsUrl(url);
  }, [selectedCategory, setProductsUrl]);

  const error = categoriesError || productsError;

  return (
    <div className="container">
      <h1 className="page-title">Products</h1>

      {loadingCategories && (
        <p className="status">Loading categories...</p>
      )}

      {error && <p className="status error">{error}</p>}

      <CategoryList
        categories={categories || []}
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
        <ProductList products={products || []} />
      )}
    </div>
  );
}

export default HomePage;

