import React from 'react'
import { NavLink } from 'react-router-dom';

function NotFound() {
    return (
        <>
         <div className="fonttt" style={{textAlign:"center"}}>
            <h1>Opps!!! Page Not Found</h1>
            <h3> Please redirect to <NavLink to ="/" style={{color:"blue"}}>Home</NavLink> Page</h3>
         </div>

        </>
    )
}
export default NotFound;
