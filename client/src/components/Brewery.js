import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Brewery.css";

const Brewery = ({
  breweryName = "default name",
  breweryLocation = "default location",
}) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  // const END_POINT = `/breweries/${location.state.id}`;
  console.log("location:::::::::::::::::::::::::::", location.state);

  const initialState = {
    breweryName: "",
    breweryLocation: "",
  };

  const [formData, setFormData] = useState(initialState);

  // const { breweryId, breweryName, breweryLocation } = location.state;
  const toggleEdit = () => {
    setIsEditing((edit) => !edit);
    console.log("Is Editing:::::::::", isEditing);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  };

  const handleUpdate = (evt) => {
    evt.prevent.default();
    alert("updating brewery");
  };
  let formJSX;
  isEditing
    ? (formJSX = (
        <div className="Brewery-update-form">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="breweryName">Name</label>
                    <input
                      type="text"
                      id="breweryName"
                      name="breweryName"
                      className="form-control"
                      value={formData.breweryName}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="breweryLocation"
                      name="breweryLocation"
                      id="breweryLocation"
                      className="form-control"
                      value={formData.breweryLocation}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </div>

                  {/* {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null} */}

                  <button
                    className="btn btn-primary float-right mt-3"
                    onSubmit={handleUpdate}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))
    : (formJSX = null);

  return (
    <>
      <div className="Brewery-card card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="./images/brewery-background_1.jpg"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Brewery</h5>
              <ul className="Brewery-list-group list-group list-group-flush">
                <li className="Brewery-list-group-item list-group-item">
                  <b>Name: </b> {location?.state?.breweryName}
                </li>
                <li className="Brewery-list-group-item list-group-item">
                  <b>Location:</b> {location?.state?.breweryLocation}
                </li>
              </ul>
              <button
                className="Brewery-edit-btn btn btn-sm mt-4"
                onClick={toggleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {formJSX}
    </>
  );
};

export default Brewery;
