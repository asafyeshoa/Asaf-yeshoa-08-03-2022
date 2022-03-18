import React from "react";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./Components/AppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style/Animations.css"
function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/:keyParam/:cityParam' element={<Home />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
