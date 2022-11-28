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
            tags:[],
            redirectToDisplayAllAttractions:false
        }
    }

    handleSubmit = e => {

        e.preventDefault()

        this.setState({ wasSubmittedAtLeastOnce: true });

        const FormInputsState = this.validate();

        if (Object.keys(FormInputsState).every(index => FormInputsState[index]))
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

    validate = () =>
    {

    }

    validateName = () =>
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.model))
    }



    render(){

        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Attraction Details are incorrect<br/></div>;
        }

        return(
            <div className="form-container">
                {this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}

                <Form>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} ref={(input) => { this.inputToFocus = input; }} />
                </Form.Group>
                
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                </Form.Group>
                
                <Form.Group controlId="AddressLocality">
                    <Form.Label>AddressLocality</Form.Label>
                    <Form.Control type="text" name="AddressLocality" value={this.state.AddressLocality} onChange={this.handleChange} />
                </Form.Group>
                
                <Form.Group controlId="AddressRegion">
                    <Form.Label>AddressRegion</Form.Label>
                    <Form.Control type="text" name="AddressRegion" value={this.state.AddressRegion} onChange={this.handleChange} />
                </Form.Group>
                
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                </Form.Group>
                
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </Form>
        </div>
        )
    }
//    here u continue
}