import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 220,
    padding: 0
  }
}));

export default function DateTimePicker({
                                         name,
                                         label,
                                         value,
                                         handleChange,
                                         addStyle
                                       }) {
  const classes = useStyles();

  return (
    <form className={`${classes.textField} ${addStyle}`} noValidate>
      <TextField
        variant={"outlined"}
        type="datetime-local"
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}