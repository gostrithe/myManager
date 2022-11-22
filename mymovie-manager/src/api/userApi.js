import { doPost, doGet } from "./service/crud";

export async function login({ username, password }) {
  const {
    msg,
    users: [user],
    token,
  } = await doPost("/user/login", { username, password });
  return { msg, user, token };
}

export async function getAllUsers() {
  const {
    msg,
    arr: users,
  } = await doGet("/user/0");

  return users;
}
