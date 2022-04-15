// We will include Favorites.js and Top50.js here and send props down.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top15 from '../components/Top15';
import Favorites from '../components/Favorites';
import Header from '../components/Header';

const Home = () => {

    const [ listTop15, setListTop15 ] = useState([]); //confirm response.data.data is an array.
    const [ favorites, setFavorites ] = useState([]);
    const [ userEmail, setUserEmail ] = useState({});
    const [ loaded, setLoaded ] = useState(false);
    const [ userFavs, setUserFavs ] = useState([]);
    const [ num, setNum ] = useState(0);

    useEffect(()=>{
        const Lists = async () => {
            try {
                const loggedInUser = await axios.get("http://localhost:8000/api/users", { withCredentials: true }); // GET logged in user.
                const list = await axios.get(`http://localhost:8000/api/list/`, { withCredentials: true });  // GET need to put a limit of 50 here. Can I choose top 50 only from API?, find out.
                const favs = await axios.get(`http://localhost:8000/api/favoritesbyuser/${loggedInUser.data.emailAddress}`, { withCredentials: true }); //GET need to build this API which looks to the database and builds this list upon a registered user's favorites.
                setUserEmail(loggedInUser.data.emailAddress);
                setListTop15(list.data);

                const findSymbol = (targetSymbol) => list.data.filter(crypto => crypto.symbol === targetSymbol);

                let arrHolder = [];
                for (let i = 0; i < list.data.length; i++) {
                    arrHolder.push(findSymbol(favs.data[i].symbol)[0]);
                    setFavorites(arrHolder);
                }
                setLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }
        Lists();
    },[num]); // '[]' means to just run the useEffect once.

    const removeFromDom = (favorite) => {
        // const res1 = favs.data.filter(crypto => crypto.symbol == targetSymbol);
        axios.delete(`http://localhost:8000/api/favorites/${favorite}`, { withCredentials: true })
            .then((res)=>{
                console.log(res.data)
                setFavorites(favorites.filter((favz, index)=>favz._id !== favorite))
                setNum(num+1);
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div>
            <Header />
            <Favorites 
                listTop15={listTop15}
                favorites={favorites}
                setFavorites={setFavorites}
                removeFromDom={removeFromDom}
                // userEmail={userEmail}
            />
            <Top15 
                listTop15={listTop15}
                favorites={favorites}
                setFavorites={setFavorites}
                // setLoaded={setLoaded}
            />
        </div>
    )
}

export default Home;