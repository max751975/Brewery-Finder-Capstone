import React from "react";
import { Link } from "react-router-dom";

const BreweryCard = (id, name, location) => {
  console.debug("BreweryCard", location);

  return (
    <Link className="BreweryCard card" to={`/breweries/${id}`}>
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p>
          <small>{location}</small>
        </p>
      </div>
    </Link>
  );
};

export default BreweryCard;
