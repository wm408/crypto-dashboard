import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const { pageHeading } = props;

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
        <div className="header-flex">
            <div className="col-3rd"></div>
            <div className="col-3rd">
                <h1 className="margin-top">{pageHeading}</h1>
            </div>
            <div className="col-3rd">
                <button className="btn btn-sm btn-outline-secondary btn-margin" onClick={(e) => logout(e)}> Logout</button>
            </div>
        </div>
        
    )
}

export default Header;