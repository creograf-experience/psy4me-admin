import React, {useEffect, useState} from "react";
import Chart from "../Chart";
import {makeStyles} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';


const useStyles = makeStyles((theme) => ({
  charts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }
}));

const Filter = ({filter, handleChange}) =>
  (<MuiPickersUtilsProvider utils={MomentUtils}>
    <div style={{padding: 10, display: "flex", justifyContent: "center"}}>
      <KeyboardDatePicker
        style={{width: 210}}
        size={"small"}
        autoOk
        variant="inline"
        inputVariant="outlined"
        views={["month", "year"]}
        label="Выберите период"
        value={filter}
        InputAdornmentProps={{position: "start"}}
        onChange={handleChange}
      />
    </div>
  </MuiPickersUtilsProvider>)

export default function ChartsComponent({token, getChartData, charts}) {
  const [filter, setFilter] = useState(new Date());

  useEffect(() => {
    getChartData(token, filter);
  }, [filter])

  const handleFilterChange = (event) => setFilter(event);

  const classes = useStyles();

  return (
    <div className={classes.charts}>
      <Filter
        filter={filter}
        handleChange={handleFilterChange}/>

      <div>
        {charts && charts.map(chart =>
          (<Chart key={chart.title} chart={chart}/>))}
      </div>
    </div>
  );
}