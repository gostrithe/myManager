import { doDelete, doGet, doPut, doPost } from "./service/crud";

export async function getPlayings() {
  const { arr: data } = await doGet('/film/0');
  return data;
}

export async function getDetail(_id) {
  const { arr: [data] } = await doGet(`/film/${_id}`);
  return data;
}

export async function updateDetail(_id, data) {
  const { msg, data: { modifiedCount } } = await doPut(`/film/${_id}`, data);
  return {
    msg,
    modifiedCount
  };
}

export async function deletePlaying(_id) {
  const { msg, data: { deletedCount } } = await doDelete(`/film/${_id}`);
  return {
    msg,
    deletedCount
  };
}

export async function addFilm(data) {
  const { msg, result: { insertedId } } = await doPost('/film/0', data);
  return { msg, insertedId };
}
