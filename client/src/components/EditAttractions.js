import React, {Component} from "react"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class EditAttractions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:"",
            url:"",
            AddressLocality:"",
            AddressRegion:"",
            telephone:"",
            Tags: [],
            allTags: [
                "Activity",
                "Walking",
                "Gardens",
                "Attraction",
                "Cafe",
                "Food _and_Drink",
                "Historic_Houses_and_Castle",
                "Tour",
                "Museums_and_Attraction",
                "Food_and_Drink",
                "Nature and Wildlife",
                "Learning",
                "Abbeys and Monastery",
                "Gallery"],
            redirectToDisplayAllAttractions:false,
            isTagsChecked: false,
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.AddressLocality]: e.target.value,
            [e.target.AddressRegion]: e.target.value,
            [e.target.telephone]: e.target.value    }
        )

    }

    handleSubmit = (e) => {
        e.preventDefault()
        //
        // this.setState({wasSubmittedAtLeastOnce: true});
        //
        // const FormInputsState = this.validate();
        //
        // if (Object.keys(FormInputsState).every(index => FormInputsState[index])) {
            const AttractionObject = {
                name: this.state.name,
                description: this.state.description,
                AddressLocality: this.state.AddressLocality,
                AddressRegion: this.state.AddressRegion,
                telephone: this.state.telephone,
                wasSubmittedAtLeastOnce: false
            }

            axios.put(`${SERVER_HOST}/Attractions/${this.props.match.params.id}`, AttractionObject)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log(`Record updated`)
                            // this.setState({redirectToDisplayAllAttractions: true})
                        }
                    } else {
                        console.log(`Record not updated`)
                    }
                })
        // }
    //
    }
    render(){

        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Attraction Details are incorrect<br/></div>;
        }

        return(
            <div className="form-container">
                {/*{this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}*/}

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

                    <Form.Group controlId="Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="text" name="Telephone" value={this.state.telephone} onChange={this.handleChange} />
                    </Form.Group>

                    <button type="submit" onClick={this.handleSubmit}>Submit</button>

                </Form>
            </div>
        )
    }









}
