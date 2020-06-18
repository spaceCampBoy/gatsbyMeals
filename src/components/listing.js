import React from "react"
import Image from "../components/image"

const Listing = ({ data }) => {
  const listingPhoto = getImg(data)
  return (
    <div className="card float-left" style={{ width: "18rem" }}>
      {listingPhoto}
      <div className="card-body">
        <h4 className="card-title">Rent: {data.price}</h4>
        <p className="card-text">Address: {data.formattedAddress}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Bedrooms: {data.bedrooms}</li>
        <li className="list-group-item">Bathrooms: {data.bathrooms}</li>
        <li className="list-group-item">Size: {data.squareFootage} ft<sup>2</sup></li>
        <li className="list-group-item">
          Distance: {data.distance.toFixed(2)}
        </li>
        <li className="list-group-item">
          Similarity: {data.correlation.toFixed(2) * 100} %
        </li>
      </ul>
    </div>
  )
}

const getImg = data => {
  if (data.photo) {
    return (
      <img
        src={data.photo}
        className="card-img-top"
        alt={data.formattedAddress}
      />
    )
  }
  return <Image />
}

Listing.defaultProps = {
  data: undefined,
}

export default Listing
