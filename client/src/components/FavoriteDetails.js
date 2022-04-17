import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import Header from './Header';
import DeleteButton from './DeleteButton';
import Iframe from 'react-iframe'

const FavoriteDetails = (props) =>{

    const { symbol, iconid } = useParams();
    const [ fstate, setFState ] = useState({});
    const [ notes, setNotes ] = useState('');
    const [ errors, setErrors ] = useState({});
    const [ noteUpdateMessage, setNoteUpdateMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const queryFavorite = async () => {
            try {
                // const loggedInUser = await axios.get('http://localhost:8000/api/users', { withCredentials: true }); // GET logged in user.
                const getNote = await axios.get(`http://localhost:8000/api/favorites/${symbol}`, { withCredentials: true });
                const getOneFavorite = await axios.post(`http://localhost:8000/api/list/quote/${symbol}`, { withCredentials: true });
                setNotes(getNote.data.notes);
                setFState(getOneFavorite.data.data[symbol][0]);

            } catch (error) {
                console.log(error);
            }
        }
        queryFavorite();
    }, [symbol])

    const removeFromDom = (favoriteSymbol) => {
        axios.delete(`http://localhost:8000/api/favorites/${favoriteSymbol}`, { withCredentials: true })
            .then((res)=>{
                console.log(res.data);
                navigate('/home');
            })
            .catch((err)=>console.log(err))
    }

    const updateNote = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/favorites/${symbol}`, {
            notes,
        })
            .then((res)=>{
                setNoteUpdateMessage("Notes saved...");
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <div>
                <Header 
                    pageHeading={'Crypto Detail'}
                />
                <div className="sub-heading">
                    <div className="col-3rd">
                        <a className="crypto-links detail-link-size detail-crypto-left" href='http://localhost:3000/home'><img alt="crypto icon" className="detail-token-icon" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${iconid}.png`} />{fstate.name}  <span className="tick">{fstate.symbol}</span></a>
                    </div>
                    <div className="col-3rd">
                        <p className="details-price-style">Price in USD $</p>
                        <p className="details-price-value">${fstate?.quote?.USD?.price?.toLocaleString()}</p>
                    </div>
                    <div className="col-3rd">
                        <DeleteButton 
                            detailPage={true}
                            deleteCallBack={()=>removeFromDom(fstate.symbol)}
                        />
                    </div>
                </div>
                <div className="details-container">
                    <div>
                        <h3>90 Day ROI Look</h3>
                        <Iframe url="http://localhost:8000/chart"
                            width="800px"
                            height="500px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                        />
                    </div>
                    <div>
                        <form onSubmit={updateNote}>
                            <p className="paragraph">
                            <label className="details-notes-label">Notes</label><br/>
                            <textarea type="text" id="details-textarea-notes" onChange={(e)=>setNotes(e.target.value)} value={notes}/>
                            {
                                errors.notes?
                                <span>{errors.notes.message}</span>
                                :null
                            }
                            </p>
                            {/* <button onClick={(e)=>navigate('/home')}>Update</button> */}
                            <input type="submit" className="details-update-button" value="Save note"/>
                            {noteUpdateMessage ? <h4 className="details-update-message">{noteUpdateMessage}</h4> : null}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoriteDetails;