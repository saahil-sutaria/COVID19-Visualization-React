import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Navbar';
import Alt from  "./Alert";
import Total from './tab';
import ParticlesBg from 'particles-bg'
import './style.css'
import Graphs from "./Charts";
import Doughnut from "./Doughnut";
import {Card} from "react-bootstrap";




export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            country:"Usa",
        };
        this.handelChange=this.handelChange.bind(this)
    }



    handelChange(val){
        this.setState({country: val})
    }

    render() {
        let margin=""
        let display="flex";
        let padding ="90px"
        if (window.innerWidth<1100){
            margin="auto";
            display="grid"
            padding="0px"
        }
        const{country} = this.state
        return (

            <div className="App" >
                <div id="part">
                    <ParticlesBg color={["#000000"]} type="cobweb" bg={true} num={[55]} v={[1, 2]} />
                </div>
                <Nav doCallback={this.handelChange}/>
                <br/>
                <Alt country={country}/>
                <div id="main" style={{display:display, paddingLeft:padding, margin:margin}}>
                    <div id="first" style={{margin:margin}}>
                        <Total  country={country} />
                        <br/>
                        <br/>
                        <div id="dou">
                            <Doughnut country={country}/>
                        </div>

                    </div>
                    <div id="second" style={{display:"flex", margin:margin}}>
                        <Graphs country={this.state.country}/>
                    </div>
                </div>

                <br/>
                <br/>
               <Card.Footer className="effect7 bg-dark text-white">
                   - by Sahil Sutaria
                   &nbsp;
                        <a href="https://www.linkedin.com/in/sahilsutaria/">
                            <img width="28px"  height="28px"   src="https://github.com/saahil-sutaria/WishlistReact/blob/master/public/git.png?raw=true"/>  </a>
                   &nbsp;
                   &nbsp;
                   <a href="https://github.com/saahil-sutaria/CoronaVirusTrackerReact/">
                    <img width="25px"  height="25px"  src="https://github.com/saahil-sutaria/WishlistReact/blob/master/public/linkedin.png?raw=true"/>
                   </a>
               </Card.Footer>
            </div>

        );
    }


}


