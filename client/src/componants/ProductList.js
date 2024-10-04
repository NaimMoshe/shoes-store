import React from "react";
import ProductItem from "./ProductItem"; // ייבוא של הקומפוננטה
import './ProductList.css';


function ProductList({ products, addToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem 
          key={product._id} 
          product={product} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
}

export default ProductList;
