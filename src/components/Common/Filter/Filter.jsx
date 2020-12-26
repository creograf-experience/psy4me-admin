import React from "react";
import {
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const FilterComponent = ({
  placeholder,
  filterNameValue,
  textFieldName,
  onChangeFilterName,
  filterCategoryValue,
  filterCategoryName,
  onChangeFilterCategory,
  filterData,
  classes
}) => (
  <div className={classes.container}>
    <TextField
      variant="outlined"
      name={textFieldName}
      placeholder={placeholder}
      value={filterNameValue}
      onChange={onChangeFilterName}
      className={classes.textField}
    />

    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        value={filterCategoryValue}
        onChange={onChangeFilterCategory}
        input={<OutlinedInput name={filterCategoryName} labelWidth={0} />}
      >
        {filterData.map(el => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      flexDirection: "row"
    }
  },
  textField: {
    "@media (min-width: 768px)": {
      width: 210
    }
  },
  formControl: {
    marginTop: 15,
    "@media (min-width: 768px)": {
      width: 210,
      marginTop: 0,
      marginLeft: 20
    }
  }
});

export const Filter = withStyles(styles)(FilterComponent);
