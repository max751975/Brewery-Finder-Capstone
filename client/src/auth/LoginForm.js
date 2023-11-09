import React, { useState, useRef, useEffect, useContext } from "react";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/auth/login";

const LoginForm = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const { setAuth } = useAuth();

  const [formData, setFormData] = useState(initialState);

  const userRef = useRef();
  const errFef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // console.debug("formData=", formData, "formErrors:", formErrors);
  console.debug("formData=", formData);

  /** Handle form submit  */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, formData);

      // axios
      //   .post("http://localhost:5000/auth/login", formData)
      //   .then((response) => console.log(response.data.token));

      const token = response.data.token;
      const user = response.data.user;
      const pwd = user.password;
      delete user.password;
      // console.log(JSON.stringify(response.status));
      // console.log(user);
      // console.log(token);
      // console.log(pwd);
      setAuth({ user, pwd, token });
      // console.log("auth:", auth);
      navigate("/user");
      setFormData(initialState);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      }
      console.log(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  ref={userRef}
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
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
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;