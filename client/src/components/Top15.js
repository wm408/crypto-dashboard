import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import AddFavorite from './AddFavorite';
import { Table } from "react-bootstrap";

const Top15 = (props) => {
    
    const { listTop15, favorites, setFavorites, searchCrypto, setSearchCrypto } = props;

    return(
        <div className="margin-top">
            <div className="top-crypto-list">
                <h2 id="top15-heading">Top 15 By Market Cap</h2>
                <input type="text" className="search-box" placeholder='Search crypto name or ticker' onChange={(e)=>{setSearchCrypto(e.target.value)}}/>
            </div>
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
                            listTop15.filter((val)=>{
                                if(searchCrypto === ''){
                                    return val
                                } else if (val.name.toLowerCase().includes(searchCrypto.toLowerCase()) || val.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
                                ){
                                    return val
                                }
                            })
                        .map((crypto, index)=>{
                            return (
                                <tr key={crypto.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a className="crypto-links" href="#"><img className="token-icon" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} />{ crypto.name }</a>
                                    </td>
                                    <td>${ crypto.quote.USD.price.toLocaleString() }</td>
                                    <td>{ crypto.quote.USD.percent_change_24h.toLocaleString() }%</td>
                                    <td>${ crypto.quote.USD.market_cap.toLocaleString() }</td>
                                    <td>{ crypto.circulating_supply.toLocaleString() }</td>
                                    <td>
                                        <AddFavorite
                                            symbol={crypto.symbol}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                        />
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

export default Top15;