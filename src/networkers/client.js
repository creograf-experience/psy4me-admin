import {executeRequest} from "../utils";

export const getClients = async token =>
  await executeRequest({
    method: "GET",
    endpoint: "/private/admin/manage/clientlist",
    token
  });

export const editClient = async (token, client) =>
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/manage/clientedit",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(client)
    }
  });

export const banClient = async (token, client) =>
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/manage/clientban",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(client)
    }
  });

export const deleteClient = async (token, client) =>
  await executeRequest({
    method: "DELETE",
    endpoint: "/private/admin/manage/clientdelete",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(client)
    }
  });

export const connectPsychToClient = async (token, couple) =>
  // couple = client + psych
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/manage/connectpsych",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(couple)
    }
  });

export const getClientSchedule = async (token, request) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/consultations/client",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(request)
    }
  });
