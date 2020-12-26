import {executeRequest} from "../utils";

export const getSchedule = async (token, data = {}) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/consultations/filter",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(data)
    }
  });

export const makeAppointment = async (token, couple) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/consultations",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(couple)
    }
  });

export const editAppointment = async (token, request) =>
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/consultations",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(request)
    }
  });

export const getPayments = async (token, data = {}) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/payments/filter",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(data)
    }
  });

export const addPayment = async (token, data) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/payments",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(data)
    }
  });

export const getChartData = async (token, data) =>
  await executeRequest({
    method: "GET",
    endpoint: `/private/admin/manage/charts/${data}`,
    token
  });