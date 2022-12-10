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
            <div className="container">
                {this.props.Attractions.map((attraction) => <AttractionsTableRow key={attraction._id} Attractions={attraction}/>)}
            </div>
        );
    }
}