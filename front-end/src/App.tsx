import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangeUserInformation from "./pages/ChangeUserInformation";
import ForumCategory from "./pages/ForumCategory";
import Payment from "./pages/Payment";
import ForgetPassword from "./pages/ForgetPassword";
import ForumModel from "./pages/ForumModel";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/forum/category/:category_id" element={<ForumModel />} />
          <Route path="/forum" element={<ForumCategory />} />
          <Route path="/change/:user_id" element={<ChangeUserInformation />} /> 
          <Route path="/homepage" element={<HomePage/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
