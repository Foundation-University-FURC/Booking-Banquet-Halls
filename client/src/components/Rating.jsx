import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Rating = ({value,text}) => {
  
    return (
   
         <div className = "rating">
            <span style={{color:"yellow"}}>
               <i className = { 
                    value >= 1 
                    ? "fas fa-star"
                    : value >= 0.5 
                    ? "fas fa-star-half-o" 
                    : "fas fa-star-o"
                    } 
                    ></i>
            </span>
            <span style={{color:"yellow"}}>
                <i className={
                   value >= 2 
                    ? "fas fa-star"
                    : value >=1.5 
                    ? "fas fa-star-half-o" 
                    : "fas fa-star-o"
                    } 
                    ></i>
            </span>
            <span style={{color:"yellow"}}>
                <i className={
                   value >= 3 
                    ? "fas fa-star"
                    : value >=2.5 
                    ? "fas fa-star-half-o" 
                    : "fas fa-star-o"
                    } 
                    ></i>
            </span>
            <span style={{color:"yellow"}}>
                <i className={
                  value >= 4 
                    ? "fas fa-star"
                    : value >=3.5 
                    ? "fas fa-star-half-o" 
                    : "fas fa-star-o"
                    } 
                    ></i>
            </span>
            <span style={{color:"yellow"}}>
                <i className={
                  value >= 5 
                    ? "fas fa-star"
                    : value >=4.5 
                    ? "fas fa-star-half-o" 
                    : "fas fa-star-o"
                    } 
                    ></i>
            </span>
            <span>
               &nbsp; {text && text}
            </span>
         </div>   
    )
}

export default Rating