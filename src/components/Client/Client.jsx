import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AppBar, Button, makeStyles, Paper, Typography} from "@material-ui/core";

import {EditForm, PsychAppointment} from "../Common";
import Pagination from "../Common/Pagination/Pagination";
import Title from "../Common/Title";
import {CONFIRM_EDIT_APPOINTMENT} from "../../constants";
import {UserAppointment} from "../Common/UserAppointment";
import ScheduleTable from "../Schedule/ScheduleTable";
import ScheduleMobileCards from "../Schedule/ScheduleMobileCards";

const useStyles = makeStyles((theme) => ({
  client: {
    padding: 10
  },
  paper: {
    paddingBottom: 5
  },
  appBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingLeft: 25,
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    "@media (min-width: 425px)": {
      flexDirection: "row"
    }
  },
  name: {
    marginBottom: 20,
    "@media (min-width: 425px)": {
      marginBottom: 0,
      marginLeft: 30
    },
    "@media (min-width: 960px)": {
      margin: 0
    }
  },
  tableStyle: {
    display: "none",
    margin: 10,
    "@media (min-width: 1485px)": {
      display: "block"
    }
  },
  paginationContainer: {
    display: "flex",
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    "@media (min-width: 1485px)": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
    }
  }
}));

export default function ClientComponent({
                                          token,
                                          match,
                                          editClient,
                                          banClient,
                                          deleteClient,
                                          psychs,
                                          getPsychs,
                                          getClients,
                                          clients,
                                          schedule,
                                          totalCount,
                                          getClientSchedule,
                                          openModal,
                                        }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [consultationToEdit, setConsultationToEdit] = useState({});

  useEffect(() => {
    const getEssentials = async () => {
      await getPsychs(token);
      await getClients(token);

      await clientSchedule();
    }

    getEssentials();
  }, [])

  useEffect(() => {
    const handle = async () => {
      await clientSchedule();
    }
    handle();
  }, [page])

  const client = clients.find(client => client._id === match.params.id);

  const clientSchedule = async () => {
    let request = {
      page,
      size,
      clientId: match.params.id
    }

    await getClientSchedule(token, request);
  }

  const handlePageChange = (event, newPage) => setPage(newPage)

  const onOpenEditModal = (consultationId) => {
    const consultation = schedule.find(({_id}) => _id === consultationId) || {};
    setConsultationToEdit(consultation);

    openModal(CONFIRM_EDIT_APPOINTMENT);
  };

  const classes = useStyles();

  if (!client) {
    return (
      <div className={classes.client}>
        <Typography variant="h6" className={classes.name}>
          Клиент не найден
        </Typography>

        <Link to="/clients">
          <Button variant="contained">Назад</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.client}>
      <Paper elevation={1} className={classes.paper}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Typography variant="h6" className={classes.name}>
            {`${client.lastName} ${client.firstName[0]}. ${client.middleName[0]}.`}
          </Typography>

          <Link to="/clients">
            <Button variant="contained">Назад</Button>
          </Link>
        </AppBar>

        <EditForm
          person={client}
          editClient={editClient}
          banClient={banClient}
          deleteClient={deleteClient}
        />

        <PsychAppointment client={client} psychs={psychs}/>

        <div className={classes.paginationContainer}>
          <Title title={"Консультации"}/>

          <div style={{marginBottom: 15}}>
            <UserAppointment
              person={client}
              userType={"client"}
              consultationToEdit={consultationToEdit}/>
          </div>

          <Pagination
            page={page}
            count={totalCount}
            rowsPerPage={size}
            handleChange={handlePageChange}/>
        </div>

        <ScheduleMobileCards
          data={schedule}
          userType={'client'}
          onOpenEditModal={onOpenEditModal}/>

        <ScheduleTable
          data={schedule}
          fields={[
            "dateAndTime",
            "psych",
            "sum",
            "duration",
            "status",
            "rateAndComment",
            "button"
          ]}
          userType={'client'}
          tableStyle={classes.tableStyle}
          onOpenEditModal={onOpenEditModal}/>
      </Paper>
    </div>
  )
}

