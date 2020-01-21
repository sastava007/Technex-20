import InfiniteCarousel from "react-leaf-carousel";
import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Carousel, Icon, Card } from "antd";
// import http from "./httpService";
import Slider from "react-slick";

class OsVehicles extends Component {
  state = { vehicles: [3] };

  updateVehicles = carNum => {
    let newVehicles = [carNum, ...this.state.vehicles];
    // console.log(newVehicles)
    this.setState({
      vehicles: newVehicles
    });
    console.log(this.state.vehicles);
  };

  componentDidMount() {
    try {
      setInterval(async () => {
        console.log("Cron Job");
        //   const image = await axios.get("http://localhost:3001/getImages", {
        //       headers: {
        //           'Access-Control-Allow-Origin': '*',
        //       }});
        let response = await axios.get("http://localhost:3001/getImages");
        console.log(response.data);
        if (response.status !== 204) {
          let newVehicles = [response.data, ...this.state.vehicles];
          console.log(newVehicles)
          this.setState({
            vehicles: newVehicles
          });
        } else console.log("Empty Response");
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    let p = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 10,
      autoscroll: true,
      autoplaySpeed: 2000,
     
    };
    let vehicles=this.state.vehicles.slice(0,3);
    return (
      <Row>
        <div style={{  }}>
          <h3 style={{ color: "white" }}>Overspeeding Vehicles: </h3>
          <br />
          <div style={{}}>
            <Row>

              {vehicles.map( (vehicle,i) => {
                
                return (
                  <div key={i} >
                    <img src={"../images/" + String(vehicle) + "car.jpg"} style={{width: 200, height:"auto"}}></img>
                  </div>
                );
              })}
            </Row>
          </div>
        </div>
      </Row>
    );
  }
}

export default OsVehicles;
