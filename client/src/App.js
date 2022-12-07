import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/main.css"

import "./App.css";

//import AddCar from "./components/AddCar"
// import EditCar from "./components/EditCar"
// import DeleteCar from "./components/DeleteCar"

import DisplayAllAttractions from "./components/DisplayAllAttractions"
import LoadAttractions from "./components/LoadAttractions";
import EditAttractions from "./components/EditAttractions";
import AddAttractions from "./components/AddAttractions";
import ResetAttractions from "./components/ResetAttractions";
import DeleteAttractions from "./components/DeleteAttractions";
import NavToDisplay from "./components/NavToDisplay";



export default class App extends Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/DisplayAllAttractions" component={DisplayAllAttractions}/>
                    <Route exact path="/LoadAttractions" component={LoadAttractions}/>
                    <Route exact path="/AddAttractions" component={AddAttractions}/>

                    <Route exact path="/ResetAttractions" component={ResetAttractions}/>

                    <Route exact path="/DeleteAttractions/:_id" component={DeleteAttractions}/>
                    <Route exact path="/EditAttractions/:_id" component={EditAttractions}/>
                    <Route exact path="/NavToDisplay" component={NavToDisplay}/>

                    <Route path="*" component={DisplayAllAttractions}/>
                </Switch>
            </BrowserRouter>
        )
    }
}