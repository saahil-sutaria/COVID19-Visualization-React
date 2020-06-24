import React,{useState} from 'react';
import './App.css';
import News from './News'
import './style.css'
import App from './App'
import About from "./About";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

 export default function Main (){


        return (
            <Router>
                <div>
                <Switch>
                    <Route path="/news" component={News}/>
                    <Route path="/about" component={About}/>
                    <Route  path="/" component={App}/>

                </Switch>
                </div>
            </Router>


        );



}


