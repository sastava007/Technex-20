import React, { Component } from "react";
import { Row, Col, Layout, Card } from "antd";
import Map from "./map";
const IP="192.168.0.158"
const { Content } = Layout;
class Density extends Component {
  state = {};
  render() {
    return (
      <>
      <h1 style={{color:"white"}}>Dynamic Traffic Signal System: </h1>
        <Row style={{ margin: "30px 30px 30px 30px", width: "90%" }}>
            <Col md={4}></Col>
          <Col md={10}>
            <Content>
              <Card title="Traffic Density Signal-1" style={{ width: "90%" }}>
                <img
                                src={`http://${IP}:3002/traffic_density` ? `http://${IP}:3002/overspeed`: "https://previews.123rf.com/images/happyvector071/happyvector0711904/happyvector071190414867/121106196-creative-illustration-of-no-signal-tv-test-pattern-background-television-screen-error-smpte-color-ba.jpg"}
                  style={{ width: "100%", height: "auto" }}
                ></img>
              </Card>
            </Content>
          </Col>
          <Col md={10}>
            <Content>
              <Card title="Traffic Density signal-2" style={{ width: "90%" }}>
                <img
                  src={
                    "https://previews.123rf.com/images/happyvector071/happyvector0711904/happyvector071190414867/121106196-creative-illustration-of-no-signal-tv-test-pattern-background-television-screen-error-smpte-color-ba.jpg"
                  }
                  style={{ width: "100%", height: "auto" }}
                ></img>
              </Card>
            </Content>
          </Col>
        </Row>
        <Row></Row>
      </>
    );
  }
}

export default Density;
