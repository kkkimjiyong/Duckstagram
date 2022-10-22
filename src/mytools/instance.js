import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/posts/"),
  getImage: (id) => instance.get(`/posts?postId=${id}`),
};

// E스타그램 Detail페이지 댓글
export const detailApi = {
  getDetail: () => instance.get("/comments"), //GET

  postDetail: (comment) => instance.post("/comments", comment), //POST
};

export const postApi = {
  postPost: (post) => instance.post("/posts", post),
};
