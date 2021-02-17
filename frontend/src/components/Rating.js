// rafce + tab
import React from 'react';

const Rating = ( { value, text } ) => {
    return (
        <div className='rating'>
            <span>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </span>
        </div>
    )
}

export default Rating;
