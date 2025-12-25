function CategoryList({ categories, selected, onSelect }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={selected === category ? "active" : ""}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
