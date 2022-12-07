import React, {Component} from "react"
import axios from "axios"
import AttractionsTable from "./AttractionsTable"
import {SERVER_HOST} from "../config/global_constants"
import {Link, Redirect} from "react-router-dom";







export default class DisplayAllAttractions extends Component {
    constructor(props) 
    {
        super(props)
        
        this.state = {
            Attractions:[]
        }
    }
    
    
    componentDidMount() {
        axios.get(`${SERVER_HOST}/Attractions`)
        .then(res => {
            if (res.data.length !== 0) {
                console.log(res.data)
                console.log(this.state.isRecords)
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("RECORDS OK")
                    this.setState({Attractions: res.data})
                }
            } else {
                this.setState({isRecords: false})
                console.log(this.state.isRecords)
                console.log("DATA NOT FOUND")
            }
        })
    }

  
    render() 
    {   
        return (

            <div className="form-container">

                <header className="header">

                    <Link className="blue-button" to="/loadDataATTRACTIONS"> Load Data ATTRACTIONS </Link><span>&nbsp;  | &nbsp; </span>
                    {/*<Link className="blue-button" to="/DisplayAllATTRACTIONS"> Display All ATTRACTIONS <span>| </span></Link>&nbsp;*/}
                    <Link className="blue-button" to="/AddATTRACTIONS">Add new ATTRACTIONS</Link><span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/DeleteAllATTRACTIONS">Delete All ATTRACTIONS</Link>

                </header>
                <div className="sticky__btns">


                </div>


                <div className="form-container">

                    <AttractionsTable Attractions={this.state.Attractions} />

                </div>

            </div>






        )
    }
}