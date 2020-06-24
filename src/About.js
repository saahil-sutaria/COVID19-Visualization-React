import React from 'react';
import ComingSoon from "react-coming-soon";
import Nav from "./Navbar";
import {Card} from "react-bootstrap";

function News(){

    return (
        <div>


        <div >
            <Nav></Nav>
            <br/>
            <ComingSoon title="Coming Soon" bgColor="#fff" textColor="#212121" date="Tue Jul 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)" illustration="git" />

        </div>


        </div>
    );



}
export default News;


