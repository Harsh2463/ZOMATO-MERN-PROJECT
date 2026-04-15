import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import Home from "../pages/general/Home";
import FoodPartnerProfile from "../pages/general/FoodPartnerProfile";
import CreateFood from "../pages/general/CreateFood";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/login/foodpartner" element={<FoodPartnerLogin />} />
        <Route path="/register/foodpartner" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/:id" element={<FoodPartnerProfile />} />
        {/* Default route */}
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
