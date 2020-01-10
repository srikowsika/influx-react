import React,{Component} from 'react';
import axios from 'axios'
import Chart from './chart'

   
class Bichart extends Component{
    
    constructor()
    {
        super()
        this.state={
            data:[],
            field:"both",
            precision:'-48h'
        }
    }
    
    componentDidMount()
    {
        this.nodeAxiosCall()
        setInterval(this.nodeAxiosCall, 50000);
    }

     nodeAxiosCall=()=>{
        axios.get(`http://localhost:4001/metrics/${this.state.field}/${this.state.precision}`)
        .then(res =>{
            if(res.data.status ===200)
            {
                this.setState({
                    data:res.data.data
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
     }
    
    changeEvent= (e) => {
          this.setState({ [e.target.name]:e.target.value},()=>{
            this.nodeAxiosCall()
          })
    }
    render()
    {
        
        return(
        <div>
        
            <h3>LineChart Lat and Long</h3>
                <div>
                    <select name="precision" onChange={(e)=>this.changeEvent(e)} >
                        <option value="-48h">Past 2d</option>
                        <option value="-6h">Past 6h</option>
                        <option value="-12h">Past 12h</option>
                        <option value="-24h">Past 24h</option>
                    </select>
                    <select name="field" onChange={(e)=>this.changeEvent(e)} >
                        <option value="both">Lat&Lan</option>
                        <option value="latitude">Latitude</option>
                        <option value="longitude">Longitude</option>
                    </select>
                </div>
                {this.state.data.length !== 0?
                    <div>
                        {this.state.field === "both" ? 
                            <Chart axis1='latitude' axis2='longitude' value1={this.state.data} />
                            : <Chart axis1={this.state.field} axis2='none'  value1={this.state.data} />
                        }
                    </div>
                    :<p>No result Found</p>
                }
       
        </div> 
   
        );
    }
}

export default Bichart;


    
   