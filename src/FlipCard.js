import React, {useState} from "react";
import ReactCardFlip from 'react-card-flip';
import {Card,Button} from "react-bootstrap";
import CountUp from "react-countup"

const FlipCard =(props)=> {

    const [isFlipped,setIsFlipped]=useState(false);
    let display = "";
    if(props.tot!==""){
       display="none";
    }

    const handleClick=()=>{
        setIsFlipped(!isFlipped);

    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">


            <div className="effect7">
                <br/>
                <h2 className="head2">Cases in {props.country.toUpperCase()}</h2>
                <div id="content">
                    <Card style={{width:"18rem"}} className="bg-light text-dark">
                        <Card.Body>
                            <Card.Header><h3> Total </h3></Card.Header>

                                <h1>{props.tot}<div className="loader" style={{display:display, margin:"auto"}}/></h1>

                        </Card.Body>
                    </Card>
                </div>

                <div id="content">
                    <Card  style={{width:"18rem"}} className="bg-success text-light">
                        <Card.Body>
                            <Card.Header><h3>Recovered</h3></Card.Header>

                                <h1>{props.rec}<div className="loader" style={{display:display, margin:"auto"}}/></h1>

                        </Card.Body>
                    </Card>
                </div>

                <div id="content">
                    <Card  style={{width:"18rem"}} className="bg-danger text-light">
                        <Card.Body>
                            <Card.Header><h3>Deaths</h3></Card.Header>

                                <h1>{props.dth} <div className="loader" style={{display:display, margin:"auto"}}/></h1>

                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Button style={{width:"70%"}} variant="outline-danger"  onClick={handleClick}>Click to flip</Button>
                </div>
                <br/>
                <p style={{fontSize:"8px"}}>Statistics taken at :- {props.stats}</p>
            </div>


            <div className="effect7" >
                <br/>
                <h2 className="head2">Global Cases</h2>
                <div id="content">
                    <Card style={{width:"18rem"}} className="bg-light text-dark">
                        <Card.Body>
                            <Card.Header><h3> Total </h3></Card.Header>

                                <h1>{props.total}</h1>

                        </Card.Body>
                    </Card>
                </div>

                <div id="content">
                    <Card  style={{width:"18rem"}} className="bg-success text-light">
                        <Card.Body>
                            <Card.Header><h3>Recovered</h3></Card.Header>

                                <h1>{props.recovered}</h1>

                        </Card.Body>
                    </Card>
                </div>

                <div id="content" style={{align:"auto"}}>
                    <Card  style={{width:"18rem"}} className="bg-danger text-light">
                        <Card.Body>
                            <Card.Header><h3>Deaths</h3></Card.Header>

                                <h1>{props.deaths}</h1>

                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Button style={{width:"70%"}} variant="outline-success" onClick={handleClick}>Click to flip</Button>
                </div>
                <br/>
            </div>






        </ReactCardFlip>
    )

}
export default FlipCard;
