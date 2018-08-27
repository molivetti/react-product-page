import React, { Component } from "react";
import { connect } from "react-redux";
import BillboardChart from "react-billboardjs";
import { fetchProducts } from "../actions/index";
import Ajv from "ajv";

class ProductList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  redrawCharts(e) {
    BillboardChart.getInstances().forEach(function(chart){
      console.log(chart)
      chart.flush()
    })
  }

  render() {
    const { error, loading, products } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
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

    return (
      <div>

        <nav className="navbar navbar-dark bg-dark d-flex border-bottom box-shadow">
          <a className="navbar-brand" href="#">
            <img src="" height="25" alt=""/>
          </a>
          <h5></h5>
          <button className="navbar-toggler bg-dark ml-auto" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        <div className="container-fluid">
          {products.map(product =>
            <div key={product.id} className="row justify-content-center my-4">

              <div className="col-xl-3 mb-4">
                <ul className="card list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <img className="card-img-top" src={product.image} alt={product.subtitle} />
                    <div className="card-body">
                      <h3 className="card-title font-weight-bold">{product.title}</h3>
                      <p className="card-subtitle text-muted">{product.subtitle}</p>
                    </div>
                  </li>

                  <li className="list-group-item">
                      {product.tags.map(tag => 
                        <div key={tag} className="btn btn-sm btn-outline-dark py-0 m-1">{tag}</div>
                      )}
                  </li>

                  <li className="list-group-item">
                    <div id="productPills" className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                      <a id="overview-tab" className="h4 font-weight-bold px-4 py-3 mb-3 nav-link text-left active" data-toggle="pill" href="#overview"  role="tab" aria-controls="overview"  aria-selected="true"><span className="mr-3">&#127968;</span>OVERVIEW</a>
                      <a id="sales-tab"    className="h4 font-weight-bold px-4 py-3 nav-link text-left"        data-toggle="pill" href="#sales"     role="tab" aria-controls="sales"     aria-selected="false" onClick={this.redrawCharts}><span className="mr-3">&#128202;</span>SALES</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-xl-9">

                <div className="tab-content">
                  
                  <div id="overview" role="tabpanel" aria-labelledby="overview-tab" className="tab-pane active">
                    <h1 className="mb-4 display-3 text-center">Overview</h1>
                    <div className="row mb-4">
                      
                      <div className="col-xl-6">
                        <div className="card mb-4">
                          <h3 className="card-header text-center">
                            Details
                          </h3>
                          <div className="card-body">
                            <dl className="row">
                              <dt className="col-sm-3 pr-0">Description</dt>
                              <dd className="col-sm-9 pl-0">
                                <ul>
                                  {product.details.map((detail, index) =>
                                    <li key={index}>
                                      {detail}
                                    </li>
                                  )}
                                </ul>
                              </dd>
                              <dt className="col-sm-3">Brand</dt>
                              <dd className="col-sm-9">{product.brand}</dd>
                              <dt className="col-sm-3">Retailer</dt>
                              <dd className="col-sm-9">{product.retailer}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="card">
                          <h3 className="card-header text-center">
                            Reviews
                          </h3>
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              {product.reviews.map(review =>
                                <li key={review.customer} className="list-group-item">
                                  <h5 className="card-title"><span className="bg-light rounded-circle border border-secondary px-2 py-1 mr-2">&#128100;</span>{review.customer}</h5>
                                  <h2 className="mb-2">{String.fromCharCode(parseInt('2605', 16)).repeat(review.score)}</h2>
                                  <p className="card-text">{review.review}</p>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    
                    </div>
                  </div>

                  <div id="sales" role="tabpanel" aria-labelledby="sales-tab" className="tab-pane">
                    <h1 className="display-3 mb-4 text-center">Sales</h1>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="card mb-4">
                          <BillboardChart data={{
                            json: product.sales,
                            keys: {
                              x: "weekEnding",
                              xFormat: "%Y-%m-%d",
                              value: [ "retailSales", "wholesaleSales", "retailerMargin" ]
                            },
                            names: {
                              retailSales: "Retail Sales", wholesaleSales: "Wholesale Sales", retailerMargin: "Retailer Margin"
                            }
                          }} axis={{ x: {type: "timeseries"}, tick: {format: "%Y-%m-%d"}, y: {tick: {format: function(n){return (n<1000 ? n : (n+"").slice(0,-3)+"k");}}} }}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="card mb-4">
                          <BillboardChart 
                          data={{
                            json: product.sales,
                            keys: {
                              x: "weekEnding",
                              xFormat: "%Y-%m-%d",
                              value: [ "unitsSold" ]
                            },
                            names: {
                              unitsSold: "Units Sold"
                            },
                            colors: {
                              unitsSold: "#ff0000"
                            }
                          }} axis={{ x: {type: "timeseries"}, tick: {format: "%Y-%m-%d"} }}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card mb-4 p-3">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Week Ending</th>
                                <th>Retail Sales</th>
                                <th>Wholesale Sales</th>
                                <th>Units Sold</th>
                                <th>Retailer Margin</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.sales.map(week =>
                                <tr key={week.weekEnding}>
                                  <td>{week.weekEnding}</td>
                                  <td>{week.retailSales}</td>
                                  <td>{week.wholesaleSales}</td>
                                  <td>{week.unitsSold}</td>
                                  <td>{week.retailerMargin}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.items,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(ProductList);