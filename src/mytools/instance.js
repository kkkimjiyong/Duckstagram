// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3001",
// });

// //ohwell instance Api 추가# 사용법 ex) const data = await ohwellApi.getTodo();
// //사용 하다보면 익숙해질거에요 *^^*
// export const EstarApi = {
//   getEstarApi: () => instance.get("/ohwell"), //각각의 get,post,delete,patch입니다!
//   getEstarApi: () => instance.get(`/ohwell/${arg}`), //각각의 get,post,delete,patch입니다!
//   postEstarApi: () => instance.post("/ohwell", ohwell),
//   deleteEstarApi: () => instance.delete(`/ohwell/${ohwellId}`),
//   patchEstarApi: () => instance.patch(`/ohwell/${ohwellId}`, { memo: edit }),
// };

/* 
* 악시오스 인스턴스 (참고 : https://juzdalua.tistory.com/m/15)
//authorized user
export const ssoInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
      Authorization: `${getItem('token')}`,
      "Content-Type": "application/json",
  },
}); */
