import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Products from "./data";
import Item from "./Products.js";

function MainPage(props) {
  let [Product] = useState(Products);
  return (
    <div>
      <div className="col-md-5">
        <h3>MainPage</h3>

        {Product.map(function (product, i) {
          return <Item product={Product[i]} i={i} key={i} />;
        })}
      </div>
    </div>
  );
}

export default MainPage;
