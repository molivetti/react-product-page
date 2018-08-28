import React from "react";
import BillboardChart from "react-billboardjs";

const Sales = ({ sales }) => (
  <div>
    <h1 className="display-3 mb-4 text-center">Sales</h1>
    <div className="row">
      <div className="col-lg-6">
        <div className="card mb-4">
          <div>
          <BillboardChart data={{
            json: sales,
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
      </div>
      <div className="col-lg-6">
        <div className="card mb-4 billboardchart">
          <BillboardChart 
          data={{
            json: sales,
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
              {sales.map(week =>
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
)

export default Sales;