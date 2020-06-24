import React from 'react';
import Nav from './Navbar'
import ComingSoon from "react-coming-soon";

import './style.css'
function About(){

        return (
            <div>
                <Nav></Nav>
                <br/>

                <ComingSoon title="Coming Soon" bgColor="#fff" textColor="#212121" date="Tue Jul 28 2020 00:00:00 GMT-0700 (Pacific Daylight Time)" illustration="react" />
            </div>
        );



}
export default About;


