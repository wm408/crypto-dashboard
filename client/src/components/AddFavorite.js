import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const AddFavorite = (props) => {

    const { favorites, setFavorites, symbol  } = props;
    const [ errors, setErrors ] = useState('');
    const [ loaded, setLoaded ] = useState(false);
    const addToFavorites = async (e) => {
        e.preventDefault()
        try {
            const newFavorite = await axios.get(`http://localhost:8000/api/list/getone?symbol=${e.currentTarget.id}`, { withCredentials: true })
            console.log(newFavorite.data.data)
            console.log(newFavorite.data.data[e.target.id])
            const postFavs = await axios.post('http://localhost:8000/api/favorites', 
                {
                    favorite:true,
                    symbol: e.target.id,
                    notes:'Leave your notes here',
                }, { withCredentials: true });

            console.log(newFavorite.data.data)
            console.log(newFavorite.data.data[e.target.id][0])

            setFavorites([...favorites, newFavorite.data.data[e.target.id][0]]);
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

    /* 
    Function to take the id (cmc id or symbol) value from the button, then,
    copy the particular cmc crypto from the Top15 state to the Favorites
    component and state, and then, also post to the favorites collection, 
    the favorite crypto.
    */
    return(
        <div className="add-fav-icon">
            {/* Look up invisible inputs. Throw the input on top of the heart */}
            <Tippy content={'Add favorite'}>
                <label htmlFor={`${symbol}`}>
                    <BsSuitHeartFill />
                </label>
            </Tippy>
                <input type="submit" id={`${symbol}`} onClick={(e) => addToFavorites(e)}/>
        </div>
    )
}

export default AddFavorite;