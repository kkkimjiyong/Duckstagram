import axios from "axios";
import { getCookie } from "../Components/estarlogin/cookiehook";

const instance = axios.create({
  // baseURL: "http://13.124.143.112/",
  // baseURL: "http://localhost:3001/",
  baseURL: "http://3.90.29.60/",
});

export const imageApi = {
  // E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
  getImages: () => instance.get("/api/star/posts/"),
  //  각페이지의 게시글 알맞게 가져오기
  getImage: (id) => instance.get(`/api/star/posts/${id}`),
  // 각페이지의 게시글 지우기
  deletePost: (postID) =>
    instance.delete(`api/star/posts/${postID}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }), //DELET
  // 각페이지의 게시글 수정하기
  patchPost: (postID, edit) =>
    instance.patch(
      `api/star/posts/${postID}`,
      { content: edit },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    ), //PATCH

  // getImages: () => instance.get("/posts"), //GET---> 전체 포스트들을 가져옴
  // getImage: (id) => instance.get(`/posts?id=${id}`), //GET---> 디테일페이지에 알맞은 포스트를 가져옴
  // deletePost: (postID) => instance.delete(`/posts/${postID}`), //DELET
  // patchPost: (postID, edit) =>
  //   instance.patch(`/posts/${postID}`, { content: edit }), //PATCH
};

// E스타그램 Detail페이지 댓글
export const detailApi = {
  getDetail: (postId) => instance.get(`/api/star/comments/${postId}`), //GET
  postDetail: (comment, postId) =>
    instance.post(`/api/star/comments/${postId}`, comment), //POST
  deleteDetail: (commentID, postId) =>
    instance.delete(`/api/star/comments/${commentID}`), //DELET
  patchDetail: (commentID, edit, postId) =>
    instance.patch(`/api/star/comments/${commentID}`, { comment: edit }), //PATCH
  // getDetail: () => instance.get("/comments"), //GET ---> 댓글을 가져옴
  // postDetail: (comment) => instance.post("/comments", comment), //POST
  // deleteDetail: (commentID) => instance.delete(`/comments/${commentID}`), //DELET
  // patchDetail: (commentID, edit) =>
  //   instance.patch(`/comments/${commentID}`, { comment: edit }), //PATCH
};

//  E스타그램 Post 페이지
export const postApi = {
  postPost: (post) => instance.post("/api/star/posts", post),
};
