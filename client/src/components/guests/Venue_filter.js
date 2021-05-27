import React from 'react'

const Venue_filter =() => {
    return (
        <>
            <div className="container">
            <div className="row">
            <div className="col-6">
            <form>
                 <label for="fname">Search by name:</label><br />
                 <input type="text" id="fname" name="fname" /><br />
            </form>

            </div>
            <div className="col-6">
            <form>
                 <label for="price_label">Search by price:</label><br />
                 <input type="text" id="price_id" name="price_name" /><br />
            </form>

            </div>    
            </div>

            </div>
        </>
    )
}

export default Venue_filter
