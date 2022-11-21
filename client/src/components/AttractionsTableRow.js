import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class AttractionsTableRow extends Component
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.Attractions.name}</td>
                <td>{this.props.Attractions.url}</td>
                <td>{this.props.Attractions.telephone}</td>

                <td>
                    {/*<Link className="green-button" to={"/EditCar/" + this.props.models._id}>Edit</Link>     */}
                    {/*<Link className="red-button" to={"/DeleteCar/" + this.props.models._id}>Delete</Link>   */}
                </td>
            </tr>
        )
    }
}