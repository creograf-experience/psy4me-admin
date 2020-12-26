export const getRusField = field => {
  switch (field) {
    case "photo": {
      return "Фото";
    }
    case "fullName": {
      return "ФИО";
    }
    case "phoneMask": {
      return "Телефон";
    }
    case "email": {
      return "Email";
    }
    case "city": {
      return "Город";
    }
    case "country": {
      return "Страна";
    }
    case "balance": {
      return "Баланс";
    }
    case "lastConsDate": {
      return "Дата посл. конс.";
    }
    case "psych": {
      return "Психолог";
    }
    case "paidTotal": {
      return "Заплатил всего";
    }
    case "button": {
      return "Изменить";
    }
    case "dateAndTime": {
      return "Дата и время"
    }
    case "client": {
      return "Клиент"
    }
    case "status": {
      return "Статус"
    }
    case "sum": {
      return "Сумма"
    }
    case "duration": {
      return "Длительность";
    }
    case "paymentStatus": {
      return "Статус";
    }
    case "rateAndComment": {
      return "Оценка и комментарий"
    }
    case "date": {
      return "Дата"
    }
    case "contact": {
      return "Контакты"
    }
    case "amountInHours": {
      return "Кол-во в часах"
    }
    default:
      return field;
  }
};
