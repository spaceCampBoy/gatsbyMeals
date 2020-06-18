import React, { createRef } from "react"
import Select from "react-select"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Estimation from "../components/estimationResult"
import { trackPromise } from "react-promise-tracker"
import LoadingIndicator from "../components/loader"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
export default class IndexPage extends React.Component {
  state = {
    bedrooms: "",
    address: "",
    propertyType: "",
    bathrooms: "",
    squareFootage: "",
    longitude: "",
    latitude: "",
    estimation: undefined,
    hasLocation: false,
    latlng: {
      lat: 38.530,
      lng: -96.826,
    },
  }

  getPropertyTypeOptions = () => [
    { value: "Apartment", label: "Apartment" },
    { value: "Single Family", label: "Single Family" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Condo", label: "Condo" },
    { value: "Duplex-Triplex", label: "Duplex-Triplex" },
  ]

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  estimateRent = () => {
    this.callEstimationAPI()
  }

  testParam1 = () => {
    this.setState({
      latitude: '',
      longitude: '',
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "4",
      bathrooms: "2",
      propertyType: this.getPropertyTypeOptions()[1],
      squareFootage: "1600",
    })
  }
  testParam2 = () => {
    this.setState({
      latitude: '',
      longitude: '',
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "1",
      bathrooms: "1",
      propertyType: this.getPropertyTypeOptions()[2],
      squareFootage: "500",
    })
  }
  testParam3 = () => {
    this.setState({
      latitude: '',
      longitude: '',
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "2",
      bathrooms: "1",
      propertyType: this.getPropertyTypeOptions()[3],
      squareFootage: "800",
    })
  }

  callEstimationAPI() {
    let options = {
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
      propertyType: this.state.propertyType.value,
      squareFootage: this.state.squareFootage,
    }

    if (this.state.address) {
      options.address = this.state.address
    } else if(this.state.longitude && this.state.latitude) {
      options.longitude = this.state.longitude
      options.latitude = this.state.latitude
    }
    else
    {
      alert(
        `Please provide address or coordinates.`
      )
      return;
    }

    const axios = require("axios")
    trackPromise(
      axios({
        method: "GET",
        url: "https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "realtymole-rental-estimate-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "d89a021ae8mshd258915b90d60fbp1953b2jsn966ad69b41a7",
          useQueryString: true,
        },
        params: options,
      })
        .then(response => {
          if (response.data) {
            if (typeof response.data == "string") {
              if (response.data.includes("Error")) {
                alert(
                  `An Error Occured. Could be that you didn't provide any search parameters, or we couldn't find your address`
                )
              }
              if (response.data.includes("Could not find sufficient")) {
                alert(`Sorry, not enough data for estemation on that area`)
              }
            } else {
              this.setState({ estimation: response.data })
              setTimeout(() => {
                document.getElementById("estimation").scrollIntoView()
              }, 800)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    )
  }

  estimationResult = () => {
    if (this.state.estimation) {
      return <Estimation data={this.state.estimation} />
    }
    return ""
  }

  mapRef = createRef()

  handleMapClick = e => {
    this.setState({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      address: ''
    })

    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  }

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null
    return (
        <LoadingIndicator>
      <Layout>
        <SEO title="Home" />
        <div className="container mb-5">
          <h3 className="display-6 text-center">
            Get your rent estimation today!
          </h3>
          <div className="row">
            <div className="col-md-6">
              <div className="row justify-content-center">
                <Map
                  center={this.state.latlng}
                  id="mapid"
                  length={4}
                  onClick={this.handleMapClick}
                  onLocationfound={this.handleLocationFound}
                  ref={this.mapRef}
                  zoom={4}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {marker}
                </Map>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-2">
                <div className="col-md-4 mb-1">
                  <button
                    onClick={this.testParam1}
                    className="btn btn-success btn-block"
                  >
                    Test 1
                  </button>
                </div>
                <div className="col-md-4 mb-1">
                  <button
                    onClick={this.testParam2}
                    className="btn btn-info btn-block"
                  >
                    Test 2
                  </button>
                </div>
                <div className="col-md-4 mb-1">
                  <button
                    onClick={this.testParam3}
                    className="btn btn-dark btn-block"
                  >
                    Test 3
                  </button>
                </div>
              </div>
              <hr></hr>
              <p className="text-center">
                Select coordinates from the map or insert manually.
              </p>
              <div className="row justify-content-center form-group">
                <div className="col-md-6">
                  <input
                    type="number"
                    name="longitude"
                    placeholder="Longitude"
                    className="form-control"
                    value={this.state.longitude}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    name="latitude"
                    placeholder="Latitude"
                    className="form-control"
                    value={this.state.latitude}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <p className="text-center">
                Or enter address
              </p>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Property Address: Street Address, City, State"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
              </div>

              <hr></hr>
              <p className="text-center">
                Optional parameters
              </p>
              <div className="row justify-content-center form-group">
                <div className="col-md-6">
                  <Select
                    placeholder="Select Type"
                    value={this.state.propertyType}
                    onChange={type =>
                      this.handleInputChange({
                        target: { value: type, name: "propertyType" },
                      })
                    }
                    options={this.getPropertyTypeOptions()}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    name="squareFootage"
                    placeholder="Square Footage"
                    className="form-control"
                    value={this.state.squareFootage}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="row justify-content-center form-group">
                <div className="col-md-6">
                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    className="form-control"
                    value={this.state.bedrooms}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="form-control"
                    value={this.state.bathrooms}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <button
                  onClick={this.estimateRent}
                  className="btn btn-primary btn-block"
                >
                  Estimate Rent
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div id="estimation">{this.estimationResult()}</div>
      </Layout></LoadingIndicator>
    )
  }
}
