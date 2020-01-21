import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navBar";
import OsVehicles from "./components/OsVehicles";
import Overspeed from "./components/overspeed";
import { Row, Col } from "antd";
import Strip from "./components/strip";
import Density from "./components/density";
import axios from "axios";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Strip></Strip>
        </Row>
        <Row type="flex" justify="center">
          <Col md={6}>
            <Row>
              <Navbar></Navbar>
            </Row>
            <Row>
              <OsVehicles></OsVehicles>
            </Row>
          </Col>
          <Col md={18}>
            <Row>
              <Overspeed></Overspeed>
            </Row>
            <Row style={{ marginTop: "100px" }}>
              <Density></Density>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
