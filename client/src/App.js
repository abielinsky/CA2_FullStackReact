import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"


import AddCar from "./components/others/AddCar"
import EditCar from "./components/others/EditCar"
import DeleteCar from "./components/others/DeleteCar"
import DisplayAllAttractions from "./components/DisplayAllAttractions"
import getAttractionsData from "./components/getAttractionsData";

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={DisplayAllAttractions} />


                    {/*<Route exact path="/AddCar" component={AddCar} />*/}
                    {/*<Route exact path="/EditCar/:id" component={EditCar} />*/}
                    {/*<Route exact path="/DeleteCar/:id" component={DeleteCar} />*/}


                    <Route exact path="/DisplayAllAttractions" component={DisplayAllAttractions}/>
                    <Route path="*" component={DisplayAllAttractions}/>
                </Switch>
            </BrowserRouter>
        )
    }
}