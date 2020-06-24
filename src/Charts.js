import React from "react";
import Chart from 'chart.js';
import {Card} from 'react-bootstrap';



export default function graphs(props){

    let Date_total= new Map()
    let Date_deaths= new Map()
    let Date_newdeaths= new Map()
    let date_key=[]
    let date_val=[]
    let death_date=[]
    let death_val=[]
    let new_death_date=[]
    let new_death_val=[]

    let col = ['orange', 'red', 'black', 'gray', 'yellow', 'blue', 'green','#c45850','#344e4f']




    fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${props.country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
        }
    })
        .then(response => {
            return response.json();
        }).then(resp=>{

        let metadata = resp.stat_by_country
        for (let i=0; i<(metadata.length); i++){

            let d=metadata[i].record_date
            let total_cases = metadata[i].total_cases
            let total_death = metadata[i].total_deaths
            let new_deaths = metadata[i].new_deaths

            let date = d.split(" ")
            if (total_cases!==""){
               let tot=total_cases.replace(/,/g,'')
                Date_total.set(date[0],Number(tot))
            }
            if (total_death!==""){
                let dth = total_death.replace(/,/g,'')
                Date_deaths.set(date[0],Number(dth))
            }
            if (new_deaths!==""){
                let nd = new_deaths.replace(/,/g,'')
                if (Number(nd)>30){
                    Date_newdeaths.set(date[0],Number(nd))
                }
            }
        }
        date_key = Array.from( Date_total.keys() );
        date_val = Array.from (Date_total.values());
        death_date=Array.from(Date_deaths.keys());
        death_val =Array.from(Date_deaths.values())
        new_death_date = Array.from(Date_newdeaths.keys())
        new_death_val = Array.from(Date_newdeaths.values())

        /* Native*/
        if (window.innerWidth<1100){
            let native_date=[];
            let native_val=[]
            let native_date_death=[];
            let native_val_death=[]
            let native_daily_date=[];
            let native_daily_case =[];
            for (let i=0; i<date_key.length-2; i=i+2){

                if(date_key[i]!==undefined){
                    native_date.push(date_key[i])
                    native_val.push(date_val[i])
                }
                if (death_date[i]!==undefined) {
                    native_date_death.push((death_date[i]))
                    native_val_death.push((death_val[i]))
                }
                if (new_death_date[i]!==undefined){
                    native_daily_date.push(new_death_date[i])
                    native_daily_case.push(new_death_val[i])
                }

            }

            Chart.defaults.global.animation.duration=4000;
            Chart.defaults.global.legend=false;
            const myc = document.getElementById("chart1").getContext('2d');
            const myChart = new Chart(myc, {
                type: 'line',
                options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],label:{legend:true}},
                data: {
                    labels: native_date.reverse(),
                    datasets: [{borderColor: col[Math.floor(Math.random() * col.length)], data:native_val.reverse(),}]
                    },
                });
            myChart.clear()

            const myc2 = document.getElementById("chart2").getContext('2d');
            const myChart2 = new Chart(myc2, {
                type: 'bar',
                options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],},
                data: {
                    labels: native_date_death.reverse(),
                    datasets: [{backgroundColor: "gray", data:native_val_death.reverse(),}]
                },
            });
            myChart2.clear()
            const myc3 = document.getElementById("chart3").getContext('2d');
            const myChart3 = new Chart(myc3,{
                type: 'line',
                options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],},
                data: {
                    labels: native_daily_date.reverse(),
                    datasets: [{
                        borderColor: "gray",
                        backgroundColor: "yellow",
                        data:native_daily_case.reverse(),}]
                },
            });
            myChart3.clear()

        }
        /*  full screen*/
        else{
            Chart.defaults.global.defaultFontSize = 11;
            Chart.defaults.global.animation.duration=4000;
            Chart.defaults.global.legend=false;

            const myc = document.getElementById("chart1").getContext('2d');
            const myChart = new Chart(myc, {
                type: 'line',
                options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],},

                data: {
                    labels: date_key.reverse(),
                    datasets: [{label: `Case vs Dates in ${props.country.toUpperCase()}`,
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
                    datasets: [{label: `Deaths vs Dates in ${props.country.toUpperCase()}`,
                                data:death_val.reverse(),
                                backgroundColor: "gray",
                    }]
                },
            });
            myChart2.clear()
            const my3 = document.getElementById("chart3").getContext('2d');
            const myChart3 = new Chart(my3, {
                type: 'line',
                options:{responsive: true, maintainAspectRatio: true, events: ['mousemove'],},

                data: {
                    labels: new_death_date.reverse(),

                    datasets: [{label: `Daily Deaths vs Dates in ${props.country.toUpperCase()}`,
                                borderColor: "gray",
                                backgroundColor: "yellow",
                                data:new_death_val.reverse(),
                    }]
                },
            });
            myChart3.clear()

        }


    }).catch(err => {console.log(err);});

    let sty={
        width:"52vw",
        height:"63vh"
    }

    if (window.innerWidth<1100){
        sty.width ="82vw";
        sty.height="87vw";

    }


    return(
        <div>
            <br/>
            <Card className="effect7">
                <Card.Body>
                    <Card.Header className="effect7 head">Cases vs Dates in {props.country.toUpperCase()}</Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart1"> </canvas>
                    </div>
                </Card.Body>
                    <Card.Footer className="effect7 "></Card.Footer>
            </Card>
            <br/>
            <br/>

            <Card className="effect7">
                <Card.Body>
                    <Card.Header className="effect7 head">Daily Deaths vs Dates {props.country.toUpperCase()}</Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart3"></canvas>
                    </div>
                </Card.Body>
                <Card.Footer className="effect7"></Card.Footer>
            </Card>

            <br/>
            <br/>
            <Card className="effect7">
                <Card.Body>
                    <Card.Header className="effect7 head">Total Deaths vs Dates {props.country.toUpperCase()}</Card.Header>
                    <br/>
                    <div id="chr">
                        <canvas style={sty} id="chart2"></canvas>
                    </div>
                </Card.Body>
                <Card.Footer className="effect7"></Card.Footer>
            </Card>




        </div>
    )



}
