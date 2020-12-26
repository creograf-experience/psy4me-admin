import React from "react";
import {Button, Dialog, DialogActions, DialogTitle, makeStyles} from "@material-ui/core";
import SelectPerson from "../SelectPerson/SelectPerson";
import DateTimePicker from "../DateTimePicker";
import Duration from "../Duration/Duration";
import {CONFIRM_MAKE_APPOINTMENT, SUCCESS_MAKE_APPOINTMENT} from "../../../constants";

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

export default function NewAppointment({
                                         userType,

                                         psyches,
                                         clients,

                                         psych,
                                         client,
                                         dateTime,
                                         duration,

                                         handleChange,
                                         handleMakeAppointment,

                                         modalConfirm,
                                         modalSuccess,

                                         closeModal,
                                         onOpenNewConsultationModal
                                       }) {

  const classes = useStyles();

  return (
    <div>
      <div className={classes.containerButton}>
        <Button
          variant="outlined"
          onClick={onOpenNewConsultationModal}>
          Назначить встречу
        </Button>
      </div>

      <Dialog
        className={classes.dialog}
        open={modalConfirm}>
        <DialogTitle className={classes.dialogTitle}>
          Назначить консультацию
        </DialogTitle>

        <div className={classes.persons}>
          <SelectPerson
            value={psych}
            handleChange={handleChange}
            disabled={true}
            name={"psych"}
            label={"Психолог"}
            data={psyches}/>

          <SelectPerson
            value={client}
            disabled={userType === 'client'}
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
            variant="outlined"
            onClick={handleMakeAppointment}>
            Назначить
          </Button>

          <Button
            variant="outlined"
            onClick={() => closeModal(CONFIRM_MAKE_APPOINTMENT)}>
            Нет
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalSuccess}>
        <DialogTitle className={classes.dialogTitle}>
          Встреча назначена
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => closeModal(SUCCESS_MAKE_APPOINTMENT)}>
            ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
