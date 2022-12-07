import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from '../config/global_constants'


export default class LoadAttractions extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            displayingAttractions:false
        }
    }

    normaliseData(data){
        return data.map(Attractions => {
            if (Attractions.telephone.includes("(0)")) {
                Attractions.telephone = Attractions.telephone.replace("(0)", "")}
            return Attractions})
    }

    componentDidMount()
    {
        let url = 'https://raw.githubusercontent.com/abielinsky/CA2_FullStackReact/2307aee50d78eff3a7a235fdd97df7422df1e253/data/data.json?token=GHSAT0AAAAAAB27LPVMKSMIYQ746GQCDUG6Y4P7UQQ'

        axios.get(url)
            .then( res =>res.data)
            .then (results =>
                {

                    let data = JSON.parse(JSON.stringify(results))

                    data = this.normaliseData(data)
                    axios.post(`${SERVER_HOST}/Attractions`, data)
                        .then(res =>
                        {
                            if(res.data)
                            {
                                console.log(res.data);
                                if (res.data.errorMessage)
                                {
                                    console.log(res.data.errorMessage)
                                }
                                else // success
                                {
                                    console.log("ALL DATA IMPORTED")
                                }
                                this.setState({displayingAttractions:true})
                            }
                            else
                            {

                                alert("DATA OK")
                                this.setState({displayingAttractions:true})
                                console.log("NO DATA")

                            }
                        })
                }
            )
    }



    render()
    {
        return (
            <div>
                {/*{this.state.displayingAttractions ? <Redirect to="/DisplayAllAttractions"/> : null}*/}
            </div>
        )
    }







}