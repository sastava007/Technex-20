import React, { Component } from 'react';
import { Card, Container, Layout} from 'antd'
import OsVehicles from './OsVehicles';
const image ="https://media.gettyimages.com/photos/cars-in-rush-hour-with-traffic-at-dawn-picture-id155287967?s=612x612"

const { Content } =Layout;


class Overspeed extends Component {
    state = {  }
    render() { 
        return ( <>
            <Content>
                <Card title="Live Traffic Feed"  style={{ width: "90%"}}>
                    <img src={"http://127.0.0.1:3001/overspeed"} style={{width: '100%', height: 'auto'}} ></img>
                </Card>
                <OsVehicles></OsVehicles>
            </Content>
        </> );
    }
}
 
export default Overspeed;