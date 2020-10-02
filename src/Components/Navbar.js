import React from 'react';

import {Nav, Navbar, Form, Button} from "react-bootstrap"
import './Styles/style.css';


export default class NavBar extends React.Component{

    constructor(props) {
        super();
        this.state = {country:""}
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
        let margin="";
        if (window.innerWidth<500){
            margin="auto"
        }
        return(
            <div id="fuck" style={{width:"100%"}}>
                <Navbar collapseOnSelect expand="lg" style={{width:"100%", margin:margin}} className="effect8 ">
                    <Navbar.Brand className="Blink">
                    &nbsp;
                    &nbsp; 
                    <svg  aria-hidden="true" width="100" height="100" focusable="false" data-prefix="fas" data-icon="virus" className="svg-inline--fa fa-virus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22c-35.84,35.83-97.11,10.45-97.11-40.23V28.44a28.45,28.45,0,0,0-56.9,0V50c0,50.68-61.27,76.06-97.11,40.23L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25c35.84-35.84,97.11-10.45,97.11,40.23v21.54a28.45,28.45,0,0,0,56.9,0V462c0-50.68,61.27-76.07,97.11-40.23L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM224,272a48,48,0,1,1,48-48A48,48,0,0,1,224,272Zm80,56a24,24,0,1,1,24-24A24,24,0,0,1,304,328Z"></path></svg>                    
                    &nbsp;
                    &nbsp;
                    <i className="fa fa-circle text-danger"></i>&nbsp; <span>LIVE</span> 
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{float:"right"}}/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto m-auto ">
                            <span className="customFont">Visualization by Country <img alt="earth" src="https://img.icons8.com/doodle/96/000000/green-earth.png"/></span> 
                        </Nav>
                        <Form inline style={{float:"auto"}}>
                            <input type="text" onChange={this.handleChange}  placeholder=" Usa, Spain..." className="mr-sm-3 inputBar"  />
                            <Button onClick={this.onSubmit} variant="outline-dark" className="text-dark">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )}
}
