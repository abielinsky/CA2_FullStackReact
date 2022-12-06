import React, {Component} from "react"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"
import {Link, Redirect} from "react-router-dom";
import {GiCancel} from 'react-icons/gi'
import LinkInClass from "../components/LinkInClass"

export default class EditAttractions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            url: "",
            AddressLocality: "",
            AddressRegion: "",
            telephone: "",
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
            redirectToDisplayAllAttractions: false,
            isTagsChecked: false,
        }
    }

    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/Attractions/${this.props.match.params._id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        this.setState({
                            name: res.data.name,
                            url: res.data.url,
                            AddressLocality: res.data.AddressLocality,
                            AddressRegion: res.data.AddressRegion,
                            telephone: res.data.telephone,
                            Tags: res.data.Tags
                        })
                    }
                } else {
                    console.log(`INFO NOT FOUND`)
                }
            })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleTagsChange = (e) => {

        const tag = e.target.nextSibling.textContent

        console.log(tag)

        const isChecked = e.target.checked
        console.log(isChecked)

        console.log(this.state.tags)
        //  this.setState({tags: []})
        console.log(this.state.tags)

        // if(this.state.tags !== null){
        //     this.setState({tags: [] })
        //     // this.setState((prevState) => ({
        //     //     tags: [...prevState.tags, tag]
        //     // }))
        // }


        if (isChecked) {
            this.setState({tags: []})
            this.setState((prevState) => ({
                tags: [...prevState.tags, tag]
            }))

            this.setState({isTagsChecked: true})
        } else {
            const newTag = this.state.tags.filter((g) => g !== tag)
            this.setState({tags: newTag})
            this.setState({isTagsChecked: false})
        }
        console.log(this.state.tags)
    }


    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({wasSubmittedAtLeastOnce: true})

        const formInputsState = this.validate()

        if (Object.keys(formInputsState).every(index => formInputsState[index])) {
            const AtractionsObject = {
                name: this.state.name,
                url: this.state.url,
                AddressLocality: this.state.AddressLocality,
                AddressRegion: this.state.AddressRegion,
                telephone: this.state.telephone,
                Tags: this.state.Tags,

            }

            axios.put(`${SERVER_HOST}/Atractions/${this.props.match.params._id}`, AtractionsObject)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log(`UPDATED DATA`)
                            this.setState({redirectToDisplayAllAttractions: true})
                        }
                    } else {
                        console.log(`DATA NO UPDATED`)
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

    render() {

        let nameErrorMessage = ""
        let urlErrorMessage = ""
        let AddressLocalityErrorMessage = ""
        let AddressRegionErrorMessage = ""
        let telephoneErrorMessage = ""
        let TagsErrorMessage = ""


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



        return (
            <div className="formAdd__body">

                <header className="header">

                    <Link className="blue-button" to="/loadDataATTRACTIONS"> Load Data
                        ATTRACTIONS </Link><span>&nbsp;  | &nbsp; </span>
                    <Link className="blue-button" to="/DisplayAllATTRACTIONS"> Display All
                        ATTRACTIONS <span>| </span></Link>&nbsp;
                    <Link className="blue-button" to="/AddATTRACTIONS">Add new
                        ATTRACTIONS</Link><span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/DeleteAllATTRACTIONS">Delete All ATTRACTIONS</Link>

                </header>

                <div className="wrapperAdd">

                    {this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllATTRACTIONS"/> : null}

                    <Form className="addForm__container">
                        <h2 className="title_editForm">EDIT ATTRACTION </h2>

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
                                value={this.state.name}
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
                                value={this.state.url}
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
                                value={this.state.AddressLocality}
                                // ref={(input) => {
                                //     this.inputToFocus = input;
                                // }}
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
                                value={this.state.AddressRegion}
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
                                value={this.state.telephone}
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


                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                        {/*<LinkInClass className="formADD-buttons"  onClick={this.handleSubmit}/>*/}



                        <Link className="redCancel-button" to={"/DisplayAllAttractions"}><GiCancel/></Link>
                        {/*</div>*/}


                    </Form>
                </div>
            </div>
        )
    }












}







