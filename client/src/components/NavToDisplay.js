import React, {Component} from "react"
import {Link} from "react-router-dom";


export default class NavToDisplay extends Component {

    render() {
        return (

            <div className="form-container">

                <header className="header">

                    <Link className="blue-button" to="/loadData"> Load ATTRACTIONS </Link><span>&nbsp;  | &nbsp; </span>
                    <Link className="blue-button" to="/AddMovie">Add ATTRACTION</Link><span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/DeleteAllMovie">Delete ALL ATTRACTIONS</Link>

                </header>
                <div className="sticky__btns">



                </div>



                <div className="no__records">

                    <a className="msg">NO DATA TO DISPLAY!! </a>

                </div>

            </div>
        )
    }
}






