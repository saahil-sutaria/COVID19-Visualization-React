import React from 'react';
import './App.css';
import Chart from 'chart.js'
import {Card} from "react-bootstrap";


class Doughnut extends React.Component {

    constructor(props) {
        super(props);
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
        console.log("Inside fetch")
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
            }).then(response=> {return response.json()})
                .then(resp=>{


                    let c = resp.latest_stat_by_country[0].total_cases.replace(/,/g,'')
                    this.v.set(resp.country,Number(c) )
                }).then(()=>{let a= Array.from(this.v.keys())
                let b=Array.from(this.v.values())
                console.log(a)
                console.log(b)
                Chart.defaults.global.animation.duration=10000;
                Chart.defaults.global.defaultFontSize = 7;
                if (document.getElementById("dd")!=null){

                    const myc4 = document.getElementById("dd").getContext('2d');
                    const dough =new Chart(myc4,{
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
                                    'rgba(79,64,36,0.94)',
                                    'rgb(128,104,58)',
                                    'rgba(190,154,87,0.91)',
                                    'rgba(244,197,111,0.9)',
                                    'rgba(180,180,11,0.93)',
                                ],

                                data:b.reverse()}]
                        },
                    });

                    console.log(dough)
                }

            }).catch(error=>console.log(error))



        }



    }



    render() {
        return (
            <div>

                <Card className="effect7">
                    <Card.Header className="head"> Top 5 countries</Card.Header>
                    <Card.Body>
                        <canvas style={{width:this.width,height:this.height}} id="dd" >Ω</canvas>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
            </div>
        );
    }




}

export default Doughnut;
