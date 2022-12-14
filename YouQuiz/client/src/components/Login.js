import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "../styles/Globals.css"

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Form className="LoginPanel" onSubmit={loginSubmit}>
            <div>
                <img className="youImage"
                    alt="Sample"
                    src={"YouQuiz-1.png"} />
            </div>
            <fieldset>
                <FormGroup>
                    <Input
                        placeholder="Email"
                        id="email"
                        type="text"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        placeholder="Password"
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <button className="LoginButton">Sign In</button>
                </FormGroup>
                <em>
                    Not registered? <Link to="register">Register</Link>
                </em>
            </fieldset>
        </Form>
    );
}