import React from "react";
import {FormControl, MenuItem, OutlinedInput, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DateTimePicker from "../DateTimePicker";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      flexDirection: "row"
    }
  },
  timeRange: {
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      flexDirection: "row",
    },
    marginTop: 10,
  },
  time: {
    marginRight: 20,
  },
  textField: {
    "@media (min-width: 768px)": {
      width: 220
    }
  },
  formControl: {
    marginTop: 15,
    "@media (min-width: 768px)": {
      width: 220,
      marginTop: 0,
      marginLeft: 20
    }
  },
  checkboxes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
}));

export default function FilterPayments({
                                         placeholder,
                                         filterNameValue,
                                         textFieldName,
                                         handleChange,
                                         filterCategoryValue,
                                         filterData,
                                         from,
                                         to,
                                         paymentOptions,
                                         handleCheckboxChange,
                                       }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <TextField
          variant="outlined"
          name={textFieldName}
          placeholder={placeholder}
          value={filterNameValue}
          onChange={handleChange}
          className={classes.textField}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={filterCategoryValue}
            onChange={handleChange}
            input={<OutlinedInput name={"paymentStatus"} labelWidth={0}/>}
          >
            {filterData.map(({value, name}) => (
              <MenuItem value={value} key={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.timeRange}>
        <DateTimePicker name={"from"}
                        value={from}
                        label={"С"}
                        addStyle={classes.time}
                        handleChange={handleChange}/>

        <DateTimePicker name={"to"}
                        value={to}
                        label={"По"}
                        handleChange={handleChange}/>
      </div>

      <div className={classes.checkboxes}>
        <CheckboxGroup checkboxes={paymentOptions}
                       handleChange={handleCheckboxChange}/>
      </div>
    </div>
  )
}

