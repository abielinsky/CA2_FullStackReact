import React, {Component} from "react"
import {Link} from "react-router-dom";


export default class NavToDisplay extends Component {

    render() {
        return (

            <div className="form-container">

                <header className="header">

                    <Link className="blue-button" to="/loadDataATTRACTIONS"> Load Data ATTRACTIONS </Link><span>&nbsp;  | &nbsp; </span>
                    {/*<Link className="blue-button" to="/DisplayAllATTRACTIONS"> Display All ATTRACTIONS <span>| </span></Link>&nbsp;*/}
                    <Link className="blue-button" to="/AddATTRACTIONS">Add new ATTRACTIONS</Link><span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/DeleteAllATTRACTIONS">Delete All ATTRACTIONS</Link>

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






