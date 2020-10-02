import React from 'react';
import './Styles/App.css';
import './Styles/style.css';
import App from './App'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function Main (){
        return (
            <Router>
                <div>
                <Switch>
                    <Route  path="/" component={App}/>
                </Switch>
                </div>
            </Router>
        );
}
export default Main;

