import React from "react";
import {Button, Dialog, DialogActions, DialogTitle, makeStyles} from "@material-ui/core";
import SelectPerson from "../SelectPerson/SelectPerson";
import DateTimePicker from "../DateTimePicker";
import Duration from "../Duration/Duration";
import {CONFIRM_EDIT_APPOINTMENT, SUCCESS_EDIT_APPOINTMENT} from "../../../constants";


const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 15
  },
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  persons: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  date: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  datePicker: {
    marginRight: 10,
  },
  duration: {
    width: 220,
  }
}));

export default function EditAppointment({
                                          psyches,
                                          clients,

                                          modalConfirm,
                                          modalSuccess,
                                          closeModal,

                                          psych,
                                          client,
                                          dateTime,
                                          duration,

                                          handleEditAppointment,
                                          handleCancelAppointment,
                                          handleChange,
                                          isCanceled, // for the edit's dialog title
                                        }) {

  const classes = useStyles();

  return (
    <div>
      <Dialog className={classes.dialog}
              open={modalConfirm}>
        <DialogTitle className={classes.dialogTitle}>
          Редактировать
        </DialogTitle>
        <div className={classes.persons}>
          <SelectPerson
            value={psych}
            disabled={true}
            handleChange={handleChange}
            name={"psych"}
            label={"Психолог"}
            data={psyches}/>

          <SelectPerson
            value={client}
            disabled={true}
            handleChange={handleChange}
            name={"client"}
            label={"Клиент"}
            data={clients}/>
        </div>

        <div className={classes.date}>
          <DateTimePicker
            value={dateTime}
            handleChange={handleChange}
            name={"dateTime"}
            addStyle={classes.datePicker}/>

          <Duration
            value={duration}
            handleChange={handleChange}
            name="duration"
            addStyle={classes.duration}
            label="Длительность"/>
        </div>


        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            color={"secondary"}
            onClick={handleCancelAppointment}>
            Отменить встречу
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={handleEditAppointment}>
            Перенести встречу
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => closeModal(CONFIRM_EDIT_APPOINTMENT)}>
            Нет
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalSuccess}>
        <DialogTitle className={classes.dialogTitle}>
          {isCanceled ? "Встреча отменена" : "Встреча перенесена"}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => closeModal(SUCCESS_EDIT_APPOINTMENT)}>
            ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
