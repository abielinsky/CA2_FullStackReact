import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from '../config/global_constants'


export default class LoadAttractions extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            displayingAttractions:false
        }
    }


    componentDidMount()
    {
        let url = 'https://raw.githubusercontent.com/abielinsky/CA2_FullStackReact/master/Attractions.json'

        axios.get(url)
            .then( res => res.data.Attractions)
            .then (results =>
                {
                    console.log(results)
                    let data = JSON.parse(JSON.stringify(results))
                    console.log(data)

                    axios.post(`${SERVER_HOST}/Attractions`, data)
                        .then(res =>
                        {
                            if(res.data)
                            {
                                console.log(res.data);
                                if (res.data.errorMessage)
                                {
                                    console.log(res.data.errorMessage)
                                }
                                else // success
                                {
                                    console.log("ALL DATA IMPORTED")
                                }
                                this.setState({displayingAttractions:true})
                            }
                            else
                            {

                                alert("DATA OK")
                                this.setState({displayingAttractions:true})
                                console.log("NO DATA")

                            }
                        })
                }
            )
    }



    render()
    {
        return (
            <div>
                {this.state.displayingAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}
            </div>
        )
    }







}