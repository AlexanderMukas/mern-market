// rafce + tab
import React from 'react';

const Rating = ( { value, text, color } ) => {
    return (
        <div className='rating'>

            {/* 1 star */}
            <span>
                <i style={ {color} }
                    className={
                        value >= 1 ? "fas fa-star" : 
                            value>=0.5 ? "fas fa-star-half-alt" : "far fa-star"} >
                </i>
            </span>

            {/* 2 star */}
            <span>
                <i style={ {color} }
                    className={
                        value >= 2 ? "fas fa-star" : 
                            value>=1.5 ? "fas fa-star-half-alt" : "far fa-star"} >
                </i>
            </span>

            {/* 3 star */}
            <span>
                <i style={ {color} }
                    className={
                        value >= 3 ? "fas fa-star" : 
                            value>=2.5 ? "fas fa-star-half-alt" : "far fa-star"} >
                </i>
            </span>

            {/* 4 star */}
            <span>
                <i style={ {color} }
                    className={
                        value >= 4 ? "fas fa-star" : 
                            value>=3.5 ? "fas fa-star-half-alt" : "far fa-star"} >
                </i>
            </span>

            {/* 5 star */}
            <span>
                <i style={ {color} }
                    className={
                        value == 5 ? "fas fa-star" : 
                            value>=4.5 ? "fas fa-star-half-alt" : "far fa-star"} >
                </i>
            </span>
            
            <span>
                {/* {text ? text : ''} */}
                {text && text}
            </span>
 
        </div>
    )
}

export default Rating;
