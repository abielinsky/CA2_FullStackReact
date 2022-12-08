import React, { Component } from "react";
import AttractionsTable from "./AttractionsTable";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Link } from "react-router-dom";

export default class DisplayAllAttractions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttractions: [],
            Attractions: [],
            selectedRegion: "Irish Attractions",
        };
    }

    componentDidMount() {
        this.loadData();
    }
    loadData(){
        axios.get(`${SERVER_HOST}/Attractions`).then((res) => {
            if (res.data.length !== 0) {
                console.log(res.data);

                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    console.log("Records read");
                    this.setState({ Attractions: res.data });

                    // this.setState({Attractions: res.data.results});
                    // //////////GET LIST OF UNIQUE REGIONS/////////////////
                    // let IrishRegions = res.data.results.map(attraction => attraction.address.addressRegion);
                    // let uniqueRegions = [...new Set(IrishRegions)].sort();
                    //
                    //
                    // /////ADD "ALL REGIONS" TO THE FRONT OF THE ARRAY/////
                    // uniqueRegions.unshift("Irish Attractions");
                    // console.log(IrishRegions);
                    // console.log(uniqueRegions);
                    // this.setState({selectedAttractions: res.data.results});
                    // this.setState({addressRegion: uniqueRegions});
                }
            } else {
                console.log(this.state.isRecords);
                console.log("Records not found");
            }
        });
    }

    getTags() {
        let tags = [];
        this.state.Attractions.map((Attractions) =>
            tags.push.apply(tags, Attractions.tags)
        );
        return [...new Set(tags)].sort();
    }

    /// CODE TO SORT IN ASCENDING AND DESCENDING ORDER BY NAME///

    handleClick = (e) => {
        if (e.target.value === "Ascending") {
            /// SORT IN ASCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    a.name.localeCompare(b.name)
                ),
            });
        } else {
            /// SORT IN DESCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    b.name.localeCompare(a.name)
                ),
            });
        }
        console.log("sort by name");
    };

    //// CODE TO FILTER ONE REGION OR ALL REGIONS////
    handleAddressRegionsChange = (e) => {
        let Database = this.state.Attractions;
        this.setState({ selectedRegion: e.target.value });
        if (e.target.value === "Irish Attractions") {
            //ALL REGIONS///
            this.setState({ selectedAttractions: Database });
        } //// IRISH ATTRACTION FROM ONE REGION////
        else {
            this.setState({
                selectedAttractions: Database.filter(
                    (attraction) => attraction.address.addressRegion === e.target.value
                ),
            });
        }
    };
    /// CODE TO SORT IN ASCENDING AND DESCENDING ORDER BY ADDRESS REGION///

    handleAddressRegionClick = (e) => {
        if (e.target.value === "Ascending") {
            /// SORT IN ASCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    a.address.addressRegion.localeCompare(b.address.addressRegion)
                ),
            });
        } else {
            /// SORT IN DESCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    b.address.addressRegion.localeCompare(a.address.addressRegion)
                ),
            });
        }
    };

    /// CODE TO SORT IN ASCENDING AND DESCENDING ORDER BY TELEPHONE///

    handleTelephoneClick = (e) => {
        if (e.target.value === "Ascending") {
            /// SORT IN ASCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort(
                    (a, b) => a.telephone - b.telephone
                ),
            });
        } else {
            /// SORT IN DESCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort(
                    (a, b) => b.telephone - a.telephone
                ),
            });
        }
    };

    //===========
    //NOT WORKING, NEED TO CHECK HOW TO SORT AND FILTER THE TAGS
    //===========
    handleTapClick = (e) => {
        if (e.target.value === "Ascending") {
            /// SORT IN ASCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    a.tags.filter(
                        (tag) =>
                            tag.includes(e.target.value) -
                            b.tags.some((tag) => tag.includes(e.target.value))
                    )
                ),
            });
        } else {
            /// SORT IN DESCENDING ORDER///
            this.setState({
                Attractions: this.state.Attractions.sort((a, b) =>
                    b.tags.filter(
                        (tag) =>
                            tag.includes(e.target.value) -
                            a.tags.some((tag) => tag.includes(e.target.value))
                    )
                ),
            });
        }
    };

    handleSearch = (e) => {
        const search = e.target.value.toLowerCase().trim();
        if (search==""){
            this.loadData();
            return;
        }
        this.setState({
            Attractions: this.state.Attractions.filter(
                (attractions) =>
                    attractions.name.toLowerCase().includes(search) ||
                    attractions.address.addressLocality.toLowerCase().includes(search) ||
                    attractions.address.addressRegion.toLowerCase().includes(search) ||
                    attractions.telephone.toLowerCase().includes(search) ||
                    attractions.tags.some((tag) =>
                        tag.toLowerCase().includes(search.toLowerCase())
                    )
            ),
        });
    };

    render() {
        return (
            <div id="form-container">
                <header className="header">
                    <Link className="blue-button" to="/loadDataATTRACTIONS">
                        {" "}
                        Load Data ATTRACTIONS{" "}
                    </Link>
                    <span>&nbsp; | &nbsp; </span>
                    <Link className="blue-button" to="/AddATTRACTIONS">
                        Add new ATTRACTIONS
                    </Link>
                    <span>&nbsp;| &nbsp;</span>
                    <Link className="blue-button" to="/ResetAttractions">
                        Delete All ATTRACTIONS
                    </Link>
                </header>

                <div className="sticky__btns">
                    <div id="sortingDiv">
                        {/*<select  value = {this.state.selectedRegion} onChange={this.handleAddressRegionsChange}>*/}
                        {/*    {*/}
                        {/*        this.state.addressRegion.map(value => <option key={value} value= {value}>{value}</option>)*/}
                        {/*    }*/}
                        {/*</select>*/}
                        <select onChange={this.handleClick}>
                            <option value="Name list">Name List</option>
                            <option value="Ascending">A-Z</option>
                            <option value="Descending">Z-A</option>
                        </select>
                        <select onChange={this.handleAddressRegionClick}>
                            <option value="Name list">Region List </option>
                            <option value="Ascending">A-Z</option>
                            <option value="Descending">Z-A</option>
                        </select>
                        <select onChange={this.handleTelephoneClick}>
                            <option value="Name list">Telephone List </option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>

                        <select onChange={this.handleTapClick}>
                            <option value="Name list">Tap List </option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </div>
                    <br />
                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        onChange={this.handleSearch}
                    />
                </div>

                <div className="form-container">
                    <AttractionsTable Attractions={this.state.Attractions} />
                </div>
            </div>
        );
    }
}
