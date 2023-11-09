import React, { useState } from "react";

const Brewery = (breweryName = breweryName, location = location) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((edit) => !edit);
  };

  let jsx = (
    <div>
      <li>{breweryName}</li>
      <li>{location}</li>
      <button onClick={toggleEdit}>Edit</button>
    </div>
  );

  return jsx;
};

export default Brewery;
