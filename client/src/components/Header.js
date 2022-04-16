import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate();
    const logout = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout", {

        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            localStorage.clear()
            navigate('/')
        })
        .catch(err => {
            console.log(err);
            
        });
    };

    return(
        <div>
            <div>
                <h1 className="margin-top">Crypto Dashboard</h1>
            </div>
            <div className="">
                <button className="btn btn-sm btn-outline-secondary" onClick={(e) => logout(e)}> Logout</button>
            </div>
        </div>
        
    )
}

export default Header;