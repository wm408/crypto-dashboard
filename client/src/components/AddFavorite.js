import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import axios from 'axios';

const AddFavorite = (props) => {

    const { favorites, setFavorites, symbol  } = props;
    const [ errors, setErrors ] = useState('');
    const [ loaded, setLoaded ] = useState(false);
    const addToFavorites = async (e) => {
        e.preventDefault()
        try {
            const newFavorite = await axios.get(`http://localhost:8000/api/list/getone?symbol=${e.currentTarget.id}`, { withCredentials: true })
            const postFavs = await axios.post('http://localhost:8000/api/favorites', 
            {
                favorite:true,
                symbol:symbol,
                notes:'Leave your notes here',
            }, { withCredentials: true });

            setFavorites([newFavorite.data.data.symbol, ...favorites]); // how to go into the e.currentTarget.id?
            // console.log(e.currentTarget.id);
            // console.log(newFavorite.data.data.symbol);
            // console.log(newFavorite.data.`${e.currentTarget.id}`)

        } catch (err) {
            // console.log(err);
            // console.log("err.response:", err.response);
            // console.log("err.response.data:", err.response.data);
            console.log(err.response.data.errors.symbol.message);
            setErrors(err.response.data.errors.symbol);
        }
    }

    const alreadyExists = () => {
        alert('already exists');
    }
    /* 
    Function to take the id (cmc id or symbol) value from the button, then,
    copy the particular cmc crypto from the Top15 state to the Favorites
    component and state, and then, also post to the favorites collection, 
    the favorite crypto.
    */
    return(
        <div>
            <button id={`${symbol}`} onClick={addToFavorites}>
                <BsSuitHeartFill />
                {
                    errors.addToFavorites?
                    <span className="error-msg">{alreadyExists}</span>
                    :null
                }
            </button>
        </div>
    )
}

export default AddFavorite;