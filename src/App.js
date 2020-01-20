import React from "react";
import "./App.css";
import Navbar from "./components/navBar";
import OsVehicles from "./components/OsVehicles";
import Overspeed from "./components/overspeed";
import { Row, Col } from "antd";
import Strip from './components/strip';
function App() {
  return (
    <div className="App">
      <Row>
        <Strip></Strip>
      </Row>
      <Row type="flex" justify="center">
        <Col md={6}>
          <Navbar></Navbar>
        </Col>
        <Col md={18}>
          <Overspeed></Overspeed>
        </Col>
      </Row>
    </div>
  );
}

export default App;
