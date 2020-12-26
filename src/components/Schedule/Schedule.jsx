import React, {Component} from "react";
import StatusList from "./StatusList/StatusList";
import Title from "../Common/Title";
import FilterSchedule from "../Common/FilterSchedule";
import {withStyles} from "@material-ui/styles";
import {MakeAppointment} from "../Common/Modal/MakeAppointment";
import {tomorrow, today} from "../../utils";
import Pagination from "../Common/Pagination/Pagination";
import ScheduleTable from "./ScheduleTable/ScheduleTable";
import {CONFIRM_EDIT_APPOINTMENT} from "../../constants";
import ScheduleMobileCards from "./ScheduleMobileCards";


const styles = theme => ({
  schedule: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10
  },
  tableStyle: {
    display: "none",
    margin: 10,
    "@media (min-width: 1485px)": {
      display: "block"
    }
  }
});

class Schedule extends Component {
  state = {
    psych: "",
    client: "",
    from: today(),
    to: tomorrow(),
    page: 0,
    size: 10,

    openEditModal: false,
    consultationToEdit: "",
    psychToEdit: "",
    clientToEdit: "",
    dateTimeToEdit: "",
    durationToEdit: 0,
    isCanceled: false
  };

  componentDidMount() {
    const {getPsychs, getClients, token} = this.props;

    getPsychs(token);
    getClients(token);

    this.filterSchedule();
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      page: 0,
      [event.target.name]: event.target.value
    }, () => this.filterSchedule());
  };

  handlePageChange = (event, newPage) => {
    event.preventDefault();
    this.setState({
      page: newPage
    }, () => this.filterSchedule())
  }

  filterSchedule = () => {
    const {psych, client, from, to, page, size} = this.state;
    const {getSchedule, token} = this.props;

    getSchedule(token, {psych, client, from, to, page, size});
  };

  handleEditChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onOpenEditModal = (consultationId) => {
    const consultation = this.props.schedule.find(({_id}) => _id === consultationId) || {};

    this.setState({
      consultationToEdit: consultationId,
      psychToEdit: consultation.psych && consultation.psych.psychId,
      clientToEdit: consultation.client && consultation.client.clientId,
      dateTimeToEdit: consultation.dateAndTime,
      durationToEdit: consultation.duration,
      openEditModal: true
    }, () => this.props.openModal(CONFIRM_EDIT_APPOINTMENT));
  };


  handleCancelAppointment = () => {
    this.setState({isCanceled: true});

    const {consultationToEdit} = this.state;
    const {token, editAppointment} = this.props;

    const request = {
      id: consultationToEdit,
      status: 'canceled'
    }

    editAppointment(token, request);
  }

  handleEditAppointment = () => {
    this.setState({isCanceled: false});

    const {
      consultationToEdit,
      clientToEdit,
      psychToEdit,
      dateTimeToEdit,
      durationToEdit,
    } = this.state;

    const {token, editAppointment} = this.props;

    if (!clientToEdit || !psychToEdit) {
      return;
    }

    const request = {
      id: consultationToEdit,
      psych: psychToEdit,
      client: clientToEdit,
      date: new Date(dateTimeToEdit).getTime(),
      durationInMinutes: durationToEdit,
      status: "postponed"
    }

    editAppointment(token, request);
  }

  render() {
    const {
      classes,
      schedule,
      psychs,
      clients,
      totalCount
    } = this.props;

    const {
      psych,
      client,
      from,
      to,
      page,
      size,

      openEditModal,
      psychToEdit,
      clientToEdit,
      dateTimeToEdit,
      durationToEdit,
      isCanceled
    } = this.state;

    return (
      <div className={classes.schedule}>
        <Title title={"Расписание"}/>

        <FilterSchedule
          from={from}
          handleFromChange={this.handleChange}
          to={to}
          handleToChange={this.handleChange}
          client={client}
          handleClientChange={this.handleChange}
          psych={psych}
          handlePsychChange={this.handleChange}
          psychs={psychs}
          clients={clients}/>

        <MakeAppointment
          psychToEdit={psychToEdit}
          clientToEdit={clientToEdit}
          dateTimeToEdit={dateTimeToEdit}
          durationToEdit={durationToEdit}
          handleEditChange={this.handleEditChange}
          handleEditAppointment={this.handleEditAppointment}
          handleCancelAppointment={this.handleCancelAppointment}
          isCanceled={isCanceled}
          openEditModal={openEditModal}/>

        <Pagination
          page={page}
          count={totalCount}
          rowsPerPage={size}
          handleChange={this.handlePageChange}/>

        <ScheduleTable
          data={schedule}
          fields={[
            "dateAndTime",
            "psych",
            "client",
            "sum",
            "duration",
            "status",
            "rateAndComment",
            "button"
          ]}
          onOpenEditModal={this.onOpenEditModal}
          tableStyle={classes.tableStyle}/>

        <ScheduleMobileCards
          data={schedule}
          onOpenEditModal={this.onOpenEditModal}/>

        <StatusList/>
      </div>
    );
  }
}

const ScheduleComponent = withStyles(styles)(Schedule);

export default ScheduleComponent;

