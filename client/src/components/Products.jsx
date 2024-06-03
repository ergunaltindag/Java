import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart, PiTrash } from "react-icons/pi";
import { add } from "../redux/features/navbar/navbarSlice";
import axios from 'axios';

// Component
import Hero from "./Hero";

import "../styles/Products.css";

function Products() {
    const [isProduct, setIsProduct] = useState(false); // State to store the boolean value

    const products = useSelector(state => state.productsReducer.value); // products is an array

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchIsProduct = async () => {
            const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage
            try {
                const response = await axios.get('http://localhost:8080/api/user/product', {
                    headers: {
                        'Authorization': authToken
                    }
                });
                setIsProduct(response.data); // Assuming the response data is a boolean
            } catch (error) {
                console.error('Error fetching product boolean:', error);
            }
        };

        fetchIsProduct();
    }, []);

    const handleCancelOrder = async () => {
        const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

        try {
            const response = await axios.post('http://localhost:8080/api/user/removeshop', {}, {
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setIsProduct(false); // Update the state to reflect the cancellation
                console.log("Order cancelled successfully");
            } else {
                console.error('Failed to cancel order');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    return (
        <>
            <Hero />

            <h1>PRODUCTS</h1>

            <div id="flex-container">
                {products.length > 0 && products.map((eachProduct, index) => {
                    return (
                        <div id="flex-item" key={index}>

                            <div id="product-head">
                                <img onClick={() => navigate(`/details/${eachProduct.id}`)}
                                    src={eachProduct.thumbnail} // thumbnail: küçük resim
                                    alt={eachProduct.id + " image"}>
                                </img>

                                <h2>{eachProduct.title}</h2>
                            </div>

                            <div id="product-info">
                                <h2>
                                    <span id="dolar-span">$</span>
                                    {eachProduct.price}
                                </h2>
                                {!isProduct ? (
                                    <PiShoppingCart id="shopping-cart" onClick={() => { dispatch(add(eachProduct)) }} />
                                ) : (
                                    <PiTrash id="shopping-cart" onClick={handleCancelOrder}/>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Products;
