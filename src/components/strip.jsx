import React, { Component } from "react";
import { Col, Row } from "antd";
const Strip = () => {
  return (
    <>
      <div
        style={{ width: "100%", height: "50px", backgroundColor: "#1890ff" }}
      >
        <Row>
          <Col md={12}>
            <h2
              style={{
                paddingLeft: "40px",
                fontFamily: "Bangers",
                fontSize: "40px",
                color: "white",
                textAlign: "left"
              }}
            >
              TC++
            </h2>
          </Col>
          <Col md={12}>
            {" "}
            <h2
              style={{
                paddingRight:"-40px",
                fontFamily: "Bangers",
                fontSize: "40px",
                color: "white",
                textAlign: "right",
                display: "inline"
              }}
            >
              Traffic Control++
            </h2>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Strip;
