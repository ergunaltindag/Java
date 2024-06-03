import React from "react";
import { BsHandbag, BsPerson } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { TbBrandHexo } from 'react-icons/tb';

import "../styles/Navbar.css";

function Navbar() {

    const products = useSelector(state => state.navbarReducer.value); // products is an array

    // Sepetteki toplam ürün sayısını hesaplama (navbarda göstermek için)
    function numberOfProducts() {
        let number = 0;
        for (let i = 0; i < products.length; i++) {
            number += products[i].quantity;
        }
        return number;
    }

    const navigate = useNavigate();

    // function handleClickIcon() {
    //     navigate("/");
    //     window.scroll({ top: 0, behavior: 'smooth' });
    // }

    function handleClickHandBag() {
        navigate("/shoppingCart");
        window.scroll({ top: 0, behavior: 'smooth' });
    }
    function handleClickProfile(){
        navigate("/profile");
    }
    function handleClickShop() {
        navigate("/products");
        
    }

    return (
        <div id="navbar-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <div id="icon"><TbBrandHexo id="icon-in-div" onClick={handleClickIcon} /></div> */}
            <BsPerson id="profile-icon" onClick={handleClickProfile} />
            <BsHandbag id="hand-bag" onClick={handleClickHandBag} />
           <button id="shop-link" onClick={handleClickShop} style={{ color: 'white', fontSize: '24px', backgroundColor: 'inherit' }}>Shop</button>
            <div id="number-of-products">{numberOfProducts()}</div>
        </div>
    )
};

export default Navbar;