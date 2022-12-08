import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from '../config/global_constants'


export default class getAttractionsData extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            gettingAllData : false
        }
    }

    componentDidMount() {

        let url = 'https://raw.githubusercontent.com/abielinsky/CA2_FullStackReact/master/data/data.json?token=GHSAT0AAAAAAB3JJ3TWAX6BBN5E2LVUNVK4Y337TYA'

        axios.get(url)
            .then(res => res.data.Attractions)
            .then(results => {
                console.log(results)
                let data = JSON.parse(JSON.stringify(results))
                console.log(data)

                axios.post(`${SERVER_HOST}/Attractions`, data)
                    .then(res =>
                        {
                            // if(res.data)
                            // {
                            //     console.log(res.data);
                            //     if (res.data.errorMessage)
                            //     {
                            //         console.log(res.data.errorMessage)
                            //     }
                            //     else
                            //     {
                            //         console.log("DATA OK")
                            //     }
                            //     this.setState({getAttractionsData:true})
                            // }
                            // else
                            // {
                            //
                            //     alert("DATA LOADED")
                            //     this.setState({getAttractionsData:true})
                            //     console.log("ERROR NO DATA")
                            //
                            // }


                        }
                    )



            })



    }

    render()
    {
        return  (
            <div>
                {this.state.getAttractionsData ? <Redirect to = "/DisplayAllAttractions"/> : null  }
            </div>
        )

    }




}

