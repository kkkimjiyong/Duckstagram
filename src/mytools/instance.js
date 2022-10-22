import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

//ohwell instance Api 추가# 사용법 ex) const data = await ohwellApi.getTodo();
//사용 하다보면 익숙해질거에요 *^^*
// export const EstarApi = {
//   getEstarApi: () => instance.get("/ohwell"), //각각의 get,post,delete,patch입니다!
//   getEstarApi: () => instance.get(`/ohwell/${arg}`), //각각의 get,post,delete,patch입니다!
//   postEstarApi: () => instance.post("/ohwell", ohwell),
//   deleteEstarApi: () => instance.delete(`/ohwell/${ohwellId}`),
//   patchEstarApi: () => instance.patch(`/ohwell/${ohwellId}`, { memo: edit }),
// };

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/posts"),
  getImage: (id) => instance.get(`/posts?postId=${id}`),
};

// E스타그램 Detail페이지 댓글
export const DetailApi = {
  getDetail: () => instance.get("/comments"), //GET

  postDetail: (comment) => instance.post("/comments", comment), //POST
};
