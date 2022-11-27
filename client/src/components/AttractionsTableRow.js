import React, {Component} from "react"


export default class AttractionsTableRow extends Component
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.Attractions.name}</td>
                <td>{this.props.Attractions.url}</td>
                <td>{this.props.Attractions.address.addressLocality}</td>
                <td>{this.props.Attractions.address.addressRegion}</td>




                <td>{this.props.Attractions.telephone}</td>

            </tr>
        )
    }
}