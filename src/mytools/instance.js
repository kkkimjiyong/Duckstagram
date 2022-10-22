import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.124.143.112/",
});

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/api/star/posts/"),
  getImage: (id) => instance.get(`/api/star/posts/${id}`),
};

// E스타그램 Detail페이지 댓글
export const detailApi = {
  getDetail: () => instance.get("/api/star/comments"), //GET

  postDetail: (comment) => instance.post("/api/star/comments", comment), //POST
};

export const postApi = {
  postPost: (post) => instance.post("/api/star/posts/", post),
};
