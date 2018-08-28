import React from "react";
import BillboardChart from "react-billboardjs";

const redrawCharts = (e) => (
  BillboardChart.getInstances().forEach(function(chart){
    console.log(chart)
    chart.flush()
  })
)

const Sidepanel = ({ title, subtitle, image, tags }) => (
  <ul className="card list-group list-group-flush">
    <li className="list-group-item text-center">
      <img className="card-img-top" src={image} alt={title} />
      <div className="card-body">
        <h3 className="card-title font-weight-bold">{title}</h3>
        <p className="card-subtitle text-muted">{subtitle}</p>
      </div>
    </li>

    <li className="list-group-item">
        {tags.map(tag => 
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
)

export default Sidepanel;