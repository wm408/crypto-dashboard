import React from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const AddFavorite = (props) => {

    const { favorites, setFavorites, symbol  } = props;
    const addToFavorites = async (e) => {
        e.preventDefault()
        try {
            const newFavorite = await axios.get(`http://localhost:8000/api/list/getone?symbol=${e.currentTarget.id}`, { withCredentials: true })
            console.log(newFavorite.data.data)
            console.log(newFavorite.data.data[e.target.id])
            await axios.post('http://localhost:8000/api/favorites', 
                {
                    favorite:true,
                    symbol: e.target.id,
                    notes:'Leave your notes here',
                }, { withCredentials: true });

            setFavorites([...favorites, newFavorite.data.data[e.target.id][0]]);

        } catch (err) {
            console.log(err.response.data.errors.symbol.message);
            // setErrors(err.response.data.errors.symbol);
        }
    }

    return(
        <div className="add-fav-icon">
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