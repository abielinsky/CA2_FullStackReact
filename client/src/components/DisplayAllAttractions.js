import React, { Component } from "react";
import AttractionsTable from "./AttractionsTable";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Link } from "react-router-dom";
import { default as SelectCheckBox } from "./SelectCheckBox";
import { getTags, getTypes, getRegions, getLocalities } from "./getData";

export default class DisplayAllAttractions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAttractions: [],
      AllAttractions: [],
      Attractions: [],
      selectedRegion: "Irish Attractions",

      tagSelected: null,
      tags: [],

      typeSelected: null,
      types: [],

      regionSelected: null,
      regions: [],

      localitySelected: null,
      lalities: [],
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    axios.get(`${SERVER_HOST}/Attractions`).then((res) => {
      if (res.data.length !== 0) {
        //console.log(res.data);
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {

          this.setState({
            Attractions: res.data,
            AllAttractions: res.data
          });

        }
      } else {
        console.log(this.state.isRecords);
        console.log("Records not found");
      }
    });

    this.setState({ 
      tags: await getTags(),
      types: await getTypes() , 
      regions: await getRegions(),
      localities: await getLocalities(),
    });
    this.setState({ });
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
  handleAddressLocalityClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN ASCENDING ORDER///
      this.setState({
        Attractions: this.state.Attractions.sort((a, b) =>
          a.address.addressLocality.localeCompare(b.address.addressLocality)
        ),
      });
    } else {
      /// SORT IN DESCENDING ORDER///
      this.setState({
        Attractions: this.state.Attractions.sort((a, b) =>
          b.address.addressLocality.localeCompare(a.address.addressLocality)
        ),
      });
    }
  };
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

  handleSearch = (e) => {
    const search = e.target.value.toLowerCase().trim();
    if (search == "") {
      this.loadData();
      return;
    }

    this.setState({
      Attractions: this.state.Attractions.filter(
        (attractions) =>
          attractions.name.toLowerCase().includes(search) ||
          attractions.address.addressLocality.toLowerCase().includes(search) ||
          attractions.address.addressRegion.toLowerCase().includes(search) ||
          attractions.telephone.toLowerCase().includes(search)
        || attractions.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
      ),
    });
  };
  /* search by: multi-selection values  */
  handleFilterTagsChange = (selected) => {
    var selectedTags = selected.map((x) => x.value);
    var filtered = this.state.Attractions.filter((attraction) =>
      attraction.tags.some((tag) => selectedTags.includes(tag))
    );

    if (selectedTags.length === 0) filtered = this.state.AllAttractions;

    this.setState({
      tagSelected: selected,
      Attractions: filtered,
    });

    console.log(selectedTags, " => ", filtered.length);
  };

  handleFilterTypesChange = (selected) => {
    var selectedTypes = selected.map((x) => x.value);
    var filtered = this.state.Attractions.filter((attraction) =>
      attraction["@type"].some((tag) => selectedTypes.includes(tag))
    );
    if (selectedTypes.length === 0) filtered = this.state.AllAttractions;

    this.setState({
      typeSelected: selected,
      Attractions: filtered,
    });

    console.log(selectedTypes, " => ", filtered.length);
  };

  handleFilterLocalitiesChange = (selected) => {
    var selectedValues = selected.map((x) => x.value);
    var data = this.state.Attractions;
    var filtered = data.filter((attraction) =>
      selectedValues.includes(attraction.address.addressLocality)
    );
    if (selectedValues.length === 0) filtered = this.state.AllAttractions;

    this.setState({
      localitySelected: selected,
      Attractions: filtered,
    });

    console.log(selected, "=>", filtered.length);
  };

  handleFilterRegionChange = (selected) => {
    var selectedValues = selected.map((x) => x.value);
    var filtered = this.state.Attractions.filter((attraction) =>
      selectedValues.includes(attraction.address.addressRegion)
    );
    if (selectedValues.length === 0) filtered = this.state.AllAttractions;

    this.setState({
      regionSelected: selected,
      Attractions: filtered,
    });
    console.log(selected, "=>", filtered.length);
  };

  render() {
    return (
        <div>
        <header>
          <div id="topbar" className="hide-s hide-m">
            <div className="line">

              <div className="s-12 m-6 l-6">
                <div className="social right">
                  <a><i className="icon-facebook_circle"></i></a> <a><i
                    className="icon-twitter_circle"></i></a> <a><i className="icon-google_plus_circle"></i></a>
                  <a><i className="icon-instagram_circle"></i></a>
                </div>
              </div>
            </div>
          </div>
          <nav>

            <div className="line">
              <div className="m-12 l-2">
                {/*<img src={ (`.Images/headerImage.png`)}/>*/}
              </div>


              <div className="top-nav s-12 l-10">
                <input id="search" type="text" placeholder="     Search" onChange= {this.handleSearch}/>
                <ul className="right">
                  <li className="active-item"><a href="#carousel">Home</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#about-us">About Us</a></li>
                  <li><a href="#our-work">Our Work</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>


      <div id="listFilter">

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


        <div className="sticky__btns">
          <div id="sortingDiv">
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
            <select onChange={this.handleAddressLocalityClick}>
              <option value="Name list">address Locality</option>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
          </div>
          <br />

          <SelectCheckBox
            values={this.state.tags}
            onchange={this.handleFilterTagsChange}
            optionselected={this.state.tagSelected}
          />
          <SelectCheckBox
            values={this.state.types}
            onchange={this.handleFilterTypesChange}
            optionselected={this.state.typeSelected}
          />

          <SelectCheckBox
            values={this.state.localities}
            onchange={this.handleFilterLocalitiesChange}
            optionselected={this.state.localitySelected}
          />
          <SelectCheckBox
            values={this.state.regions}
            onchange={this.handleFilterRegionChange}
            optionselected={this.state.regionSelected}
          />
        </div>

        <div>
          <AttractionsTable Attractions={this.state.Attractions} />
        </div>
      </div>
        </div>
    );
  }
}
