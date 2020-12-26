export const meetingStatus = {
  ASSIGNED: "назначена",
  POSTPONED: "перенесена",
  CANCELED: "отменена",
  CLIENT_DO_NOT_COME: "клиент не пришёл",
  PSYCH_DO_NOT_COME: "психолог не пришёл",
  CONSULTATION_TOOK_PLACE: "прошла консультация"
};

export const meetingStatusArr = [
  {
    value: "assigned",
    name: "назначена"
  }, {
    value: "postponed",
    name: "перенесена"
  }, {
    value: "canceled",
    name: "отменена"
  }, {
    value: "consultation_took_place",
    name: "прошла консультация"
  }, {
    value: "client_do_not_come",
    name: "клиент не пришёл"
  }, {
    value: "psych_do_not_come",
    name: "психолог не пришёл"
  }
]

export const getStatusRus = (statusValue) => {
  const result = meetingStatusArr.find(({value}) => value === statusValue);

  return result && result.name;
}