import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from '../config/global_constants'

export default class DeleteAttractions extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirectToDisplayAllAttractions: false,
        }

    }

    componentDidMount()
    {
        axios.delete(`${SERVER_HOST}/Attractions/${this.props.match.params._id}`)
            .then(res =>
            {


                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // success
                    {
                        console.log("Record deleted")
                    }
                    this.setState({redirectToDisplayAllAttractions:true})
                }
                else
                {
                    console.log("Record not deleted")
                }
            })
    }


    render()
    {

        return (
            <div>
                {this.state.redirectToDisplayAllAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}
            </div>
        )
    }


}