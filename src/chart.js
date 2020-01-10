import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,Resizable,} from "react-timeseries-charts";
import { TimeSeries,Index} from "pondjs";
//import axios from 'axios'
function Chart(props){
        
       
        if(props.axis2 ==='longitude')
        {
            //console.log( props.value1)
            var series = new TimeSeries({
                name: "geostat",
                columns: ["index", "in" ,"out"],
                points: props.value1.map((res) => 
                [
                    Index.getIndexString("10s", new Date(res._time)),
                    res._value_d1,
                    res._value_d2
                ])
            }); 
      }
        else{
            //console.log( props.value1)
             series = new TimeSeries({
                name: "geostat",
                columns: ["index", "in" ],
                 points: props.value1.map((res) => 
                 [
                    Index.getIndexString("10s", new Date(res._time)),
                    res._value
                ])
            });
        }
        
    const style = {
        in: {
            normal: {stroke: "black", fill: "none", strokeWidth: 1},
            highlighted: {stroke: "#5a98cb", fill: "none", strokeWidth: 1},
            selected: {stroke: "steelblue", fill: "none", strokeWidth: 1},
            muted: {stroke: "steelblue", fill: "none", opacity: 0.4, strokeWidth: 1},
            //smoothed:{smooth:true}
        },
        out: {
            normal: {stroke: "red", fill: "none", strokeWidth: 1},
            highlighted: {stroke: "#5a98cb", fill: "none", strokeWidth: 1},
            selected: {stroke: "steelblue", fill: "none", strokeWidth: 1},
            muted: {stroke: "steelblue", fill: "none", opacity: 0.4, strokeWidth: 1}
        }
    };
    
    return(
        
            <div>
            <div className="row">
                {/* <div className="col-md-10">
                    <b>Line Chart</b>
                </div> */}
            </div>
            
            <div className="row">
             <div className="col-md-6">
                <Resizable>
                     <ChartContainer timeRange={series.range()}>
                         <ChartRow height="300" title="Timeseries sample">
                            <YAxis
                                id="geostats"
                                label={props.axis1}
                                min={-100}
                                max={200}
                                //tyle={trafficStyle}
                                width="50"
                                type="linear"
                            />
                            <Charts>
                                <LineChart
                                    axis="geostats"
                                    style={style}
                                    spacing={1}
                                    columns={["in"]}
                                    series={series}
                                    minBarHeight={1}
                                />
                                
                                <LineChart
                                    axis="geostats"
                                    style={style}
                                    spacing={1}
                                    columns={["out"]}
                                    series={series}
                                    minBarHeight={1}
                                /> 
                            </Charts>
                            {/* {props.axis2 !== "none" ?
                            <YAxis
                                id="geostat"
                                label={props.axis2}
                                min={-100}
                                max={200}
                                width="50"
                                type="linear"
                            />:null} */}
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </div>
            </div>
            
           
                </div>

    )
}

export default Chart