import React from "react";

const Overview = ({ details, brand, retailer, reviews }) => (
  <div>
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
                  {details.map((detail, index) =>
                    <li key={index}>
                      {detail}
                    </li>
                  )}
                </ul>
              </dd>
              <dt className="col-sm-3">Brand</dt>
              <dd className="col-sm-9">{brand}</dd>
              <dt className="col-sm-3">Retailer</dt>
              <dd className="col-sm-9">{retailer}</dd>
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
              {reviews.map(review =>
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
)

export default Overview;