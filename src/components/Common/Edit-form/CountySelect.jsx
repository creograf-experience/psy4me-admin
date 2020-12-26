import React, { Component } from "react";
import { TextField, MenuItem, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Select from "react-select";

import { countries } from "../../../constants";

class CountrySelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        value: props.country,
        label: props.country
      }
    };
  }

  onChange = option => {
    const { handleChangeCounty } = this.props;

    this.setState({ option });
    if (option) {
      handleChangeCounty(option.value);
    }
  };

  render() {
    const { classes } = this.props;

    const inputComponent = ({ inputRef, ...props }) => {
      return <div ref={inputRef} {...props} />;
    };

    const Control = props => {
      return (
        <TextField
          variant="outlined"
          fullWidth
          InputProps={{
            inputComponent,
            inputProps: {
              className: props.selectProps.classes.input,
              inputRef: props.innerRef,
              children: props.children,
              ...props.innerProps
            }
          }}
          {...props.selectProps.textFieldProps}
        />
      );
    };

    const Option = props => {
      return (
        <MenuItem
          buttonRef={props.innerRef}
          selected={props.isFocused}
          component="div"
          style={{
            fontWeight: props.isSelected ? 500 : 400
          }}
          {...props.innerProps}
        >
          {props.children}
        </MenuItem>
      );
    };

    const Menu = props => {
      return (
        <Paper
          square
          className={props.selectProps.classes.paper}
          {...props.innerProps}
        >
          {props.children}
        </Paper>
      );
    };

    const NoOptionsMessage = props => {
      return (
        <Typography
          color="textSecondary"
          className={props.selectProps.classes.noOptionsMessage}
          {...props.innerProps}
        >
          {"Не найдено ни одной страны"}
        </Typography>
      );
    };

    const components = {
      Control,
      Option,
      Menu,
      NoOptionsMessage
    };

    const options = countries.map(country => ({
      value: country,
      label: country
    }));

    return (
      <Select
        classes={classes}
        value={this.state.option}
        options={options}
        onChange={this.onChange}
        components={components}
        placeholder="Выберите страну из списка"
        isClearable
      />
    );
  }
}

const styles = theme => ({
  input: {
    display: "flex",
    height: 45,
    padding: 5
  },
  paper: {
    position: "absolute",
    zIndex: 10,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  noOptionsMessage: {
    padding: 10
  }
});

const CountrySelect = withStyles(styles)(CountrySelectComponent);

export default CountrySelect;
