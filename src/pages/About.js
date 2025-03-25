import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();
    return <div>About
        <button onClick={() => navigate(-1)} >Go back</button>
    </div>;
}

export default About;