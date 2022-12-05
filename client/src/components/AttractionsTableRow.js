import React, {Component} from "react"


export default class AttractionsTableRow extends Component
{
constructor(props) {
        super(props);
        this.state = {
                    Attractions: this.props.Attractions,
        }
    }
    render() 
    {
        return (
            <tr>
                <td>{this.props.Attractions.name}</td>
                <td>{this.props.Attractions.url}</td>
                <td>{this.props.Attractions.address.addressLocality}</td>
                <td>{this.props.Attractions.address.addressRegion}</td>
                <td>{this.props.Attractions.tags.map((tag) => "||" +tag )}</td>
                <td>{this.props.Attractions.telephone}</td>

            </tr>
        )
    }
}