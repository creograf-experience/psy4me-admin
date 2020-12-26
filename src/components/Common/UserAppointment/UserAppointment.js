import React, {useEffect, useState} from "react";
import EditAppointment from "./EditAppointment";
import {CONFIRM_MAKE_APPOINTMENT} from "../../../constants";
import NewAppointment from "./NewAppointment";


export default function UserAppointmentComponent({
                                                   token,

                                                   userType,
                                                   person,

                                                   psyches,
                                                   clients,

                                                   modalConfirmMakeAppointment,
                                                   modalSuccessMakeAppointment,
                                                   modalConfirmEditAppointment,
                                                   modalSuccessEditAppointment,

                                                   editAppointment,
                                                   makeAppointment,

                                                   openModal,
                                                   closeModal,

                                                   consultationToEdit
                                                 }) {

  const [isCanceled, setIsCanceled] = useState(false);

  const [consultationFields, setConsultationFields] = useState({
    psych: "",
    client: "",
    dateTime: "",
    duration: 60
  });

  useEffect(() => {
    setEditFieldsState();
  }, [consultationToEdit])

  const onOpenNewConsultationModal = () => {
    setNewConsultationFieldsState();
    openModal(CONFIRM_MAKE_APPOINTMENT);
  }

  const handleConsultationChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;

    setConsultationFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const setNewConsultationFieldsState = () => {
    setConsultationFields({
      psych: userType === 'client' ? person.personalPsych : person._id,
      client: userType === 'client' ? person._id : "",
      dateTime: new Date().toISOString().slice(0, 16),
      duration: 60
    })
  }

  const setEditFieldsState = () => {
    setConsultationFields({
      psych: consultationToEdit.psych && consultationToEdit.psych.psychId,
      client: consultationToEdit.client && consultationToEdit.client.clientId,
      dateTime: consultationToEdit.dateAndTime,
      duration: consultationToEdit.duration
    })
  }

  // new appointment
  const handleMakeAppointment = () => {
    const {client, psych, dateTime, duration} = consultationFields;

    if (!client || !psych) {
      return;
    }

    const request = {
      client: client,
      psych: psych,
      date: new Date(dateTime).getTime(),
      durationInMinutes: duration,
      status: "assigned"
    }

    makeAppointment(token, request);
  }

  // cancel appointment
  const handleCancelAppointment = () => {
    setIsCanceled(true)
    const request = {
      id: consultationToEdit._id,
      status: 'canceled'
    }

    editAppointment(token, request);
  }

  // edit appointment
  const handleEditAppointment = () => {
    setIsCanceled(false);
    const {client, psych, dateTime, duration} = consultationFields;

    if (!client || !psych) {
      return;
    }

    const request = {
      id: consultationToEdit._id,
      psych: psych,
      client: client,
      date: new Date(dateTime).getTime(),
      durationInMinutes: duration,
      status: "postponed"
    }

    editAppointment(token, request);
  }


  const getConnectedClients = () => {
    const psychClients = person.connectedClients || [];
    if (psychClients.length === 0) {
      return [];
    }

    return clients.filter(({_id}) => psychClients.includes(_id));
  }

  return (
    <div>
      <NewAppointment
        userType={userType}

        psyches={psyches}
        clients={userType === 'psych' ? getConnectedClients() : clients}

        psych={consultationFields.psych}
        client={consultationFields.client}
        dateTime={consultationFields.dateTime}
        duration={consultationFields.duration}

        closeModal={closeModal}

        modalConfirm={modalConfirmMakeAppointment}
        modalSuccess={modalSuccessMakeAppointment}

        handleChange={handleConsultationChange}

        handleMakeAppointment={handleMakeAppointment}
        onOpenNewConsultationModal={onOpenNewConsultationModal}
      />
      <EditAppointment
        psyches={psyches}
        clients={clients}

        psych={consultationFields.psych}
        client={consultationFields.client}
        dateTime={consultationFields.dateTime}
        duration={consultationFields.duration}

        closeModal={closeModal}

        modalConfirm={modalConfirmEditAppointment}
        modalSuccess={modalSuccessEditAppointment}

        handleChange={handleConsultationChange}

        handleEditAppointment={handleEditAppointment}
        handleCancelAppointment={handleCancelAppointment}
        isCanceled={isCanceled}
      />
    </div>
  )
}