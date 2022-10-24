import axios from "axios";
// import { getToken } from "./utils";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  // "http://100.24.45.120",
});

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  // getImages: () => instance.get("/api/star/posts/"),
  // getImage: (id) => instance.get(`/api/star/posts/${id}`),
  getImages: () => instance.get("/posts"),
  getImage: (id) => instance.get(`/posts?id=${id}`),
};

// E스타그램 Detail페이지 댓글
export const detailApi = {
  // getDetail: () => instance.get("/api/star/comments"), //GET
  // postDetail: (comment) => instance.post("/api/star/comments", comment), //POST
  // deleteDetail: (commentID) =>
  //   instance.delete(`/api/star/comments/${commentID}`), //DELET
  // patchDetail: (commentID, edit) =>
  //   instance.patch(`/api/star/comments/${commentID}`, { comment: edit }), //PATCH
  getDetail: () => instance.get("/comments"), //GET
  postDetail: (comment) => instance.post("/comments", comment), //POST
  deleteDetail: (commentID) => instance.delete(`/comments/${commentID}`), //DELET
  patchDetail: (commentID, edit) =>
    instance.patch(`/comments/${commentID}`, { comment: edit }), //PATCH
};

//  E스타그램 Post 페이지
export const postApi = {
  postPost: (post) => instance.post("/api/star/posts/", post),
};

// //┏----------interceptor를 통한 header 설정----------┓
// instance.interceptors.request.use(async (config) => {
//   config.headers["content-type"] = "application/json; charset=utf-8";
//   config.headers["X-Requested-With"] = "XMLHttpRequest";
//   config.headers["Accept"] = "*/*";
//   //getToken는 로컬 스토리지에 토큰이 있다면 반환한다 없다면 null 값 반환
//   config.headers["authorization"] = await getToken();
//   return config;
// });

// // ┏----------interceptor를 통한 response 설정----------┓
// instance.interceptors.response.use(async (response) => {
//   if (response.data.message === "new token") {
//     const { config } = response;
//     const originalRequest = config;

//     const newAccessToken = response.data.myNewToken;
//     localStorage.setItem("token", newAccessToken);

//     axios.defaults.headers.common.authorization = `Bearer ${newAccessToken}`;
//     originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//     return axios(originalRequest);
//   }

//   return response;
// });
