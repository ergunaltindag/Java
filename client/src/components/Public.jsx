import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { add } from "../redux/features/navbar/navbarSlice";
import "../styles/Hero2.css";

// Component
import Hero from "./Hero";

import "../styles/Products.css";

function Products() {

    const products = useSelector(state => state.productsReducer.value); // products is an array

    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <>

            <Hero />
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-4 justify-content-center d-flex'>
                    <button onClick={() => navigate("/login")} className="btn btn-primary me-4 btn btn-dark" > Login</button>
                    <button onClick={() => navigate("/signup")} className="btn btn-primary me-4 btn btn-dark">SignUp</button>
                </div>
            </div>
        </div>
            
        </>
    )
};

export default Products;
