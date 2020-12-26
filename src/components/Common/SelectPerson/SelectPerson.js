import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: 10,
    width: 220
  },
  disabledInput: {
    color: theme.palette.text.primary,
  },
}));

export default function SelectPerson({
                                       label,
                                       name,
                                       handleChange,
                                       value,
                                       data,
                                       disabled = false
                                     }) {

  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="psych-select">{label}</InputLabel>
      <Select
        displayEmpty
        value={value}
        onChange={handleChange}
        disabled={disabled}
        classes={{disabled: classes.disabledInput}}
        input={
          <OutlinedInput
            labelWidth={75}
            name={name}
            id={`${name}-select`}
          />
        }
      >
        <MenuItem value={""} key={'empty'}/>
        {data && data.map(({_id, lastName}) => (
          <MenuItem value={_id} key={_id}>
            {lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}