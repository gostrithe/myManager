import axios from "axios";
import { doDelete, doGet, doPost, doPut } from "./service/crud";

/* 添加电影 */
export async function addFilm(film) {
  film.filmId = Date.now() % 10000
  const result = await doPost("/film/0",film)
  return result;
}

/* 获取正在热映列表 */
export async function getPlayings() {
  const { arr: films } = await doGet(`/film/0`);
  return films;
}

/* 获取电影详情 */
export async function getFilmDetail(id) {
  const {
    arr: [detail],
  } = await doGet(`/film/${id}`);
  return detail;
}

/* 获得空模板 */
export async function getFilmDetailTemplate() {
  const template = await doGet(`/json/detail-template.json`);
  return template;
}

/* 修改电影 */
export async function updateFilmDetail(id, film) {
  delete film._id;
  const result = await doPut(`/film/${id}`, film);
  return result;
}

/* 删除电影 */
export async function deleteFilms(ids) {
  const pros = ids.map(
    (id) =>
      new Promise(async (resolve, reject) => {
        const result = await doDelete(`/film/${id}`);
        resolve(reject);
      })
  );

  return Promise.allSettled(pros);
}
