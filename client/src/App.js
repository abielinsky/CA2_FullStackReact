import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"


import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/main.css"

//import AddCar from "./components/AddCar"
// import EditCar from "./components/EditCar"
// import DeleteCar from "./components/DeleteCar"

import DisplayAllAttractions from "./components/DisplayAllAttractions"
import LoadAttractions from "./components/LoadAttractions";
import AddAtractions from "./components/AddAtractions";

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/DisplayAllAttractions" component={DisplayAllAttractions}/>
                    <Route exact path="/LoadAttractions" component={LoadAttractions}/>
                    <Route exact path="/AddAttraction" component={AddAtractions}/>

                    <Route path="*" component={DisplayAllAttractions}/>
                </Switch>
            </BrowserRouter>
        )
    }
}