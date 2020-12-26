import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AppBar, Button, makeStyles, Paper, Typography} from "@material-ui/core";
import {EditForm} from "../Common";
import Pagination from "../Common/Pagination/Pagination";
import Title from "../Common/Title";
import {UserAppointment} from "../Common/UserAppointment";
import {CONFIRM_EDIT_APPOINTMENT} from "../../constants";
import ScheduleTable from "../Schedule/ScheduleTable";
import ScheduleMobileCards from "../Schedule/ScheduleMobileCards";

const useStyles = makeStyles((theme) => ({
  psych: {
    padding: 10
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
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10
  }
}));

export default function PsychComponent({
                                         token,
                                         match,
                                         psychs,
                                         editPsych,
                                         getClients,
                                         banPsych,
                                         deletePsych,
                                         getPsychs,
                                         getPsychSchedule,
                                         schedule,
                                         totalCount,
                                         openModal,
                                       }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [consultationToEdit, setConsultationToEdit] = useState({});

  useEffect(() => {
    const getEssentials = async () => {
      await getPsychs(token);
      await getClients(token);

      await psychSchedule();
    }

    getEssentials();
  }, [])

  useEffect(() => {
    const handle = async () => {
      await psychSchedule();
    }
    handle();
  }, [page])

  const onOpenEditModal = (consultationId) => {
    const consultation = schedule.find(({_id}) => _id === consultationId) || {};
    setConsultationToEdit(consultation);

    openModal(CONFIRM_EDIT_APPOINTMENT);
  };

  const psychSchedule = async () => {
    let request = {
      page,
      size,
      psychId: match.params.id
    }

    await getPsychSchedule(token, request);
  }

  const handlePageChange = (event, newPage) => setPage(newPage)

  const psych = psychs.find(psych => psych._id === match.params.id);

  const classes = useStyles();

  if (!psych) {
    return (
      <div className={classes.psych}>
        <Typography variant="h6" className={classes.name}>
          Психолог не найден
        </Typography>

        <Link to="/psychologists">
          <Button variant="contained">Назад</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.psych}>
      <Paper elevation={1}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Typography variant="h6" className={classes.name}>
            {`${psych.lastName} ${psych.firstName[0]}. ${psych.middleName[0]}.`}
          </Typography>

          <Link to="/psychologists">
            <Button variant="contained">Назад</Button>
          </Link>
        </AppBar>

        <EditForm
          psych
          person={psych}
          editPsych={editPsych}
          banPsych={banPsych}
          deletePsych={deletePsych}
        />

        <div className={classes.paginationContainer}>
          <Title title={"Консультации"}/>

          <div style={{marginBottom: 15}}>
            <UserAppointment
              person={psych}
              userType={"psych"}
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
          userType={'psych'}
          onOpenEditModal={onOpenEditModal}/>

        <ScheduleTable
          data={schedule}
          fields={[
            "dateAndTime",
            "client",
            "sum",
            "duration",
            "status",
            "rateAndComment",
            "button"
          ]}
          userType={'psych'}
          tableStyle={classes.tableStyle}
          onOpenEditModal={onOpenEditModal}/>
      </Paper>
    </div>
  );
}



