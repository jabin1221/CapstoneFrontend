import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import AuthCreatePage from "./Routes/AuthCreatePage";
import LoginPage from "./Routes/LoginPage";
import MainPage from "./Routes/MainPage";
import MyPage from "./Routes/MyPage";
import BuyPage from "./Routes/BuyPage";
import SellPage from "./Routes/SellPage";
import DetailPage from "./Routes/DetailPage";
import Products from "./Routes/data";
import Layout from './Components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter,
    HashRouter as Router,
    Route,
    Routes
  } from "react-router-dom";


function App() {
  
  let [Product] = useState(Products);
  return (
   
    
  <BrowserRouter>
     <Layout></Layout>
    <Routes>
      <Route exact path="/" element={<LoginPage />}></Route>
      <Route exact path="/SignUp" element={<AuthCreatePage />}></Route>
      <Route exact path="/MainPage" element={<MainPage />}></Route>
      <Route exact path="/MyPage" element={<MyPage />}></Route>
      <Route exact path="/SellPage" element={<SellPage />}></Route>
      <Route exact path="/BuyPage" element={<BuyPage />}></Route>
      <Route path="/DetailPage/:id" element={<DetailPage Product ={ Product }/>} />
    </Routes>
    </BrowserRouter>







  );
}

export default App;
