import React from 'react'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const DeleteButton = (props) => {

    const { deleteCallBack, symbol } = props

    return (
        <div>
            <Tippy content={'Delete favorite'}>
                <button id={`${symbol}`} onClick={deleteCallBack}><BsSuitHeartFill /></button>
            </Tippy>
        </div>
    )
}

export default DeleteButton