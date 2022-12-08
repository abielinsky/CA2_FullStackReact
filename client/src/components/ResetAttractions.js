import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from '../config/global_constants'

export default class ResetAttractions extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            redirectToDisplayAllAttractions:false
        }
    }

    componentDidMount()
    {
        axios.delete(`${SERVER_HOST}/ResetAttractions`)
        .then(res =>
        {
            if(res.data)
            {
                console.log(res.data)
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)
                }
                else
                {
                    console.log("Records reset")
                    this.setState({redirectToDisplayAllAttractions:true})
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
        if(this.state.redirectToDisplayAllAttractions)
        {
            return <Redirect to="/DisplayAllAttractions"/>
        }
        else
        {
            return null
        }
    }
}