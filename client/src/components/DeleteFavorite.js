import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteFavorite = (props) => {

    const { favorites, setFavorites, symbol } = props;
    const [ errors, setErrors ] = useState('');
    const navigate = useNavigate(); // add to delete button?

    const RemoveFromFavorites = async (e) => {
        // e.preventDefault()
        try {
            const loggedInUser = await axios.get("http://localhost:8000/api/users", { withCredentials: true }); // GET logged in user.
            const favs = await axios.get(`http://localhost:8000/api/favoritesbyuser/${loggedInUser.data.emailAddress}`, { withCredentials: true });
            // console.log(favs.data);
            
            /* Works */
            let arrHolder = [];
            // var filtered = favs.data.filter(function(el) { return el.symbol == symbol; });
            // arrHolder.push(filtered);
            // // console.log(arrHolder);

            const findSymbol = (targetSymbol) => favs.data.filter(crypto => crypto.symbol == targetSymbol);
            const findSymbol2 = (targetSymbol) => favs.data.filter(crypto => crypto.symbol !== targetSymbol);
            // console.log(findSymbol(symbol));

            let arrHolderRemove = [];
            let arrHolderAdd = [];
            arrHolderRemove = findSymbol(symbol);
            arrHolderAdd = findSymbol2(symbol);
            for (let i = 0; i < arrHolderRemove.length; i++) {
                await axios.delete(`http://localhost:8000/api/favorites/${arrHolderRemove[i]._id}`, { withCredentials: true })
                // setFavorites(arrHolder);
                // console.log(arrHolderRemove[i]._id);
                // console.log(arrHolder[i]);
                // setFavorites(arrHolderAdd);
                setFavorites(arrHolderAdd);
            }
            // navigate('/');

        } catch (err) {
            // console.log(err);
            // console.log("err.response:", err.response);
            // console.log("err.response.data:", err.response.data);
            console.log(err.response.data.errors.symbol.message);
            setErrors(err.response.data.errors.symbol);
        }
    }

    return(
        <div>
            <button id={`${symbol}`} onClick={RemoveFromFavorites}>
                <BsSuitHeartFill />
                {/* {
                    errors.addToFavorites?
                    <span className="error-msg">{alreadyExists}</span>
                    :null
                } */}
            </button>
        </div>
    )
}

export default DeleteFavorite;