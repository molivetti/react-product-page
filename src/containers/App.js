import React, { Component } from 'react';
import { connect } from "react-redux";
import Error from '../components/Error';
import Loading from '../components/Loading';
import Sidepanel from "../components/Sidepanel";
import Overview from "../components/Overview";
import Sales from "../components/Sales";
import { fetchProducts } from "../actions/index";
import Ajv from "ajv";

class App extends Component {

	componentDidMount() {
    this.props.dispatch(fetchProducts())
  }

	render() {
		const { error, loading, products } = this.props;
    
    if (error) {
      return <Error message={error.message} />
    }

    if (loading || products === undefined) {
      return <Loading />
    }

    if (products.length === 0) {
    	return <Error message="No product found." />
    }

    const ajv = new Ajv({ removeAdditional: true });
    const schema = {
      "properties": {
        "weekEnding":     { "type": "string", "format": "date" },
        "retailSales":    { "type": "number" },
        "wholesaleSales": { "type": "number" },
        "unitsSold":      { "type": "number" },
        "retailerMargin": { "type": "number" }
      }
    }
    const validate = ajv.compile(schema);

    const product = products[0]
    if (product.sales != null){
      product.sales = product.sales.filter(function(sale){
        return validate(sale);
      })
    }

    return (
      <div className="container-fluid">
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
      </div>
    )
	}
}

const mapStateToProps = state => ({
  products: state.items,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(App);