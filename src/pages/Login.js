// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "sigma" && password === "grindset") {
            navigate("/dashboard");
        } else {
            alert("You lack the sigma mindset and ultimate rizz!");
        }
    };

    return (
        <div className="login-container sigma-style">
            <div className="login-box">
                <h2>🔱 Sigma Rizz Login 🔱</h2>
                <input type="text" placeholder="Alpha Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
                <input type="password" placeholder="Grindset Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
                <button onClick={handleLogin} className="login-button">💪 Enter the Hustle 💪</button>
            </div>
        </div>
    );
}

export default Login;