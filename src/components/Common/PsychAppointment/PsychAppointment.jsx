import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  CONFIRM_CONNECT_PSYCH_TO_CLIENT,
  SUCCESS_CONNECT_PSYCH_TO_CLIENT
} from "../../../constants";

class PsychAppointment extends Component {
  state = {
    psych: {}
  };

  componentDidMount() {
    const { client, psychs } = this.props;

    const personalPsych = psychs.find(
      psych => psych._id === client.personalPsych
    );

    // const psychName = `${personalPsych.lastName} ${
    //   personalPsych.firstName[0]
    // }. ${personalPsych.middleName[0]}.`;
    // console.log(psychName);

    if (personalPsych) this.setState({ psych: personalPsych });
  }

  getPsychName = psych =>
    `${psych.lastName} ${psych.firstName[0]}. ${psych.middleName[0]}.`;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  connectPsychToClient = () => {
    const couple = {
      clientID: this.props.client._id,
      psychID: this.state.psych._id
    };

    if (this.state.psych)
      this.props.connectPsychToClient(this.props.token, couple);
  };

  render() {
    const {
      psychs,
      classes,
      modalConfirmConnectPsychToClient,
      modalSuccessConnectPsychToClient,
      openModal,
      closeModal
    } = this.props;
    console.log(this.state.psych);

    return (
      <div className={classes.container}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="psych-select">Психолог</InputLabel>
          <Select
            value={this.state.psych}
            onChange={this.handleChange("psych")}
            input={
              <OutlinedInput labelWidth={80} name="psych" id="psych-select" />
            }
          >
            {psychs.map(psych => (
              <MenuItem value={psych} key={psych._id}>
                {this.getPsychName(psych)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={classes.containerButton}>
          <Button
            variant="outlined"
            onClick={() => openModal(CONFIRM_CONNECT_PSYCH_TO_CLIENT)}
          >
            Назначить психолога
          </Button>
        </div>

        <Dialog open={modalConfirmConnectPsychToClient}>
          <DialogTitle>
            Вы уверены, что хотите назначить нового психолога?
          </DialogTitle>

          <DialogActions>
            <Button variant="outlined" onClick={this.connectPsychToClient}>
              да
            </Button>

            <Button
              variant="outlined"
              onClick={() => closeModal(CONFIRM_CONNECT_PSYCH_TO_CLIENT)}
            >
              нет
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={modalSuccessConnectPsychToClient}>
          <DialogTitle>Новый психолог назначен</DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => closeModal(SUCCESS_CONNECT_PSYCH_TO_CLIENT)}
            >
              ок
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    maxWidth: 450,
    margin: 10
  },
  formControl: {
    width: "100%"
  },
  containerButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 15
  }
});

const PsychAppointmentComponent = withStyles(styles)(PsychAppointment);

export default PsychAppointmentComponent;
