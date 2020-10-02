import React from "react";
import Chart from 'chart.js';
import {Card} from 'react-bootstrap';
import '../Components/Styles/style.css'

function Graphs(props){

    let Date_total= new Map()
    let Date_deaths= new Map()
    let Date_newdeaths= new Map()
    let date_key=[]
    let date_val=[]
    let death_date=[]
    let death_val=[]
    let new_death_date=[]
    let new_death_val=[]
    let col = ['#003f5c', '#58508d', '#bc5090','#c45850','#344e4f','#ff6361','#ffa600']

    fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${props.country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
        }
    })
    .then(response => {return response.json();})
    .then(resp=>{
        let metadata = resp.stat_by_country
        for (let i=0; i<(metadata.length); i++){
            let d=metadata[i].record_date
            let total_cases = metadata[i].total_cases
            let total_death = metadata[i].total_deaths
            let new_deaths = metadata[i].new_deaths
            let date = d.split(" ")
            if (total_cases !== ""){
               let tot=total_cases.replace(/,/g,'')
                Date_total.set(date[0],Number(tot))
            }
            if (total_death !== ""){
                let dth = total_death.replace(/,/g,'')
                Date_deaths.set(date[0],Number(dth))
            }
            if (new_deaths !== ""){
                let nd = new_deaths.replace(/,/g,'')
                if (Number(nd) > 30){
                    Date_newdeaths.set(date[0],Number(nd))
                }
            }
        }
        date_key = Array.from( Date_total.keys()).slice(0, 30);
        date_val = Array.from (Date_total.values()).slice(0, 30);
        death_date = Array.from(Date_deaths.keys()).slice(0, 30);
        death_val = Array.from(Date_deaths.values()).slice(0, 30);
        new_death_date = Array.from(Date_newdeaths.keys()).slice(0, 30);
        new_death_val = Array.from(Date_newdeaths.values()).slice(0, 30);
    
        Chart.defaults.global.defaultFontSize = 11;
        Chart.defaults.global.animation.duration = 3000;
        Chart.defaults.global.legend = false;
    

        const myc = document.getElementById("chart1").getContext('2d');
        const myChart = new Chart(myc, {
            type: 'line',
            options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],},
            data: {
                labels: date_key.reverse(),
                datasets: [{label: `Case vs Dates - ${props.country.toUpperCase()}`,
                            borderColor: col[Math.floor(Math.random() * col.length)],
                            data:date_val.reverse(),
                }]
            },
        });
        myChart.clear()

        const my2 = document.getElementById("chart2").getContext('2d');
        const myChart2 = new Chart(my2, {
            type: 'bar',
            options:{responsive: true, maintainAspectRatio: true, events: ['mousemove']},
            data: {
                labels: death_date.reverse(),
                datasets: [
                    {
                        label: `Deaths vs Dates in - ${props.country.toUpperCase()}`,
                        data:death_val.reverse(),
                        borderColor: "black",
                        backgroundColor:"#ffa600",
                        borderWidth : "3",
                    }]
            },
        });
        myChart2.clear()

        const my3 = document.getElementById("chart3").getContext('2d');
        const myChart3 = new Chart(my3, {
            type: 'line',
            options:{responsive: true, maintainAspectRatio: true, events: ['mousemove']},
            data: {
                labels: new_death_date.reverse(),
                datasets: [{label: `Daily Deaths vs Dates in - ${props.country.toUpperCase()}`,
                            borderColor: "gray",
                            backgroundColor: '#c25f5f4f',
                            data:new_death_val.reverse(),
                }]
            },
        });
        myChart3.clear()
    })
    .catch(err => {console.log(err);});

    let sty={
        width:"48vw",
        height:"58vh"
    }
    /*Cards code can be resued*/ 
    return(
        <div>
            <br/>
            <Card className="effect7 bg-dark">
                <Card.Body className="bg-light" >
                    <Card.Header className="bg-dark"><span className="head">Cases vs Dates - {props.country.toUpperCase()}</span></Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart1"> </canvas>
                    </div>
                </Card.Body>
                    <Card.Footer></Card.Footer>
            </Card>
            <br/>
            <br/>
            <Card className=" effect7 bg-dark">
                <Card.Body className="  bg-light">
                    <Card.Header className=" head bg-dark">Total Deaths vs Dates - {props.country.toUpperCase()}</Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart2"></canvas>
                    </div>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
            <br/>
            <br/>
            <Card className="effect7 bg-dark">
                <Card.Body className=" bg-light">
                    <Card.Header className=" head bg-dark">Daily Deaths vs Dates - {props.country.toUpperCase()}</Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart3"></canvas>
                    </div>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>            
        </div>
    )
}

export default Graphs;