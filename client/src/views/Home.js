import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top15 from '../components/Top15';
import Favorites from '../components/Favorites';
import Header from '../components/Header';

const Home = () => {

    const [ listTop15, setListTop15 ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ searchCrypto, setSearchCrypto ] = useState('')
    const [ num, setNum ] = useState(0);

    useEffect(()=>{
        const Lists = async () => {
            try {
                const loggedInUser = await axios.get("http://localhost:8000/api/users", { withCredentials: true }); // GET logged in user.
                const list = await axios.get(`http://localhost:8000/api/list/`, { withCredentials: true });  // GET need to put a limit of 50 here.
                const userFavs = await axios.get(`http://localhost:8000/api/favoritesbyuser/${loggedInUser.data.emailAddress}`, { withCredentials: true }); //GET need to build this API which looks to the database and builds this list upon a registered user's favorites.
                // setUserEmail(loggedInUser.data.emailAddress);
                setListTop15(list.data);

                const findSymbol = (targetSymbol) => list.data.filter(crypto => crypto.symbol === targetSymbol);

                let arrHolder = [];
                for (let i = 0; i < list.data.length; i++) {
                    // console.log(userFavs.data[i].symbol)
                    arrHolder.push(findSymbol(userFavs.data[i].symbol)[0]);
                    setFavorites(arrHolder);
                }
            } catch (error) {
                console.log(error);
            }
        }
        Lists();
    },[num]); // '[]' means to just run the useEffect once, 'num' is incremented to trigger re-render.

    const removeFromDom = (favorite) => {
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
            <Header 
                setSearchCrypto={setSearchCrypto}
            />
            <Favorites 
                listTop15={listTop15}
                favorites={favorites}
                setFavorites={setFavorites}
                removeFromDom={removeFromDom}
            />
            <Top15 
                listTop15={listTop15}
                favorites={favorites}
                setFavorites={setFavorites}
                searchCrypto={searchCrypto}
                setSearchCrypto={setSearchCrypto}
            />
        </div>
    )
}

export default Home;