import React, {useEffect} from 'react';
import { Table } from "react-bootstrap";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import PickFavorite from './PickFavorite';

const Favorites = (props) => {

    const { favorites, setFavorites, listTop15, userEmail } = props; //ADD SYMBOLS ARRAY from HOME to props here.

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
                        {/* {
                        favorites.map((crypto, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a className="crypto-links" href="#"><img className="token-icon" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} />{ crypto.name }</a>
                                    </td>
                                    <td>${ crypto.quote.USD.price.toLocaleString() }</td>
                                    <td>{ crypto.quote.USD.percent_change_24h.toLocaleString() }%</td>
                                    <td>${ crypto.quote.USD.market_cap.toLocaleString() }</td>
                                    <td>{ crypto.circulating_supply.toLocaleString() }</td>
                                    <td>
                                        <PickFavorite
                                            symbol={crypto.symbol}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                        />
                                    </td>
                                    <td>DetailBtn</td>
                                </tr>
                            )})
                        } */}
                    </tbody>
                </Table>
        </div>
    )
}

export default Favorites;