import React from 'react';
import {Nav, Navbar, Form, Button} from "react-bootstrap"
import './style.css'
import {Link} from "react-router-dom";

export default class NavBar extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            country:"",
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange=(event)=>{
        event.persist()
        this.setState({country: event.target.value})

    }
    onSubmit=()=>{
        const {doCallback} = this.props
        doCallback(this.state.country)

    }
    render() {
        let disp="";
        let margin="";
        let padding="40px"
        let font="27px"
        if (window.innerWidth<500){
            disp="none"
            margin="auto"
            padding="0px";
            font= "20px"
        }

        return(
            <div id="fuck" style={{width:"100%"}}>
                <Navbar collapseOnSelect expand="lg" bg="light" style={{width:"100%", margin:margin}} className="effect7 ">

                    <Navbar.Brand >
                        <img src="https://github.com/saahil-sutaria/WishlistReact/blob/master/public/COVIID.png?raw=true"
                             className="ml-5 "
                             alt="cannot load image"
                             width="100" height="100"
                             style={{display:disp, borderRadius:"15px"}}/>
                        <Navbar.Brand className="ml-5 glow" style={{fontSize:"40px"}}>
                            COVID-19

                        </Navbar.Brand>
                        <a className="blinking" style={{fontSize:"22px"}}>LIVE</a>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{float:"right"}}/>
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="mr-auto m-auto"   >
                                <Link to="/">
                                    <h1  style={{color:"black", fontSize:font}} className="ml-3 navhead head">Cases</h1>
                                </Link>
                                <Link to="/news">
                                    <h2  style={{color:"black",fontSize:font}} className="ml-3 navhead head">News</h2>
                                </Link>
                                <Link to="/about">
                                    <h1 style={{color:"black",fontSize:font}} className="ml-3 navhead head">About</h1>
                                </Link>

                        </Nav>

                        <Form inline style={{float:"auto"}}>
                            <input type="text" onChange={this.handleChange}   placeholder="Usa, Spain..." className="mr-sm-2" />
                            <Button onClick={this.onSubmit} variant="outline-dark" className="text-dark">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }


}
