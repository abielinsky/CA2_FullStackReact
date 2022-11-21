import React, {Component} from "react"
import AttractionsTableRow from "./AttractionsTableRow"


export default class AttractionsTable extends Component
{

    constructor(props) {
        super(props);
        this.state = {Attractions: this.props.Attractions}
    }

    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>URL</th>
                        <th>TELEPHONE</th>


                    </tr>
                </thead>

                <tbody>
                    {this.props.Attractions.map((Attraction) => <AttractionsTableRow key={Attraction._id} attraction={Attraction}/>)}
                </tbody>
            </table>
        )
    }
}