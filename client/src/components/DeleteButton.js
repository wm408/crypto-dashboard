import React from 'react'
import { BsSuitHeartFill } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const DeleteButton = (props) => {

    const { deleteCallBack, symbol, detailPage } = props

    const livePage = () => {
        if (detailPage === true){
            return <button className="details-unpick-button" onClick={deleteCallBack}>Unpick</button>
        } else {
            return <button id={`${symbol}`} onClick={deleteCallBack}><BsSuitHeartFill className="fav-svg" /></button>
        }
    }

    return (
        <div>
            <Tippy content={'Delete favorite'}>
                {livePage()}
            </Tippy>
        </div>
    )
}

export default DeleteButton