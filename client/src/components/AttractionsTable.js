import React, {Component} from "react"

import AttractionsTableRow from "./AttractionsTableRow";


export default class AttractionsTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            Attractions: this.props.Attractions,

        };
    }


    render() 
    {
        return (

            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>url</th>
                    <th>address Locality</th>
                    <th>address Region</th>
                    <th>tags</th>
                    <th>telephone</th>

                </tr>
                </thead>

                <tbody>
                {this.props.Attractions.map((Attractions) => <AttractionsTableRow key={Attractions._id} Attractions={Attractions}/>)}
                </tbody>
            </table>






        )
    }
}