import React, { Component } from "react";
import {
  Avatar,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

import CountrySelect from "./CountySelect";

import {
  url,
  EDIT_PSYCH_SUCCESS,
  EDIT_PSYCH_FAILED,
  BAN_PSYCH_SUCCESS,
  BAN_PSYCH_FAILED,
  CONFIRM_DELETE_PSYCH,
  DELETE_PSYCH_SUCCESS,
  DELETE_PSYCH_FAILED,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILED,
  BAN_CLIENT_SUCCESS,
  BAN_CLIENT_FAILED,
  CONFIRM_DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED
} from "../../../constants";
import defaultImage from "../../../assets/default-avatar.png";

import { fakeLanguages } from "../../../fakeData";

class FormForEdit extends Component {
  state = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneMask: "",
    gender: "",
    city: "",
    country: "",
    language: ""
  };

  componentDidMount() {
    const { person } = this.props;

    this.setState({
      firstName: person.firstName,
      lastName: person.lastName,
      middleName: person.middleName,
      email: person.email,
      phoneMask: person.phoneMask,
      gender: person.gender,
      city: person.city,
      country: person.country,
      language: person.language
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };

  handleChangeCounty = country => {
    this.setState({ country });
  };

  editPerson = () => {
    const { psych, token, editPsych, editClient } = this.props;

    const person = {
      _id: this.props.person._id,
      newData: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middleName: this.state.middleName,
        phone: this.state.phoneMask,
        email: this.state.email,
        gender: this.state.gender,
        country: this.state.country,
        city: this.state.city,
        language: this.state.language
      }
    };

    psych ? editPsych(token, person) : editClient(token, person);
  };

  banPerson = () => {
    const { psych, token, banPsych, banClient } = this.props;

    const person = {
      _id: this.props.person._id,
      banStatus: true
    };

    psych ? banPsych(token, person) : banClient(token, person);
  };

  deletePerson = () => {
    const { psych, token, deletePsych, deleteClient } = this.props;

    const person = {
      _id: this.props.person._id
    };

    psych ? deletePsych(token, person) : deleteClient(token, person);
  };

  render() {
    const { classes, person, psych, openModal, closeModal } = this.props;

    const role = psych ? "psych" : "client";

    return (
      <div className={classes.editForm}>
        <Avatar
          className={classes.avatar}
          src={`${url}/photos/${role}/${person._id}/avatar/avatar_${
            person._id
          }.jpg`}
          onError={e => (e.target.src = defaultImage)}
          alt=""
        />

        <TextField
          label="Имя"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange("firstName")}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Фамилия"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange("lastName")}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Отчество"
          name="middleName"
          value={this.state.middleName}
          onChange={this.handleChange("middleName")}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange("email")}
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Телефон"
          name="phoneMask"
          value={this.state.phoneMask}
          onChange={this.handleChange("phoneMask")}
          variant="outlined"
          margin="normal"
        />

        <FormControl>
          <FormLabel className={classes.formLabel}>Пол</FormLabel>

          <RadioGroup
            value={this.state.gender}
            onChange={e => this.setState({ gender: e.target.value })}
            row
          >
            <FormControlLabel
              value="М"
              control={<Radio color="primary" />}
              label="Мужской"
              labelPlacement="top"
            />

            <FormControlLabel
              value="Ж"
              control={<Radio color="primary" />}
              label="Женский"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Город"
          name="phoneMask"
          value={this.state.city}
          onChange={this.handleChange("city")}
          variant="outlined"
          margin="normal"
        />

        <CountrySelect
          country={person.country}
          handleChangeCounty={this.handleChangeCounty}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="language-select">Язык</InputLabel>
          <Select
            value={this.state.language}
            onChange={this.handleChange("language")}
            input={
              <OutlinedInput
                labelWidth={45}
                name="language"
                id="language-select"
              />
            }
          >
            {fakeLanguages.map(language => (
              <MenuItem value={language} key={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={classes.buttons}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.editPerson}
          >
            Сохранить
          </Button>

          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.banPerson}
          >
            Забанить
          </Button>

          <Button
            className={classes.deleteButton}
            variant="outlined"
            onClick={
              psych
                ? () => openModal(CONFIRM_DELETE_PSYCH)
                : () => openModal(CONFIRM_DELETE_CLIENT)
            }
          >
            Удалить
          </Button>
        </div>

        {/* Success edit modal */}

        <Dialog
          open={
            psych
              ? this.props.editPsychSuccessModal
              : this.props.editClientSuccessModal
          }
        >
          <DialogTitle>
            {psych ? "Психолог успешно обновлен" : "Клиент успешно обновлен"}
          </DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() =>
                psych
                  ? closeModal(EDIT_PSYCH_SUCCESS)
                  : closeModal(EDIT_CLIENT_SUCCESS)
              }
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success ban modal */}

        <Dialog
          open={
            psych
              ? this.props.banPsychSuccessModal
              : this.props.banClientSuccessModal
          }
        >
          <DialogTitle>
            {psych ? "Психолог забанен" : "Клиент забанен"}
          </DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() =>
                psych
                  ? closeModal(BAN_PSYCH_SUCCESS)
                  : closeModal(BAN_CLIENT_SUCCESS)
              }
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirm delete modal */}

        <Dialog
          open={
            psych
              ? this.props.confirmDeletePsych
              : this.props.confirmDeleteClient
          }
        >
          <DialogTitle>
            {psych
              ? "Вы действительно хотите удалить психолога ?"
              : "Вы действительно хотите удалить клиента ?"}
          </DialogTitle>

          <DialogActions>
            <Button variant="outlined" onClick={this.deletePerson}>
              да
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                psych
                  ? closeModal(CONFIRM_DELETE_PSYCH)
                  : closeModal(CONFIRM_DELETE_CLIENT)
              }
            >
              нет
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success delete modal */}

        <Dialog
          open={
            psych
              ? this.props.deletePsychSuccessModal
              : this.props.deleteClientSuccessModal
          }
        >
          <DialogTitle>
            {psych ? "Психолог удален" : "Клиент удален"}
          </DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={
                psych
                  ? () => {
                      closeModal(DELETE_PSYCH_SUCCESS);
                      this.props.history.push("/psychologists");
                    }
                  : () => {
                      closeModal(DELETE_CLIENT_SUCCESS);
                      this.props.history.push("/clients");
                    }
              }
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Failed edit modal */}

        <Dialog
          open={
            psych
              ? this.props.editPsychFailedModal
              : this.props.editClientFailedModal
          }
        >
          <DialogTitle>Что то пошло не так</DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                psych
                  ? closeModal(EDIT_PSYCH_FAILED)
                  : closeModal(EDIT_CLIENT_FAILED);
              }}
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Failed ban modal */}

        <Dialog
          open={
            psych
              ? this.props.banPsychFailedModal
              : this.props.banClientFailedModal
          }
        >
          <DialogTitle>
            {psych
              ? "Не удалось забанить психолога"
              : "Не удалось забанить клиента"}
          </DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                psych
                  ? closeModal(BAN_PSYCH_FAILED)
                  : closeModal(BAN_CLIENT_FAILED);
              }}
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Failed delete modal */}

        <Dialog
          open={
            psych
              ? this.props.deletePsychFailedModal
              : this.props.deleteClientFailedModal
          }
        >
          <DialogTitle>
            {psych
              ? "Не удалось удалить психолога"
              : "Не удалось удалить клиента"}
          </DialogTitle>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                psych
                  ? closeModal(DELETE_PSYCH_FAILED)
                  : closeModal(DELETE_CLIENT_FAILED);
              }}
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  editForm: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 450,
    margin: 10,
    paddingBottom: 15
  },
  avatar: {
    alignSelf: "center",
    width: 70,
    height: 70,
    margin: 10
  },
  formLabel: {
    marginTop: 10,
    marginBottom: 10
  },
  formControl: {
    marginTop: 15
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width: 425px)": {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  },
  button: {
    width: 120,
    marginTop: 15
  },
  deleteButton: {
    width: 120,
    marginTop: 15,
    backgroundColor: theme.palette.error.main
  }
});

const EditForm = withStyles(styles)(FormForEdit);

const EditFormComponent = withRouter(EditForm);

export default EditFormComponent;
