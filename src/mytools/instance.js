import axios from "axios";
import { getCookie } from "../Components/estarlogin/cookiehook";

const instance = axios.create({
  // baseURL: "http://13.124.143.112/",
  // baseURL: "http://localhost:3001/",
  baseURL: "http://3.90.29.60/",
});

const loginInstance = axios.create({
  // baseURL: "http://13.124.143.112/",
  // baseURL: "http://localhost:3001/",
  baseURL: "http://3.90.29.60/",
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

export const imageApi = {
  // E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
  getImages: () => instance.get("/api/star/posts/"),
  // 각 디테일 페이지 - GET
  getImage: (id) => instance.get(`/api/star/posts/${id}`),
  // 각 디테일 페이지 - DELET
  deletePost: (postID) => loginInstance.delete(`api/star/posts/${postID}`),
  // 각 디테일 페이지 - PATCH
  putPost: (Editpost) =>
    loginInstance.put(`api/star/posts/${Editpost.PostId}`, Editpost),

  // getImages: () => instance.get("/posts"), //GET---> 전체 포스트들을 가져옴
  // getImage: (id) => instance.get(`/posts?id=${id}`), //GET---> 디테일페이지에 알맞은 포스트를 가져옴
  // deletePost: (postID) => instance.delete(`/posts/${postID}`), //DELET
  // patchPost: (postID, edit) =>
  //   instance.patch(`/posts/${postID}`, { content: edit }), //PATCH
};

export const detailApi = {
  //각 게시글의 댓글 GET
  getDetail: (id) => instance.get(`/api/star/comments/${id}`),
  //각 게시글의 댓글 POST
  postDetail: (payload) =>
    loginInstance.post(`/api/star/comments/${payload.id}`, {
      comment: payload.comment,
    }),
  //각 게시글의 댓글 DELET
  deleteDetail: (commentId) =>
    loginInstance.delete(`/api/star/comments/${commentId}`),
  //각 게시글의 댓글 PUT
  patchDetail: (payload) =>
    loginInstance.put(`/api/star/comments/${payload.commentId}`, {
      comment: payload.newComment,
    }),
  // getDetail: () => instance.get("/comments"), //GET ---> 댓글을 가져옴
  // postDetail: (comment) => instance.post("/comments", comment), //POST
  // deleteDetail: (commentID) => instance.delete(`/comments/${commentID}`), //DELET
  // patchDetail: (commentID, edit) =>
  //   instance.patch(`/comments/${commentID}`, { comment: edit }), //PATCH
};

//  E스타그램 Post 페이지
export const postApi = {
  postPost: (post) =>
    loginInstance.post("/api/star/posts", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
