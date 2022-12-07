import React, {Component} from "react"
import {Link} from "react-router-dom";
import {MdAdd, MdDeleteForever, MdEdit} from 'react-icons/md';



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


                    <div className="Attractions__overlay Attractions__overlay--primary">

                        <div className="Attractions__navbar">
                            <li><Link className="red-button"
                            to={"/EditAttractions/" + this.props.Attractions._id}>  <MdEdit/>  Edit</Link>
                            </li>

                            <li> <Link className="red-button"
                            to={"/DeleteAttractions/" + this.props.Attractions._id}>  <MdDeleteForever/>  Delete</Link> </li>

                        </div>


                        <div className="Attractions__name">{this.props.Attractions.name}</div>

                        <div className="Attractions__url">{this.props.Attractions.url}</div>

                        <div className="Attractions__addressLocality">{this.props.Attractions.address.addressLocality}</div>

                        <div className="Attractions__addressRegion">{this.props.Attractions.address.addressRegion}</div>

                        <div className="Attractions__telephone">{this.props.Attractions.telephone}</div>


                        <div className="Attractions_Tags">
                            <p><span style={{
                                color: "grey",
                                fontStyle: "normal",
                                fontWeight: "bold"
                            }}>Tags: </span>  {this.props.Attractions.tags.join(' | ')} </p>
                                {/*{this.props.Attractions.tags.map((tag) => "|" + tag)}  */}
                        </div>


                        <div className="card__footer">

                        </div>



                    </div>


                </div>

            </>

        )
    }

}