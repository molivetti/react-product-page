import React from "react";
import Product from "./Product";

const ProductList = ({products}) => (
  <div className="container-fluid">
    {products.map(product =>
      <div key={product.id}>
        <Product product={product} />
      </div>
    )}
  </div>
)

export default ProductList;