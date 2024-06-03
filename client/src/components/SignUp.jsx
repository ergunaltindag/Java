import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/user/add', formData);
            if (response.status === 200) {
                toast.success('Sign up successful!');
                navigate("/login");
            } else {
                toast.error('Sign up failed!');
            }
        } catch (error) {
            console.error('There was an error signing up!', error);
            toast.error('There was an error signing up!');
        }
    };

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-center mt-5 pt-5'>
                <div className='col-12 col-md-4 border-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="firstName">Name</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                id="firstName" 
                                placeholder="Enter first name" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                required 
                            /><br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lastName">Surname</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                id="lastName" 
                                placeholder="Enter last name" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                required 
                            /><br></br>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                placeholder="Enter username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            /><br></br>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            /><br></br>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className='form-control' 
                                id="email" 
                                placeholder="Enter email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            /><br></br>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-dark">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
