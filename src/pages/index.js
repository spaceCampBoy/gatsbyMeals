import React from "react"
import { Link } from "gatsby"
import Select from "react-select"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Estimation from "../components/estimationResult"
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from '../components/loader'

export default class IndexPage extends React.Component {
  state = {
    bedrooms: "",
    address: "",
    propertyType: "",
    bathrooms: "",
    squareFootage: "",
    estimation: undefined,
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
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "4",
      bathrooms: "2",
      propertyType: this.getPropertyTypeOptions()[1],
      squareFootage: "1600",
    })
  }
  testParam2 = () => {
    this.setState({
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "1",
      bathrooms: "1",
      propertyType: this.getPropertyTypeOptions()[2],
      squareFootage: "500",
    })
  }
  testParam3 = () => {
    this.setState({
      address: "5500 Grand Lake Drive, San Antonio, TX",
      bedrooms: "2",
      bathrooms: "1",
      propertyType: this.getPropertyTypeOptions()[3],
      squareFootage: "800",
    })
  }

  callEstimationAPI() {
    const axios = require("axios")
    trackPromise(
    axios({
      method: "GET",
      url: "https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "realtymole-rental-estimate-v1.p.rapidapi.com",
        "x-rapidapi-key": "d89a021ae8mshd258915b90d60fbp1953b2jsn966ad69b41a7",
        useQueryString: true,
      },
      params: {
        address: this.state.address,
        bedrooms: this.state.bedrooms,
        bathrooms: this.state.bathrooms,
        propertyType: this.state.propertyType.value,
        squareFootage: this.state.squareFootage,
      },
    })
      .then(response => {
        if(response.data)
        {
          if(typeof response.data == "string" &&
             response.data.include('Error'))
             {
              alert(`An Error Occured. Could be that you didn't provide any search parameters! `)
             }
             else
             {
               this.setState({ estimation: response.data })
               setTimeout(() => {
                document.getElementById("estimation").scrollIntoView()
              }, 800)
             }
        }
      })
      .catch(error => {
        console.log(error)
      }))
  }

  estimationResult = () => {
    if (this.state.estimation) {
      return <Estimation data={this.state.estimation} />
    }
    return ""
  }

  render() {
    return (
      <Layout>
        <LoadingIndicator/>
        <SEO title="Home" />
        <div className="container mb-5">
          <h3 className="display-6 text-center">
            Get your rent estimation today!
          </h3>
          <p className="text-center">
            Note: You must provide an address in USA. The property address must be in the format of Street Address, City, State.
            you can try out some of the test cases. Choose one and hit Estimate Rent.
          </p>
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
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Property Address"
              className="form-control"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="row justify-content-center form-group">
            <div className="col-md-3">
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
            <div className="col-md-3">
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                className="form-control"
                value={this.state.bedrooms}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                className="form-control"
                value={this.state.bathrooms}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-3">
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

          <div className="row">
            <button
              onClick={this.estimateRent}
              className="btn btn-primary btn-block"
            >
              Estimate Rent
            </button>
          </div>
        </div>
        <hr></hr>
        <div id="estimation">{this.estimationResult()}</div>
      </Layout>
    )
  }
}
