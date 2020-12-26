import { executeRequest } from "../utils";

export const getPsychs = async token =>
  await executeRequest({
    method: "GET",
    endpoint: "/private/admin/manage/psychlist",
    token
  });

export const editPsych = async (token, psych) =>
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/manage/psychedit",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(psych)
    }
  });

export const banPsych = async (token, psych) =>
  await executeRequest({
    method: "PUT",
    endpoint: "/private/admin/manage/psychban",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(psych)
    }
  });

export const deletePsych = async (token, psych) =>
  await executeRequest({
    method: "DELETE",
    endpoint: "/private/admin/manage/psychdelete",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(psych)
    }
  });

export const getPsychSchedule = async (token, request) =>
  await executeRequest({
    method: "POST",
    endpoint: "/private/admin/consultations/psych",
    token,
    body: {
      contentType: "application/json",
      content: JSON.stringify(request)
    }
  });
