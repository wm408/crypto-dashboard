import React from 'react'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const DeleteButton = (props) => {

    const { deleteCallBack, symbol } = props

    return (
        <div>
            <button id={`${symbol}`} onClick={deleteCallBack}><BsSuitHeartFill /></button>
        </div>
    )
}

export default DeleteButton