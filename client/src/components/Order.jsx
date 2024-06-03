import React, { useState } from 'react';
import '../styles/App.css'; // Ensure you have this line if you're adding CSS in an external file
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/features/navbar/navbarSlice';

function Order() {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [ccNumber, setCcNumber] = useState('');
    const [ccExpiration, setCcExpiration] = useState('');
    const [ccCvv, setCcCvv] = useState('');

    const products = useSelector(state => state.navbarReducer.value); // products is an array
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullAddress = `${address}${country}${state}${zip}`;
        const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

        const data = {
            address: fullAddress,
            cardNumber: ccNumber,
            expiryDate: ccExpiration,
            cvv: ccCvv
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/shop', {
                method: 'POST',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                dispatch(clearCart());
                navigate("/products");
                toast.success('Order has completed');
            } else {
                toast.error('Failed to submit order');
            }
        } catch (error) {
            toast.error('Error');
        }
    };

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-center mt-5 pt-5'>
                <div className='col-12 col-md-6 border-form justify-content-center d-flex'>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required value={address} onChange={(e) => setAddress(e.target.value)} />
                                <div className="invalid-feedback"> Please enter your shipping address. </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value="">Choose...</option>
                                        <option>Turkey</option>
                                    </select>
                                    <div className="invalid-feedback"> Please select a valid country. </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required value={state} onChange={(e) => setState(e.target.value)}>
                                        <option value="">Choose...</option>
                                        <option>Eskisehir</option>
                                    </select>
                                    <div className="invalid-feedback"> Please provide a valid state. </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required value={zip} onChange={(e) => setZip(e.target.value)} />
                                    <div className="invalid-feedback"> Zip code required. </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" required value={ccNumber} onChange={(e) => setCcNumber(e.target.value)} />
                                    <div className="invalid-feedback"> Credit card number is required </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required value={ccExpiration} onChange={(e) => setCcExpiration(e.target.value)} />
                                    <div className="invalid-feedback"> Expiration date required </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-cvv">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required value={ccCvv} onChange={(e) => setCcCvv(e.target.value)} />
                                    <div className="invalid-feedback"> Security code required </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className='d-flex justify-content-center'>
                                <button className="btn btn-primary btn-lg btn-block btn-dark" type="submit">Checkout</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
