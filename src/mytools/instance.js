import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "http://13.124.143.112/api/star",
});

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/posts/"),
  getImage: (id) => instance.get(`/posts/${id} `), ///posts/${id}  /posts?postId=${id}
};

// E스타그램 Detail페이지 댓글
export const detailApi = {
  getDetail: () => instance.get("/comments"), ///api/comments        /comments

  postDetail: (comment) => instance.post("/comments", comment), ///api/comments       /comments
};

export const postApi = {
  postPost: (post) => instance.post("/posts/", post), ///api/star/posts/       /posts
};
