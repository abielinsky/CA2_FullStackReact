import React, {Component} from "react"
import {Link} from "react-router-dom";


export default class AttractionsTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
                    Attractions: this.props.Attractions,
        }
    }
    render() {
        return (

            <>

                <div className="Attractions__container">


                    <div className="AttractionsPrimary">

                        <div className="Attractions__navbar">
                            <li><Link className="green__button"
                                      to={"/EditAttraction/" + this.props.Attractions._id}> Edit</Link>
                            </li>
                            <li><Link className="red__button" to={"/DeleteAttraction/" + this.props.Attractions._id}>
                                Delete</Link></li>

                        </div>


                        <div className="Attraction__name">{this.props.Attractions.name}</div>

                        <div className="Attraction__url">{this.props.Attractions.url}</div>

                        <div className="Attraction__addressLocality">{this.props.Attractions.address.addressLocality}</div>

                        <div className="Attraction__addressRegion">{this.props.Attractions.address.addressRegion}</div>

                        <div className="Attraction__telephone">{this.props.Attractions.telephone}</div>


                        <div className="Attractions_Tags"> {this.props.Attractions.tags.map((tag) => "|" + tag)}  </div>


                    </div>
                </div>

            </>

        )
    }

}