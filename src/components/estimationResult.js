import React from "react"
import Listing from "./listing"

const Estimation = ({ data }) => (
    <div>
 <h3 className="display-4 text-center">Estimated Rent: {data.rent} $</h3>
 <h4 className="text-center">Rent Range High: {data.rentRangeLow} $</h4>
 <h4 className="text-center">Rent Range Low: {data.rentRangeHigh} $</h4>
 <hr></hr>
 <h3 className="display-5 text-center">Similar Housings</h3>
    <ShowListings {...data.listings}/>
 </div>
)

const ShowListings = (listings) => {
    if(listings){
    return <div className='listings w-100 mx-auto'>
      {Object.keys(listings).map(key => 
        <Listing key={listings[key].id} data={listings[key]} />
      )}
    </div>
    }
    return '';
}

Estimation.defaultProps = {
  data: undefined,
}

export default Estimation
