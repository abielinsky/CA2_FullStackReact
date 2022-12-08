import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class SelectCheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span
        data-toggle="popover"
        data-trigger="focus"
      >
        <ReactSelect
          options={this.props.values}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option }}
          onChange={this.props.onchange}
          allowSelectAll={true}
          value={this.props.optionselected}
        />
      </span>
    );
  }
}