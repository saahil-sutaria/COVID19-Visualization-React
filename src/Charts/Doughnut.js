import React from 'react';
import '../Components/Styles/style.css'
import Chart from 'chart.js'
import {Card} from "react-bootstrap";

class Doughnut extends React.Component {
    constructor(props) {
        super();
        this.countries=[];
        this.v = new Map()
        this.width="380px"
        this.height="380px"
        if(window.innerWidth<1000){
            this.width="300px"
            this.height="300px"
        }
    }

    componentDidMount() {
        this.fetchCountryList()
    }

    fetchCountryList(){
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
            }
        })
        .then(response => {return (response.json());})
         .then(resp=>{
            for (let i=0; i<5; i++) {
                 this.countries.push(resp.affected_countries[i])
            }
        })
        .then(()=>{this.fetchAsync()})
        .catch(err => {console.log(err);});
    }
    fetchAsync(){
        for (let i=0; i< this.countries.length; i++){
            fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${this.countries[i]}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
                }
            })
            .then(response=> {return response.json()})
            .then(resp=>{
                    let c = resp.latest_stat_by_country[0].total_cases.replace(/,/g,'')
                    this.v.set(resp.country,Number(c) )
                })
            .then(()=>{
                let a= Array.from(this.v.keys())
                let b=Array.from(this.v.values())
                Chart.defaults.global.animation.duration=10000;
                Chart.defaults.global.defaultFontSize = 7;
                if (document.getElementById("dd")!=null){
                    const myc4 = document.getElementById("dd").getContext('2d');
                    new Chart(myc4,{
                        type: 'doughnut',
                        options:{responsive: true, maintainAspectRatio: false, events: ['mousemove'],
                            legend:{
                                display:true,
                            }},
                        data: {
                            labels: a.reverse(),
                            datasets: [{
                                borderColor: "white",
                                backgroundColor: [
                                    '#003f5c',
                                    '#58508d',
                                    '#bc5090',
                                    '#ffa600',
                                    '#344e4f',
                                ],
                                data:b.reverse()}]
                        },
                    });
                }
            })
            .catch(error=>console.log(error))
        }
    }
    render() {
        return (
            <div>
                <Card className="effect7 bg-light">
                    <Card.Header className="head bg-dark" > Top 5 countries</Card.Header>
                    <Card.Body>
                        <canvas style={{width:this.width,height:this.height}} id="dd" >Ω</canvas>
                    </Card.Body>
                   
                </Card>
            </div>
        );
    }
}
export default Doughnut;
