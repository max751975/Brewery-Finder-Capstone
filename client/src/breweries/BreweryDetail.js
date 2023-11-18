import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import LoadingSpinner from "../common/LoadingSpinner";

/** Brewery detail paige */

const BreweryDetail = () => {
  const { breweryId } = useParams();
  console.debug("BreweryDetail", "breweryId = ", breweryId);
  const [brewery, setBrewery] = useState(null);
  const END_POINT = `breweries/${breweryId}`;
  console.debug("END_POINT::::::::", END_POINT);

  useEffect(() => {
    const getBrewery = async () => {
      try {
        const response = await axios.get(END_POINT);
        setBrewery(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBrewery();
  }, []);

  if (!brewery) return <LoadingSpinner />;

  return (
    <div className="BreweryDetail col-md-8 offset-md-2">
      <h4>{brewery.name}</h4>
      <p>{brewery.location}</p>
    </div>
  );
};

export default BreweryDetail;
