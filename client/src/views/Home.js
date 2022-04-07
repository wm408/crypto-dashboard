// We will include Favorites.js and Top50.js here and send props down.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Favorites from '../components/Favorites';
import Top15 from '../components/Top15';
import Picked from '../components/Picked';
import Favorites from '../components/Favorites';

const Home = () => {

    const [ listTop15, setListTop15 ] = useState([]); //review that res.data is an object to set inititial state
    const [ favorites, setFavorites ] = useState([]); // review that this data source is an object to set inititial state

    useEffect(()=>{
        const Lists = async () => {
            try {
                const list = await axios.get(`http://localhost:8000/list/`);  // GET need to put a limit of 50 here. Can I choose top 50 only from API?, find out.
                // const favs = await axios.get(`http://localhost:8000/favorites`) //GET need to build this API which looks to the database and builds this list upon a registered user's favorites. 
                console.log(list.data);
                setListTop15(list.data);
                // console.log(favs.data);
                // setFavorites(favs.data);
            } catch (error) {
                console.log(error);
            }
        }
        Lists();
    },[]); // '[]' means to just run the useEffect once.

    return(
        <div>
            <Favorites 
                favorites={favorites}
                setFavorites={setFavorites}
            />
            <hr />
            <Top15 
                listTop15={listTop15}
            />
            <Picked 
                setFavorites={setFavorites}
            />
        </div>
    )
}

export default Home;