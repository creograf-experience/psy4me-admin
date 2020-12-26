import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {OutlinedInput} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  }
}));


export default function Duration({
                                   name,
                                   label,
                                   value,
                                   handleChange,
                                   addStyle
                                 }) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={`${classes.formControl} ${addStyle}`}>
      <InputLabel htmlFor="outlined-native-simple">{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        input={
          <OutlinedInput
            labelWidth={110}
            name={name}
            id={`${name}-select`}
          />
        }
      >
        <MenuItem value={60}>1 час</MenuItem>
        <MenuItem value={90}>1,5 часа</MenuItem>
        <MenuItem value={120}>2 часа</MenuItem>
      </Select>
    </FormControl>
  )
}