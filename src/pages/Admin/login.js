import React, { useState } from "react";
import "./css/login.css"
import imgLogo from "../../image/logo.jpg"
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const adminLoginAPI_URL = `https://blw-api.azurewebsites.net/api/StaffAccount/LoginAdminOrStaff?username=${username}&password=${password}`
    const handleLogin = async () => {
        try {
            const response = await fetch(adminLoginAPI_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                if (data.data.role === 0) {
                    localStorage.setItem("admin", JSON.stringify(data));
                    navigate('/admin/dashboard')
                }

            } else {
                // navigate('/admin/dashboard')
                // Handle login failure, display an error message, etc.
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in.');
        }
    };
    return (
        <>

            <div className="columns" style={{ height: "100vh", margin: "0" }}>
                <div className="column is-5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={imgLogo} style={{ width: 580, height: 580 }}></img>
                </div>
                <div className="column login-part">
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "200px" }}>
                        <div style={{ paddingTop: "10px" }}>
                            <div className="hamburger" style={{ marginBottom: "10px" }}></div>
                            <div className="hamburger-2" style={{ marginLeft: "10px" }}></div>
                        </div>
                        <div style={{ padding: "0px 10px 0 20px" }}>
                            <h2 style={{ fontFamily: "Nunito", fontSize: "30px" }}>Welcome to BLW for KIDS</h2>
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <div className="hamburger-3" style={{ marginBottom: "10px" }}></div>
                            <div className="hamburger-4"  ></div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignContent: "center", margin: "0", justifyContent: "center", paddingTop: "50px" }}>
                        <p className="login-notice-p">Please login with your username and password!</p>

                    </div>

                    <div className="form-login-container">
                        <div className="centered-form column is-6 ">
                            <div style={{ alignContent: "center", margin: "0", justifyContent: "center" }}>
                                <div className="field column">
                                    <p className="control has-icons-left">
                                        <input className="input" type="email" placeholder="Enter Username" onChange={(e) => {
                                            setUsername(e.target.value)
                                            setError('')
                                        }}></input>
                                        <span className="icon is-small is-left">
                                            <i className="fa-solid fa-user"></i>
                                        </span>

                                    </p>
                                </div>
                                <div className="field column">
                                    <p className="control has-icons-left">
                                        <input className="input" type="password" placeholder="Enter Password" onChange={(e) => {
                                            setPassword(e.target.value)
                                            setError('')
                                        }}></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                </div>
                                {error &&
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p className="error-message" style={{ color: "red" }}>{error}</p>
                                    </div>
                                }
                                <div className="buttons" style={{ justifyContent: "center", alignItems: "center", margin: "0", marginTop: "15px" }}>
                                    <button onClick={handleLogin} className="button is-success" style={{ fontFamily: "Nunito", width: "200px", alignContent: "center", alignItems: "center" }}>Login</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLogin;