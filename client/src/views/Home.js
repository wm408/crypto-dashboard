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

    useEffect(()=>{
        const Lists = async () => {
            try {
                const loggedInUser = await axios.get("http://localhost:8000/api/users", { withCredentials: true });
                const list = await axios.get(`http://localhost:8000/api/list/`, { withCredentials: true } );  // GET need to put a limit of 50 here. Can I choose top 50 only from API?, find out.
                const favs = await axios.get(`http://localhost:8000/api/favoritesbyuser/${loggedInUser.data.emailAddress}`, { withCredentials: true } ); //GET need to build this API which looks to the database and builds this list upon a registered user's favorites.
                setUserEmail(loggedInUser.data.emailAddress);
                setListTop15(list.data);
                
                const findSymbol1 = (targetSymbol) => listTop15.filter(crypto => crypto.symbol === targetSymbol)
                    // console.log(listTop15.filter(crypto => crypto.symbol === targetSymbol));

                if(listTop15){
                    console.log(listTop15);
                    for (let i = 0; i < favs.data.length-1; i++) {
                        console.log('hit for loop');
                        setFavorites([...favorites, findSymbol1(favs.data[i].symbol)]);
                        // setFavorites([...favorites, findSymbol2(favs.data[i].symbol, listTop15)]);
                    }
                } else {
                    console.log('something else');
                }
                // console.log(favs.data);
                
                // 
                // console.log(listTop15.filter(crypto => crypto.symbol === favs.data[0].symbol))
                // console.log(favs.data[0].symbol);
                // setLoaded(true);
                // console.log(loaded);
                // if (loaded){
                //     for (let i = 0; i < favs.data.length; i++){
                //         // console.log(listTop15.filter(crypto => crypto.symbol === favs.data[i].symbol));
                //         console.log(listTop15.find(crypto => crypto.symbol === favs.data[i].symbol))
                //     }
                // }
                
                // const findSymbol2 = (cryptoTicker, array) => {
                //     const res1 = array.find(ticker => ticker.symbol === cryptoTicker)
                //     return res1;
                // }
                
                // console.log(favs.data[4].symbol);
                // let searchFav = (cryptoTicker, array) => {
                //     //             for (var i=0; i < array.length; i++) {
                //     //                 if (array[i].symbol === cryptoTicker) {
                //     //                     return array[i]
                //     //                 }
                //     //             }
                //     //         }
                //     //         setFavorites([...favorites, searchFav('BTC', listTop15)]);
                // }
            } catch (error) {
                console.log(error);
            }
        }
        Lists();
    },[]); // '[]' means to just run the useEffect once.

    return(
        <div>
            <Header />
            <Favorites 
                listTop15={listTop15}
                favorites={favorites}
                // setFavorites={setFavorites}
                // userEmail={userEmail}
            />
            <Top15 
                listTop15={listTop15}
                favorites={favorites}
                setFavorites={setFavorites}
            />
        </div>
    )
}

export default Home;