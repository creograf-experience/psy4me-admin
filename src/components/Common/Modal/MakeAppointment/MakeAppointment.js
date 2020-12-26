import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle, makeStyles} from "@material-ui/core";
import {
  CONFIRM_EDIT_APPOINTMENT,
  CONFIRM_MAKE_APPOINTMENT,
  SUCCESS_EDIT_APPOINTMENT,
  SUCCESS_MAKE_APPOINTMENT
} from "../../../../constants";
import SelectPerson from "../../SelectPerson/SelectPerson";
import DateTimePicker from "../../DateTimePicker";
import Duration from "../../Duration/Duration";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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

export default function MakeAppointmentComponent({
                                                   token,

                                                   psychs,
                                                   clients,

                                                   modalConfirmMakeAppointment,
                                                   modalSuccessMakeAppointment,
                                                   modalConfirmEditAppointment,
                                                   modalSuccessEditAppointment,

                                                   openModal,
                                                   closeModal,

                                                   makeAppointment,

                                                   psychToEdit,
                                                   clientToEdit,
                                                   dateTimeToEdit,
                                                   durationToEdit,

                                                   handleEditAppointment,
                                                   handleCancelAppointment,
                                                   handleEditChange,
                                                   isCanceled, // for the edit's dialog title
                                                   openEditModal,
                                                 }) {

  const [psych, setPsych] = useState("");
  const [client, setClient] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [duration, setDuration] = useState(60);

  const handleChange = (setFunc, event) => {
    setFunc(event.target.value);
  }

  const handleMakeAppointment = () => {
    if (!client || !psych) {
      return;
    }

    const couple = {
      client: client,
      psych: psych,
      date: new Date(dateTime).getTime(),
      durationInMinutes: duration,
      status: "assigned"
    }

    makeAppointment(token, couple);
  }

  const classes = useStyles();

  return (
    <div>
      <div className={classes.containerButton}>
        <Button
          variant="outlined"
          onClick={() => openModal(CONFIRM_MAKE_APPOINTMENT)}>
          Назначить встречу
        </Button>
      </div>

      <Dialog
        className={classes.dialog}
        open={modalConfirmMakeAppointment}>
        <DialogTitle className={classes.dialogTitle}>
          Назначить консультацию
        </DialogTitle>

        <div className={classes.persons}>
          <SelectPerson
            value={psych}
            handleChange={(e) => handleChange(setPsych, e)}
            name={"psych"}
            label={"Психолог"}
            data={psychs}/>

          <SelectPerson
            value={client}
            handleChange={(e) => handleChange(setClient, e)}
            name={"client"}
            label={"Клиент"}
            data={clients}/>
        </div>

        <div className={classes.date}>
          <DateTimePicker
            value={dateTime}
            handleChange={(e) => handleChange(setDateTime, e)}
            name={"dateTime"}
            addStyle={classes.datePicker}/>

          <Duration
            value={duration}
            handleChange={(e) => handleChange(setDuration, e)}
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

      <Dialog open={modalSuccessMakeAppointment}>
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

      {openEditModal &&
      <div>
        <Dialog className={classes.dialog} open={modalConfirmEditAppointment}>
          <DialogTitle className={classes.dialogTitle}>
            Редактировать
          </DialogTitle>

          <div className={classes.persons}>
            <SelectPerson
              value={psychToEdit}
              disabled={true}
              handleChange={handleEditChange}
              name={"psychToEdit"}
              label={"Психолог"}
              data={psychs}/>

            <SelectPerson
              value={clientToEdit}
              disabled={true}
              handleChange={handleEditChange}
              name={"clientToEdit"}
              label={"Клиент"}
              data={clients}/>
          </div>

          <div className={classes.date}>
            <DateTimePicker
              value={dateTimeToEdit}
              handleChange={handleEditChange}
              name={"dateTimeToEdit"}
              addStyle={classes.datePicker}/>

            <Duration
              value={durationToEdit}
              handleChange={handleEditChange}
              name="durationToEdit"
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

        <Dialog open={modalSuccessEditAppointment}>
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
      </div>}
    </div>
  )
}