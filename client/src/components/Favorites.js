import React from 'react';
import { Table } from "react-bootstrap";
import DeleteButton from './DeleteButton';

const Favorites = (props) => {

    const { favorites, removeFromDom } = props;

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
                                    <td>{index + 1}</td>
                                    <td>
                                        <a className="crypto-links" href="http://localhost:3000/home"><img alt="crypto icon" className="token-icon" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} />{ crypto.name }</a>
                                    </td>
                                    <td>${ crypto.quote.USD.price.toLocaleString() }</td>
                                    <td>{ crypto.quote.USD.percent_change_24h.toLocaleString() }%</td>
                                    <td>${ crypto.quote.USD.market_cap.toLocaleString() }</td>
                                    <td>{ crypto.circulating_supply.toLocaleString() }</td>
                                    <td><DeleteButton deleteCallBack={()=>removeFromDom(crypto.symbol)}/></td>
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