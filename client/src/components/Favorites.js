import React, {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import DeleteFavorite from './DeleteFavorite';
import DeleteButton from './DeleteButton';

const Favorites = (props) => {

    const { favorites, setFavorites, listTop15, removeFromDom } = props; //ADD SYMBOLS ARRAY from HOME to props here.
    // const [ loaded, setLoaded ] = useState(false);

    return(
        <div className="margin-top">
            <h2 id="top15-heading">Favorites</h2>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cryptocurrency</th>
                            <th>Price USD $</th>
                            <th>24h Change %</th>
                            <th>Market Cap</th>
                            <th>Circulating Supply</th>
                            <th>Favorites</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody id="middle">
                        {
                        favorites.map((crypto, index)=>{ // ? if favorites, go ahead and map through
                            return (
                                <tr key={crypto.symbol}>
                                    <td>1</td>
                                    <td>
                                        <a className="crypto-links"><img className="token-icon" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} />{ crypto.name }</a>
                                    </td>
                                    <td>${ crypto.quote.USD.price.toLocaleString() }</td>
                                    <td>{ crypto.quote.USD.percent_change_24h.toLocaleString() }%</td>
                                    <td>${ crypto.quote.USD.market_cap.toLocaleString() }</td>
                                    <td>{ crypto.circulating_supply.toLocaleString() }</td>
                                    <td>
                                        {/* <DeleteFavorite
                                            symbol={crypto.symbol}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                        /> */}
                                        <DeleteButton deleteCallBack={()=>removeFromDom(crypto.symbol)}/>
                                    </td>
                                    <td>DetailBtn</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </Table>
        </div>
    )
}

export default Favorites;