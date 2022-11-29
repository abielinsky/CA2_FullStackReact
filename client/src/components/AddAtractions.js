import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class AddAtractions extends Component
{
constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            url:"",
            AddressLocality:"",
            AddressRegion:"",
            tags:"",
            redirectToDisplayAllAttractions:false
        }
    }

    validate = () =>
    {
        let isValid = true;

        if(this.state.name === ``)
        {
            isValid = false;
        }

        if(this.state.AddressLocality === ``)
        {
            isValid = false;
        }

        if(this.state.AddressRegion === ``)
        {
            isValid = false;
        }
        return isValid;
    }

    validateName = () =>
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.model))
    }

    handleChange = (e) =>
    {

        this.setState({[e.target.name]: e.target.value,
                            [e.target.url]: e.target.value,
                            [e.target.AddressLocality]: e.target.value,
                            [e.target.AddressRegion]: e.target.value,
                            [e.target.tag]: e.target.value}
        )


    }

    handleSubmit = e => {

        e.preventDefault()

        let result = this.validate();
        if (result){

            this.setState({ wasSubmittedAtLeastOnce: true });

            const FormInputsState = this.validate();

            if (Object.keys(FormInputsState).every(index => FormInputsState[index])) {
                const carObject = {
                    name: this.state.name,
                    description: this.state.description,
                    AddressLocality: this.state.AddressLocality,
                    AddressRegion: this.state.AddressRegion,
                    price: this.state.price,
                    wasSubmittedAtLeastOnce: false
                }

                axios.post(`${SERVER_HOST}/Attractions`, carObject)
                    .then(res => {
                        if (res.data) {
                            if (res.data.errorMessage) {
                                console.log(res.data.errorMessage)
                            } else {
                                console.log("Record added")
                                this.setState({redirectToDisplayAllAttractions: true})
                            }
                        } else {
                            console.log("Record not added")
                        }
                    })
        }
        }
    }

    render(){

        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Attraction Details are incorrect<br/></div>;
            return(errorMessage)
        }
        else {
            return(
                <div className="form-container">
                    {this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}

                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} ref={(input) => { this.inputToFocus = input; }} />
                        </Form.Group>

                        <Form.Group controlId="url">
                            <Form.Label>Website</Form.Label>
                            <Form.Control type="text" name="url" value={this.state.url} onChange={this.handleChange}  />
                        </Form.Group>

                        <Form.Group controlId="AddressLocality">
                            <Form.Label>AddressLocality</Form.Label>
                            <Form.Control type="text" name="AddressLocality" value={this.state.AddressLocality} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="AddressRegion">
                            <Form.Label>AddressRegion</Form.Label>
                            <Form.Control type="text" name="AddressRegion" value={this.state.AddressRegion} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="tag">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control type="text" name="tag" value={this.state.tag} onChange={this.handleChange} />
                        </Form.Group>

                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                    </Form>
                </div>
            )
        }
    }
}