import React, { Component } from "react";
import "../../resources/styles/Statistics.scss";
import Config from "../../config";
import Moment from "moment"
import {Bar, Doughnut} from 'react-chartjs-2';
import AppContext from "../../Model/AppContext";


const ColorPrediction = "#FFAB00";
const ColorPredictionHover = "#FFC400";
const ColorStock = "#EDEDED";
const ColorStockHover = "#DEDEDE";

const dataset = {
    prediction : {
        label: 'Prediction',
        type:'line',
        data: [], //{Array.<int>}
        fill: false,
        borderColor: ColorPrediction,
        backgroundColor: ColorPrediction,
        pointBorderColor: ColorPrediction,
        pointBackgroundColor: ColorPrediction,
        pointHoverBackgroundColor: ColorPredictionHover,
        pointHoverBorderColor: ColorPredictionHover,
        yAxisID: 'y-axis-1'
    },
    stock : {
        type: 'bar',
        label: 'Stock',
        data: [], //{Array.<int>}
        fill: false,
        backgroundColor: ColorStock,
        borderColor: ColorStockHover,
        borderWidth: 2,
        hoverBackgroundColor: ColorStockHover,
        hoverBorderColor: ColorStockHover,
        yAxisID: 'y-axis-2'
    }
};
const configuration = {
    byDay : {
        labels: (()=>{let data = [];for(let i = 1; i <= 24; i++) data.push( i > 12 ? (i - 12 + " PM" ) : (i + " AM") );return data;})(),
        responsive: true,
        tooltips: {mode: 'label'},
        elements: { line: { fill: false}},
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: { display: false },
                    labels: (()=>{let data = [];for(let i = 1; i <= 24; i++) data.push( i > 12 ? (i - 12 + " PM" ) : (i + " AM") );return data;})(),
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {display: false},
                    labels: {show: true}
                },
                {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {display: false},
                    labels: {show: false}
                }
            ]
        }
    },
    byWeek : {
        labels: [],
        responsive: true,
        tooltips: {mode: 'label'},
        elements: { line: { fill: false}},
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: { display: false },
                    labels: []
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {display: false},
                    labels: {show: true}
                },
                {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {display: false},
                    labels: {show: false}
                }
            ]
        }
    },
    byMonth : {
        labels: [],
        responsive: true,
        tooltips: {mode: 'label'},
        elements: { line: { fill: false}},
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: { display: false },
                    labels: []
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {display: false},
                    labels: {show: true}
                },
                {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {display: false},
                    labels: {show: false}
                }
            ]
        }
    }
};




class Graph extends Component{

    constructor(props){
        super(props);

        this.referenceBar = React.createRef();
        this.referenceDoughnut = React.createRef();
    }

    componentDidUpdate() {
        console.log(this.referenceBar);
        console.log(this.referenceDoughnut);
        this.props.updateGraphComponents(this.referenceBar, this.referenceDoughnut);
    }

    render(){

        if(!this.props.hasOwnProperty("statistic") || Config.isEmpty(this.props.statistic)) return null;

        let barProps = this.buildBarProps();
        let doughnutProps = this.buildDoughnutProps();

        return(
            <div className={"GraphContainer"}>
                <div className={"GraphBar"}>
                    <div className={"sectionTitle"}><i className="material-icons">graphic_eq</i><p>Stock vs. Prediction Data ({barProps.chosen})</p></div>
                    <Bar ref={this.referenceBar} {...barProps}/>
                </div>
                <div className={"GraphDoughnut"}>
                    <div className={"sectionTitle"}><i className="material-icons">track_changes</i><p>Stock vs. Prediction Accuracy</p></div>
                    <Doughnut ref={this.referenceDoughnut} {...doughnutProps}/>
                </div>
            </div>
        );
    }


    buildDoughnutProps(){

        let labels = ["> 99% Match","> 80% Match", "Mismatch"];
        let colors = ["#FFAB00", "#36A2EB", "#FF6384"];

        let match99 = 0;
        let match80 = 0;
        let matchNone = 0;

        switch (this.props.option) {
            case Config.OPTION_DAY :
                this.props.statistic.byDay.data.forEach( row => {
                    let value = ((Math.abs(row.prediction - row.stock)) / ((row.prediction + row.stock)/2)) * 100;
                    if(value <= 1) match99++;
                    else if(value <= 20) match80++;
                    else matchNone++;
                });
                break;
            case Config.OPTION_WEEK :
                this.props.statistic.byWeek.data.forEach( row => {
                    let value = ((Math.abs(row.prediction - row.stock)) / ((row.prediction + row.stock)/2)) * 100;
                    if(value <= 1) match99++;
                    else if(value <= 20) match80++;
                    else matchNone++;
                });
                break;
            case Config.OPTION_MONTH :
                this.props.statistic.byMonth.data.forEach( row => {
                    let value = ((Math.abs(row.prediction - row.stock)) / ((row.prediction + row.stock)/2)) * 100;
                    if(value <= 1) match99++;
                    else if(value <= 20) match80++;
                    else matchNone++;
                });
                break;
            default: break;
        }

        return {

            width : 200,
            height: 200,
            data : {
                labels: labels,
                datasets: [{
                    data: [match99, match80, matchNone],
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
            },
            options : { maintainAspectRatio: true}
        };



    }

    buildBarProps(){
        let configurationOption = configuration.byDay;
        let datasetOption = dataset;
        let chosen = "";


        console.log(this.props.statistic)



        switch (this.props.option) {
            case Config.OPTION_DAY :
                configurationOption = configuration.byDay;
                datasetOption.prediction.data = (()=>{ let a=[]; this.props.statistic.byDay.data.forEach( row => { a.push(parseInt(row.prediction))}); return a;})();
                datasetOption.stock.data = (()=>{ let a=[]; this.props.statistic.byDay.data.forEach( row => { a.push(parseInt(row.stock))}); return a;})();
                chosen = Moment(this.props.statistic.byDay.date,"DD/MM/YYYY").format("MMMM Do YYYY");
                break;
            case Config.OPTION_WEEK :
                configurationOption = configuration.byWeek;
                configurationOption.labels = Moment.weekdays();
                configurationOption.labels.forEach( (element, index) => { configurationOption.labels[index] +=" " + Moment( this.props.statistic.byWeek.data[index]).format("DD/MM");});
                configurationOption.scales.xAxes[0].labels = [...configurationOption.labels];
                datasetOption.prediction.data = (()=>{ let a=[]; this.props.statistic.byWeek.data.forEach( row => { a.push(parseInt(row.prediction))}); return a;})();
                datasetOption.stock.data = (()=>{ let a=[]; this.props.statistic.byWeek.data.forEach( row => { a.push(parseInt(row.stock))}); return a;})();
                chosen = "Week starting with " +  Moment(this.props.statistic.byWeek.date,"DD/MM/YYYY").format("MMMM Do YYYY");
                break;
            case Config.OPTION_MONTH :
                configurationOption = configuration.byMonth;
                datasetOption.prediction.data = (()=>{ let a=[]; this.props.statistic.byMonth.data.forEach( row => { a.push(parseInt(row.prediction))}); return a;})();
                datasetOption.stock.data = (()=>{ let a=[]; this.props.statistic.byMonth.data.forEach( row => { a.push(parseInt(row.stock))}); return a;})();
                configurationOption.labels = (()=>{let data = [];for(let i = 1; i <= Moment(this.props.statistic.byMonth.date,"DD/MM/YYYY").daysInMonth(); i++) data.push(i);return data;})();
                configurationOption.scales.xAxes[0].labels = [...configurationOption.labels];


                chosen = "Month starting with " +  Moment(this.props.statistic.byMonth.date,"DD/MM/YYYY").format("MMMM Do YYYY");
                break;
            default: break;
        }

        console.log(configurationOption);
        console.log(datasetOption);

        return {
            chosen  : chosen,
            data : {datasets : [datasetOption.prediction, datasetOption.stock]},
            options : {...configurationOption,        maintainAspectRatio: true}
        };

    }


}

Graph.contextType = AppContext;
export default Graph;