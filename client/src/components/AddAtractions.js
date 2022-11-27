import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../LinkInClass"

import {SERVER_HOST} from "../../config/global_constants"


export default class AddAtractions extends Component
{
constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            description:"",
            AddressLocality:"",
            AddressRegion:"",
            price:"",
            redirectToDisplayAllAttractions:false
        }
    }

    handleSubmit = e => {

        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(index => formInputsState[index]))
        {
            const carObject = {
                name: this.state.name,
                description: this.state.description,
                AddressLocality: this.state.AddressLocality,
                AddressRegion: this.state.AddressRegion,
                price: this.state.price,
                wasSubmittedAtLeastOnce: false
            }

            axios.post(`${SERVER_HOST}/Attractions`, carObject)
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
                            console.log("Record added")
                            this.setState({redirectToDisplayAllAttractions:true})
                        }
                    }
                    else
                    {
                        console.log("Record not added")
                    }
                })
        }
    }

//    here u continue
}