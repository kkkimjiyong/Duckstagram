import axios from "axios";

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
  // postPost: (post) => instance.post("/api/star/posts/", post),

  postPost: (post) => instance.post("/posts", post), //POST
  deletePost: (postID) => instance.delete(`/posts/${postID}`), //DELET
  patchPost: (postID, edit) =>
    instance.patch(`/posts/${postID}`, { content: edit }), //PATCH
};
