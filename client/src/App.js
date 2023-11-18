import "./CSS/App.css";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AdminDash from "./components/AdminDash";
import UserPage from "./components/UserPage";

import BreweryList from "./components/BreweryList";
import BreweriesList from "./breweries/BreweriesList";
import Brewery from "./components/Brewery";
import BreweryDetail from "./breweries/BreweryDetail";
import UserList from "./users/UserList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<SignupForm />}></Route>
          <Route path="login" element={<LoginForm />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="admin" element={<AdminDash />}></Route>
          <Route path="user" element={<UserPage />}></Route>
          <Route path="user/breweries" element={<BreweryList />}></Route>
          <Route path="breweries" element={<BreweriesList />}></Route>
          <Route path="users" element={<UserList />}></Route>
          <Route
            path="breweries/:breweryId"
            element={<BreweryDetail />}
          ></Route>

          <Route path="brewery" element={<Brewery />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
