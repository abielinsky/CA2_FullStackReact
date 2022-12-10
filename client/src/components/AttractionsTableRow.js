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
        let src
        try{
            src='https://maps.google.com/maps?q=' + this.props.Attractions.geo.latitude + ',' + this.props.Attractions.geo.longitude + '&t=&z=15&ie=UTF8&iwloc=&output=embed'
        } catch(err){
            src='https://maps.google.com/maps?q='+this.props.Attractions.name+'&t=&z=15&ie=UTF8&iwloc=&output=embed'
        }
        return (


                <div id="irishAttraction">
               <img className=" attraction-image"
                        src={require(`./Images1/${this.props.Attractions.address.addressLocality}.jpg`)}/>

                   <h4 className="Attractions__name">{this.props.Attractions.name}</h4>
                <iframe src = {src} title={this.props.Attractions.name+"frame"}></iframe>

                     {/*<p className="Attractions__url">{this.props.Attractions.url}</p>*/}

                     <p className="Attractions__addressLocality">{this.props.Attractions.address.addressLocality}</p>

                     <p className="Attractions__addressRegion">{this.props.Attractions.address.addressRegion}</p>

                       <p className="Attractions__telephone">{this.props.Attractions.telephone}</p>


                            <p><span style={{
                                color: "grey",
                                fontStyle: "normal",
                                fontWeight: "bold"
                            }}>Tags: </span>  {this.props.Attractions.tags.join(' | ')} </p>

                            <div id ="alignButton">
                           <Link className= "buttonEdit"
                                      to={"/EditAttractions/" + this.props.Attractions._id}><MdEdit/>Edit</Link>

                             <Link className="buttonDelete"
                                       to={"/DeleteAttractions/" + this.props.Attractions._id}><MdDeleteForever/>Delete</Link>

                            </div>
                </div>


        )
    }

}