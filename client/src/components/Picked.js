import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const Picked = (props) => {

    const { setFavorites } = props;

    return(
        <div>
            <button><BsSuitHeart /></button>
        </div>
    )
}

export default Picked;