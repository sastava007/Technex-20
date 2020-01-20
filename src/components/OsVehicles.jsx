import InfiniteCarousel from "react-leaf-carousel";
import React, { Component } from "react";
import axios from "axios";
// import http from "./httpService";

class OsVehicles extends Component {
  state = {
    vehicles: [],
    products: [
      {
        id: 1,
        title: "shopping Bag",
        price: 300,
        img:
          "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
      },
      {
        id: 2,
        title: "school Bag",
        price: 200,
        img:
          "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
      },
      {
        id: 3,
        title: "carry Bag",
        price: 400,
        img:
          "http://assets.myntassets.com/assets/images/7578935/2018/10/23/d7b740bc-e00e-4bec-97aa-65016f8ff2e71540289479612-Harpa-Women-Dresses-2331540289479465-1.jpg"
      },
      {
        id: 4,
        title: "book Bag",
        price: 340,
        img:
          "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
      },
      {
        id: 4,
        title: "book Bag",
        price: 340,
        img:
          "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
      },
      {
        id: 4,
        title: "book Bag",
        price: 340,
        img: "#"
      },
      {
        id: 4,
        title: "book Bag",
        price: 340,
        img:
          "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
      }
    ]
  };

  async componentDidMount() {
    try {
      setInterval(async () => {
          console.log("Cron Job")
        //   const image = await axios.get("http://localhost:3001/getImages", {
        //       headers: {
        //           'Access-Control-Allow-Origin': '*',
        //       }});
          let image = await fetch('http://localhost:3001/getImages', {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          });
        // const blocks = await res.json();
        console.log(image)
        this.setState({
          ...this.state.vehicles,
          image
        });
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  }

  handleProductClick = product => {
    console.log(product);
    alert("You clicked : " + product.title);
  };
  render() {
    return (
      <>
        <h4>You May Also Like: </h4>
        <br />
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]}
          dots={false}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={1}
          slidesToShow={4}
          scrollOnDevice={true}
          slidesSpacing={20}
        >
          {this.state.vehicles.map((i, vehicle) => {
            return (
              <div key={i}>
                <div style={{ height: 200, background: "#333" }} />
                <p>
                  <strong>Vehicle: </strong>
                </p>
                <img src={vehicle}></img>
              </div>
            );
          })}
        </InfiniteCarousel>
      </>
    );
  }
}
export default OsVehicles;
