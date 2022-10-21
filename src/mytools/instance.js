import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

//ohwell instance Api 추가# 사용법 ex) const data = await ohwellApi.getTodo();
//사용 하다보면 익숙해질거에요 *^^*
export const EstarApi = {
  getEstarApi: () => instance.get("/ohwell"), //각각의 get,post,delete,patch입니다!
  getEstarApi: () => instance.get(`/ohwell/${arg}`), //각각의 get,post,delete,patch입니다!
  postEstarApi: () => instance.post("/ohwell", ohwell),
  deleteEstarApi: () => instance.delete(`/ohwell/${ohwellId}`),
  patchEstarApi: () => instance.patch(`/ohwell/${ohwellId}`, { memo: edit }),
};
