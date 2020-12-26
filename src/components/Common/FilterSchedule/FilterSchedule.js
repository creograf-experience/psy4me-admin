import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DateTimePicker from "../DateTimePicker";
import SelectPerson from "../SelectPerson/SelectPerson";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleTimeRange: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  psychClientChoose: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10
  },
  time: {
    marginRight: 10,
  }
}));

function FilterSchedule({
                          from,
                          handleFromChange,
                          to,
                          handleToChange,
                          psych,
                          handlePsychChange,
                          client,
                          handleClientChange,
                          psychs,
                          clients
                        }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.scheduleTimeRange}>
        <DateTimePicker name={"from"}
                        value={from}
                        label={"С"}
                        addStyle={classes.time}
                        handleChange={handleFromChange}/>

        <DateTimePicker name={"to"}
                        value={to}
                        label={"По"}
                        addStyle={classes.time}
                        handleChange={handleToChange}/>
      </div>

      <div className={classes.psychClientChoose}>
        <SelectPerson value={psych}
                      handleChange={handlePsychChange}
                      name={"psych"}
                      label={"Психолог"}
                      data={psychs}/>

        <SelectPerson value={client}
                      handleChange={handleClientChange}
                      name={"client"}
                      label={"Клиент"}
                      data={clients}/>
      </div>
    </div>
  )
}

export default FilterSchedule;