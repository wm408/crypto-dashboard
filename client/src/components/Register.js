import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const [user, setUser] = useState({ //using a single state object to hold all data!
        firstName: '',
        lastName: '',
        emailAddress: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    });

    // using a single function to update the state object
    // we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true //how we ensure this is handling jwtoken. Forces sending of credentials/cookies.
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    firstName: '',
                    lastName: '',
                    emailAddress: '',
                    confirmEmail: '',
                    password: '',
                    confirmPassword: '',
                });
                setConfirmReg(
                    "Thank you for Registering, you can now log in!",
                );
                setErrors({}); // remember to reset errors state if it was successful
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div>
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            <Form className="logreg" onSubmit={register}>
                <h1>Crypto Dashboard</h1>
                <h2 className="margin-top">Register</h2>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={user.firstName}
                        //long hand notation
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.firstName ? (
                        <span className="error-text">{errors.firstName.message}</span>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName ? (
                        <span className="error-text">{errors.lastName.message}</span>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailAddress">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="email"
                        name="emailAddress"
                        placeholder="Email address"
                        value={user.emailAddress}
                        onChange={handleChange}
                    />
                    {errors.emailAddress ? (
                        <span className="error-text">{errors.emailAddress.message}</span>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmEmail">
                <Form.Label></Form.Label>
                    <Form.Control
                        type="email"
                        name="confirmEmail"
                        placeholder="Confirm email"
                        value={user.confirmEmail}
                        onChange={handleChange}
                    />
                    {errors.confirmEmail ? (
                        <span className="error-text">{errors.confirmEmail.message}</span>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errors.password ? (
                        <span className="error-text">
                            {errors.password.message}
                        </span>
                    ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label></Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword ? (
                        <span className="error-text">
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                </Form.Group>
                <div className="center">
                    <Button className="margin-btm" variant="primary" type="submit">Register Now</Button>
                </div>
                <Link className="margin-top" to='/'>Login Home</Link>
            </Form>
        </div>
    )
}

export default Register;