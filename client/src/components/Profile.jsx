import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '*****',
        firstName: '*****',
        lastName: '*****',
        email: '*****',
        address: '*****'
    });

    useEffect(() => {
        const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

        axios.get('http://localhost:8080/api/user/dto', {
            headers: {
                'Authorization': authToken
            }
        })
        .then(response => {
            const { username, firstName, lastName, email, address } = response.data;
            console.log("Fetched user data:", response.data); // Debugging log
            setUserData({ username, firstName, lastName, email, address });
            
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setTimeout(() => {
            // Your code to execute after 2 seconds
            console.log('This message will appear after 2 seconds');
          }, 2000); // 2000 milliseconds = 2 seconds
        navigate("/");
        toast.success('Logout Success');
        window.location.reload();
    };

    const handleDeleteAccount = async () => {
        const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

        try {
            const response = await axios.delete('http://localhost:8080/api/user/delete', {
                headers: {
                    'Authorization': authToken,
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('authToken');
                navigate("/");
                toast.success('Account deleted successfully');
                 window.location.reload();
            } else {
                toast.error('Failed to delete account');
            }
        } catch (error) {
            console.error('There was an error deleting the user account!', error);
            toast.error('There was an error deleting the user account!');
        }
    };

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-center mt-5 pt-5'>
                <div className='col-12 col-md-6 border-form justify-content-center d-flex'>
                    <div className="profile-container">
                        <div className="profile-row">
                            <div className="profile-column">
                                <div className="profile-item">
                                    <span className="profile-label">Username:</span> {userData.username}
                                </div>
                            </div>
                            <div className="profile-column">
                                <div className="profile-item">
                                    <span className="profile-label">Name:</span> {userData.firstName === null ? "No name data" : userData.firstName}
                                </div>
                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="profile-column">
                                <div className="profile-item">
                                    <span className="profile-label">Surname:</span> {userData.lastName === null ? "No surname data" : userData.lastName}
                                </div>
                            </div>
                            <div className="profile-column">
                                <div className="profile-item">
                                    <span className="profile-label">E-mail:</span> {userData.email === null ? "No email data" : userData.email}
                                </div>
                            </div>
                            <div className="profile-column">
                                <div className="profile-item">
                                    <span className="profile-label">Address:</span> {userData.address === null ? "No address data" : userData.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='justify-content-center d-flex'>
                <button id="order" className="btn btn-dark me-5" onClick={handleDeleteAccount}>Delete Account</button>
                <button id="order" className="btn btn-dark" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
