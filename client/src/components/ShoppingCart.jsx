import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ZeroProduct from "./ZeroProduct.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { add, remove, removeOne } from "../redux/features/navbar/navbarSlice";
import { useNavigate } from "react-router-dom";

import "../styles/ShoppingCart.css";

function ShoppingCart() {
  const productsInShoppingCart = useSelector((state) => state.navbarReducer.value); // productsInShoppingCart is an array

  // Sepetteki ürünlerin fiyatlarının toplamını hesaplama
  function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < productsInShoppingCart.length; i++) {
      totalPrice += productsInShoppingCart[i].price * productsInShoppingCart[i].quantity; // Her ürünü adedi ile çarparak toplam fiyatı hesaplama
    }
    return totalPrice;
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const defaultStyle = {
    color: "#9d174d",
    cursor: "pointer"
  }

  const otherStyle = {
    color: "#dcd9d9",
    cursor: "default"
  }

  return (
    <>
      <h1 id="shopping-cart-heading">SHOPPING CART</h1>
      {calculateTotalPrice() === 0 ? (
        <ZeroProduct />
      ) : (
        <>
          {productsInShoppingCart.map((eachProduct, index) => (
            <div id="single-cart-container" className="position-relative" key={index}>
              <img src={eachProduct.thumbnail} alt={"product image"} onClick={() => navigate(`/details/${eachProduct.id}`)} />

              <div id="details">
                <span id="brand">{eachProduct.brand}</span>
                <span id="title">{eachProduct.title}</span>
              </div>

              <div id="price" className="border">
                <span id="dolar-span">$</span>
                <span id="price-span">{eachProduct.price * eachProduct.quantity}</span>
                <span
                  id="trash-icon"
                  onClick={() => dispatch(remove(eachProduct.id))}
                  className="border"
                >
                  <FaTrashAlt />
                </span>
              </div>
              <button id="order" className="position-absolute btn btn-dark" onClick={() => navigate("/order")}>Sipariş Ver</button>
            </div>
          ))}

        </>
      )}
    </>
  );
}

export default ShoppingCart;
