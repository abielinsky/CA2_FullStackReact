import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import Form from "react-bootstrap/Form"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import LinkInClass from "../components/LinkInClass"
import {GiCancel} from 'react-icons/gi'


//validation data inputs using regex ?
export default class AddAttractions extends Component
{
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


    componentDidMount() {
        this.inputToFocus.focus()
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleTagChange = (e) => {
        const tag = e.target.nextSibling.textContent
        const isChecked = e.target.checked
        if (isChecked) {
            this.setState((prevState) => ({
                Tags: [...prevState.Tags, tag]
            }))
            this.setState({isTagsChecked: true})
        } else {
            const newTags = this.state.Tags.filter((g) => g !== tag)
            this.setState({Tags: newTags})
            this.setState({isTagsChecked: false})
        }
        console.log(this.state.Tags)
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.wasSubmittedAtLeastOnce)
        this.setState({wasSubmittedAtLeastOnce: true})
        console.log(this.wasSubmittedAtLeastOnce)
        const formInputsState = this.validate()

        if (Object.keys(formInputsState).every(index => formInputsState[index])) {
            const attractionObject = {

                name: this.state.name,
                url: this.state.url,
                address: {
                    addressLocality: this.state.AddressLocality,
                    addressRegion: this.state.AddressRegion,
                },
                telephone: this.state.telephone,
                // Tags: {
                    tags: this.state.Tags,
                // },
                wasSubmittedAtLeastOnce: false
            }

            axios.post(`${SERVER_HOST}/Attractions`, attractionObject)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("ATTRACTION added")
                            this.setState({redirectToDisplayAllAttractions: true})
                        }
                    } else {
                        console.log("ATTRACTION NOT ADDED")
                    }
                })
        }
    }

    validateName() {
        const pattern = /^[0-9a-zA-Z !@%£$?+\s]+$/
        return pattern.test(String(this.state.name))
    }
    validateUrl() {
        const pattern = /^[A-Za-z,;:/_.!?@ \-0-9\s]+$/
        return pattern.test(String(this.state.url))
    }
    validateAddressLocality() {
        const pattern = /^[0-9a-zA-Z !@%£$?+\s]+$/
        return pattern.test(String(this.state.AddressLocality))
    }
    validateAddressRegion() {
        const pattern = /^[0-9a-zA-Z !@%£$?+\s]+$/
        return pattern.test(String(this.state.AddressRegion))
    }
    validatetelephone() {
        const pattern = /^[0-9]+$/
        return pattern.test(String(this.state.telephone))
    }
    validateTags() {
        if (this.state.isTagsChecked)
            return this.state.isTagsChecked
    }


    validate() {
        return {
            name: this.validateName(),
            url: this.validateUrl(),
            AddressLocality: this.validateAddressLocality(),
            AddressRegion: this.validateAddressRegion(),
            telephone: this.validatetelephone(),
            Tags: this.validateTags(),

        }
    }

    validateForm() {
        if (this.validate()) {
            return true
        }

    }






    render() {
        let errorMessage = ""

        let nameErrorMessage = ""
        let urlErrorMessage = ""
        let AddressLocalityErrorMessage = ""
        let AddressRegionErrorMessage = ""
        let telephoneErrorMessage = ""
        let TagsErrorMessage = ""


        if (this.state.wasSubmittedAtLeastOnce) {

            errorMessage =
                <div className="error">Attractions Details are incorrect!!<br/>Please fill up all the form fields</div>;
        }

        if (!this.validateName()) {
            nameErrorMessage = <div className="error">names must be only letters<br/></div>
        }
        if (!this.validateUrl()) {
            urlErrorMessage = <div className="error">Please enter the Valid URL<br/></div>
        }
        if (!this.validateAddressLocality()) {
            AddressLocalityErrorMessage = <div className="error">names must be only letters<br/></div>
        }
        if (!this.validateAddressRegion()) {
            AddressRegionErrorMessage = <div className="error">names must be only letters <br/></div>
        }
        if (!this.validatetelephone()) {
            telephoneErrorMessage = <div className="error">Must contain only numbers <br/></div>
        }
        if (!this.validateTags()) {
            TagsErrorMessage = <div className="error">tag must be only letters <br/></div>
        }


        return (
            <div className="formAdd__body">

                <header className="header">

                    <Link className="blue-button" to="/loadDataATTRACTIONS"> Load Data ATTRACTIONS </Link><span>&nbsp;  | &nbsp; </span>
                    <Link className="blue-button" to="/DisplayAllATTRACTIONS"> Display All ATTRACTIONS <span>| </span></Link>&nbsp;
                    <Link className="blue-button" to="/AddATTRACTIONS">Add new ATTRACTIONS</Link><span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/DeleteAllATTRACTIONS">Delete All ATTRACTIONS</Link>

                </header>

                <div className="wrapperAdd">

                    {this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllATTRACTIONS"/> : null}

                    <Form className="addForm__container">
                        <h2 className="title_editForm">Add new ATTRACTION </h2>

                        <Form.Group controlId="name">
                            <Form.Label className="form__label" style={this.validateName() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}> ATTRACTION NAME</Form.Label>
                            <Form.Control
                                ref={(input) => {
                                    this.inputToFocus = input;
                                }}

                                className="form__control"
                                type="text"
                                name="name"
                                placeholder="NAME HERE..."
                                style={this.validateName() ? {
                                    transition: "all 500ms ease-in-out",
                                    boxShadow: "0 0 7px greenyellow"
                                } : {
                                    boxShadow: "0 0 7px red",
                                    transition: "all 500ms ease-in-out"
                                }}
                                onChange={this.handleChange}
                            />
                            {nameErrorMessage}
                        </Form.Group>



                        <Form.Group controlId="url">
                            <Form.Label className="form__label" style={this.validateUrl() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}>ATTRACTION URL</Form.Label>
                            <Form.Control
                                ref={(input) => {
                                    this.inputToFocus = input;
                                }}
                                type="text"
                                name="url"
                                placeholder="TYPE URL HERE..."
                                onChange={this.handleChange}
                                style={this.validateUrl() ? {
                                    transition: "all 500ms ease-in-out",
                                    boxShadow: "0 0 7px greenyellow"
                                } : {
                                    boxShadow: "0 0 7px red",
                                    transition: "all 500ms ease-in-out"
                                }}
                            />
                            {urlErrorMessage}
                        </Form.Group>

                        <Form.Group controlId="AddressLocality">
                            <Form.Label className="form__label" style={this.validateAddressLocality() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}>ADDRESS LOCALITY</Form.Label>
                            <Form.Control
                                ref={(input) => {
                                    this.inputToFocus = input;
                                }}
                                type="text"
                                name="AddressLocality"
                                placeholder="TYPE ADDRES LOCALITY HERE..."
                                onChange={this.handleChange}
                                style={this.validateAddressLocality() ? {
                                    transition: "all 500ms ease-in-out",
                                    boxShadow: "0 0 7px greenyellow"
                                } : {
                                    boxShadow: "0 0 7px red",
                                    transition: "all 500ms ease-in-out"
                                }}
                            />
                            {AddressLocalityErrorMessage}
                        </Form.Group>

                        <Form.Group controlId="AddressRegion">
                            <Form.Label className="form__label" style={this.validateAddressRegion() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}>ATTRACTIONS ADDRESS REGION</Form.Label>
                            <Form.Control
                                type="text"
                                name="AddressRegion"
                                placeholder="TYPE ADDRESS REGION HERE..."
                                onChange={this.handleChange}
                                style={this.validateAddressRegion() ? {
                                    transition: "all 500ms ease-in-out",
                                    boxShadow: "0 0 7px greenyellow"
                                } : {
                                    boxShadow: "0 0 7px red",
                                    transition: "all 500ms ease-in-out"
                                }}
                            />
                            {AddressRegionErrorMessage}
                        </Form.Group>

                        <Form.Group controlId="telephone">
                            <Form.Label className="form__label" style={this.validatetelephone() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}>ATTRACTIONS TELEPHONE</Form.Label>
                            <Form.Control
                                type="text"
                                name="telephone"
                                placeholder="TYPE TELEPHONE HERE..."
                                onChange={this.handleChange}
                                style={this.validatetelephone() ? {
                                    transition: "all 500ms ease-in-out",
                                    boxShadow: "0 0 7px greenyellow"
                                } : {
                                    boxShadow: "0 0 7px red",
                                    transition: "all 500ms ease-in-out"
                                }}
                            />
                            {telephoneErrorMessage}
                        </Form.Group>





                        <Form.Group controlId="Tags">
                            <Form.Label className="form__label" style={this.validateTags() ? {
                                color: "greenyellow",
                                fontWeight: "bold",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            } : {
                                color: "#EED1C7",
                                textShadow: "0 0 7px white",
                                transition: "all 500ms ease-in-out"
                            }}>ATTRACTIONS TAGS</Form.Label>

                            <div className="Tags">
                                {this.state.allTags.map((Tags) => (
                                    <div className="tick">
                                        <Form.Check
                                            type="checkbox"
                                            id={`default-checkbox`}
                                            label={Tags}
                                            className="form__check"
                                            placeholder="ENTER Tags..."
                                            onChange={this.handleTagChange}
                                            style={this.validateTags() ? {
                                                transition: "all 500ms ease-in-out",
                                                boxShadow: "0 0 3px greenyellow",
                                                background: "transparent",
                                                borderRadius: "3px"
                                            } : {
                                                boxShadow: "0 0 3px red",
                                                transition: "all 500ms ease-in-out",
                                                background: "transparent",
                                                borderRadius: "3px"
                                            }}
                                        />
                                    </div>
                                ))}

                            </div>
                            {this.state.isTagsChecked ? <div>
                                <h6 style={{
                                    color: "#EED1C7",
                                    textShadow: "0 0 7px white",
                                    transition: "all 500ms ease-in-out",
                                    marginTop: "5px",
                                    marginBottom: "5px"
                                }}>TAGS ADDED</h6>
                                <div className="added__TAGS" style={{width: "100%", color: "greenyellow"}}>

                                    {this.state.Tags.map(g => <div className="Tags__value" style={{
                                        transition: "all 500ms ease-in-out",
                                        boxShadow: "0 0 3px greenyellow",
                                        background: "transparent",
                                        borderRadius: "3px"
                                    }}>{g}</div>)}
                                </div>
                            </div> : null}

                        </Form.Group>
                        {TagsErrorMessage}

                        {/*<div className="form__footer">*/}
                            <button type="submit" onClick={this.handleSubmit}>Submit</button>
                            {/*<LinkInClass className="formADD-buttons"  onClick={this.handleSubmit}/>*/}
                            {/*{errorMessage}*/}

                            <Link className="redCancel-button" to={"/DisplayAllAttractions"}></Link>
                        {/*</div>*/}


                    </Form>
                </div>
            </div>
        )
    }






}