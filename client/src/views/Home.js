import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top50 from '../components/Top50';
import Favorites from '../components/Favorites';
import Header from '../components/Header';

const Home = () => {

    const [ listTop50, setListTop50 ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ searchCrypto, setSearchCrypto ] = useState('')
    const [ num, setNum ] = useState(0);
    // const [ favoriteId, setFavoriteId ] = useState('');

    useEffect(()=>{
        const Lists = async () => {
            try {
                const loggedInUser = await axios.get("http://localhost:8000/api/users", { withCredentials: true }); // GET logged in user.
                const list = await axios.get(`http://localhost:8000/api/list/`, { withCredentials: true });  // GET need to put a limit of 50 here.
                const userFavs = await axios.get(`http://localhost:8000/api/favoritesbyuser/${loggedInUser.data.emailAddress}`, { withCredentials: true }); //GET need to build this API which looks to the database and builds this list upon a registered user's favorites.
                // setUserEmail(loggedInUser.data.emailAddress);
                setListTop50(list.data);

                const findSymbol = (targetSymbol) => list.data.filter(crypto => crypto.symbol === targetSymbol);
                const findFavoriteInState = (targetFavorite) => userFavs.data.filter(crypto => crypto.symbol === targetFavorite);

                let arrHolder = [];
                for (let i = 0; i < list.data.length; i++) {
                    // console.log(userFavs.data[i].symbol)
                    arrHolder.push(findSymbol(userFavs.data[i].symbol)[0]);
                    setFavorites(arrHolder);
                }
                console.log(findFavoriteInState(userFavs.data.symbol));
            } catch (error) {
                console.log(error);
            }
        }
        Lists();
    },[num]); // '[]' means to just run the useEffect once, 'num' is incremented to trigger re-render.

    const removeFromDom = (favoriteSymbol) => {
        axios.delete(`http://localhost:8000/api/favorites/${favoriteSymbol}`, { withCredentials: true })
            .then((res)=>{
                setFavorites(favorites.filter((favz, index)=>favz._id !== favoriteSymbol))
                setNum(num+1);
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div>
            <Header 
                setSearchCrypto={setSearchCrypto}
                pageHeading={'Crypto Dashboard'}
                listTop50={listTop50}
            />
            <Favorites 
                listTop50={listTop50}
                favorites={favorites}
                setFavorites={setFavorites}
                removeFromDom={removeFromDom}
            />
            <Top50 
                listTop50={listTop50}
                favorites={favorites}
                setFavorites={setFavorites}
                searchCrypto={searchCrypto}
                setSearchCrypto={setSearchCrypto}
            />
        </div>
    )
}

export default Home;