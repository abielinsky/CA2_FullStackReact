import React, {Component} from "react"

import axios from "axios"

import AttractionsTable from "./AttractionsTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayAllAttractions extends Component
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            Attractions:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/Attractions`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")
                    this.setState({Attractions: res.data})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  
    render() 
    {   
        return (           
            <div className="form-container">

                    <AttractionsTable Attractions={this.state.Attractions} />



            </div> 
        )
    }
}