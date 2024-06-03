import React, { useState } from 'react';
import '../styles/App.css'; // Ensure you have this line if you're adding CSS in an external file
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);
        const basicAuth = `Basic ${btoa(`${encodedUsername}:${encodedPassword}`)}`;

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${encodedUsername}&password=${encodedPassword}`
        })
        .then(response => {
            if (response.ok) {
                toast.success('Login Success');
                localStorage.setItem('authToken', basicAuth); // Store token in localStorage
                navigate('/products'); // Redirect to dashboard on success
                 window.location.reload();
            } else {
                return response.text().then(text => { 
                    toast.error('Username or password is incorrect.');
                });
            }
        })
        .catch(error => {
            toast.error('Username or password is incorrect.');
        });
    };

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-center mt-5 pt-5'>
                <div className='col-12 col-md-4 border-form'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div><br></br>
                        <div className="d-flex justify-content-center"> {/* Center the button */}
                            <button type="submit" className="btn btn-primary me-4 btn btn-dark">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
