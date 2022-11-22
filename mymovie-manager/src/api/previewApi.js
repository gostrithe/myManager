import axios from "axios";
import { doDelete, doGet, doPost, doPut } from "./service/crud";

/* 添加电影 */
export async function addPreview(film) {
  film.filmId = Date.now() % 10000
  const result = await doPost("/preview/0",film)
  return result;
}

/* 获取正在热映列表 */
export async function getPreviews() {
  const { arr: Previews } = await doGet(`/preview/0`);
  return Previews;
}

/* 获取电影详情 */
export async function getPreviewDetail(id) {
  const {
    arr: [detail],
  } = await doGet(`/preview/${id}`);
  return detail;
}

/* 获得空模板 */
export async function getPreviewDetailTemplate() {
  const template = await doGet(`/json/detail-template.json`);
  return template;
}

/* 修改电影 */
export async function updatePreviewDetail(id, film) {
  delete Preview._id;
  const result = await doPut(`/preview/${id}`, film);
  return result;
}

/* 删除电影 */
export async function deletePreviews(ids) {
  const pros = ids.map(
    (id) =>
      new Promise(async (resolve, reject) => {
        const result = await doDelete(`/preview/${id}`);
        resolve(reject);
      })
  );

  return Promise.allSettled(pros);
}
