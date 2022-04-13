import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    // this will force the sending of the credentials / cookies so they can be updated
                    //    XMLHttpRequest from a different domain cannot set cookie values for their own domain
                    //    unless withCredentials is set to true before making the request
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                // Another way to send our userId forward without more advanced state manage is via local storage!
                //Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
                // localStorage will allow us to store this current user's id in storage. This way, we can use it on a button for the current user to get to their profile page.
                // localStorage.setItem("userId", res.data.userId);
                // Utilizing navigate's second arrgument to pass our userId forward
                //Documentation: https://reach.tech/router/api/navigate
                navigate("/home");
                // navigate("/home")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className="">
            <Form className="logreg" onSubmit={login}>
                <h1>Crypto Dashboard</h1>
                <h2 className="margin-top">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="center">
                    <Button variant="primary" type="submit">Sign In</Button>
                </div>
                <p className="error-text margin-top">{errorMessage ? errorMessage : ""}</p>
                <Link className="margin-top" to='/register'>Register</Link>
            </Form>
        </div>
    );
};


export default Login