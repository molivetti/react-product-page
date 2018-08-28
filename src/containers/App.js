import React, { Component } from 'react';
import { connect } from "react-redux";
import Error from '../components/Error';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import { fetchProducts } from "../actions/index";
import Ajv from "ajv";

class App extends Component {

	componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

	render() {
		const { error, loading, products } = this.props;
    
    if (error) {
      return <Error message={error.message} />
    }

    if (loading) {
      return <Loading />
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
    if (products != null){
      products.forEach(function(product){
        if (product.sales != null){
          product.sales = product.sales.filter(function(sale){
            return validate(sale);
          })
        }
      })
    }

    return <ProductList products={products} />
	}
}

const mapStateToProps = state => ({
  products: state.items,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(App);