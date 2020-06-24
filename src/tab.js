import React from 'react';
import "./style.css"

import FlipCard from "./FlipCard";

export default  class Tab extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            total:0,
            recovered:0,
            deaths:0,
            country:"USA",
            tot:"",
            rec:"",
            dth:"",
            loader:"",
            stats_taken:"",
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps!==this.props){
            this.setState({country: this.props.country})
            this.update()
        }

    }
    update=()=>{
        fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${this.props.country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
            }
        })
            .then(response => {return response.json();
            }).then(resp=>{
            this.setState({tot:resp.latest_stat_by_country[0].total_cases,
                rec: resp.latest_stat_by_country[0].total_recovered,
                dth: resp.latest_stat_by_country[0].total_deaths,
                loader: "none",
                stats_taken:resp.latest_stat_by_country[0].record_date_pure})

        })
            .catch(err => {
                window.alert("Check for input")
            });

    }
    componentDidMount() {

        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
            }
        })
            .then(response => {return (response.json());}).then(resp => {

            let stats =resp.statistic_taken_at;
            let s= stats.split(" ")
            this.setState({total:resp.total_cases, recovered: resp.total_recovered, deaths: resp.total_deaths, stats_taken:s[0]})
        }).catch(err => {console.log(err);});

        fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${this.props.country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
            }
        })
            .then(response => {return response.json();
            }).then(resp=>{
            console.log(resp)
            this.setState({tot:resp.latest_stat_by_country[0].total_cases,
                rec: resp.latest_stat_by_country[0].total_recovered,
                dth: resp.latest_stat_by_country[0].total_deaths})
             })
            .catch(err => {window.alert("Check for input")});

    }

    render() {


        return(

                    <div>

                    <FlipCard
                        country={this.props.country}
                        total={this.state.total}
                        recovered={this.state.recovered}
                        deaths={this.state.deaths}
                        tot={this.state.tot}
                        rec={this.state.rec}
                        dth ={this.state.dth}
                        stats={this.state.stats_taken}
                        />

                    </div>






        )

    }



}
