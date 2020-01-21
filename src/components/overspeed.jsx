import React, { Component } from 'react';
import { Card, Container, Layout} from 'antd'
import OsVehicles from './OsVehicles';
const image ="https://media.gettyimages.com/photos/cars-in-rush-hour-with-traffic-at-dawn-picture-id155287967?s=612x612"
const IP="192.168.0.158"
const { Content } =Layout;


class Overspeed extends Component {
    state = {  }
    render() { 
        return ( <>
            <Content>
                <h1 style={{color:"white"}}>Live Traffic Feed...</h1>
                <Card title="Live Traffic Feed"  style={{ width: "90%"}}>
                    <img src={`http://${IP}:3001/overspeed`} style={{width: '100%', height: 'auto'}} ></img>
                </Card>
                
            </Content>
        </> );
    }
}
 
export default Overspeed;