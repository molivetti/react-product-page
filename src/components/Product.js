import React from "react";
import Sidepanel from "./Sidepanel";
import Overview from "./Overview";
import Sales from "./Sales";

const Product = ({ product }) => (
  <div className="row justify-content-center my-4">

    <div className="col-xl-3 mb-4"> 
      <Sidepanel title={product.title} subtitle={product.subtitle} image={product.image} tags={product.tags} />
    </div>

    <div className="col-xl-9">

      <div className="tab-content">
        
        <div id="overview" role="tabpanel" aria-labelledby="overview-tab" className="tab-pane active">
          <Overview details={product.details} brand={product.brand} retailer={product.retailer} reviews={product.reviews} />
        </div>

        <div id="sales" role="tabpanel" aria-labelledby="sales-tab" className="tab-pane">
          <Sales sales={product.sales} />
        </div>

      </div>

    </div>
  </div>
)

export default Product;