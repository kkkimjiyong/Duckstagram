import { data } from "autoprefixer";
import axios from "axios";
import { getCookie } from "../Components/estarlogin/cookiehook";

const instance = axios.create({
  // baseURL: "http://13.124.143.112/",
  // baseURL: "http://localhost:3001/",
  // baseURL: "http://3.90.29.60/",
  baseURL: "https://hi-prac.shop",
});

// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/api/star/posts/"),
  getImage: (id) => instance.get(`/api/star/posts/${id}`),
  deletePost: (postID) =>
    instance.delete(`api/star/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }), //DELET
  putPost: (Editpost) =>
    instance.put(`api/star/posts/${Editpost.PostId}`, Editpost, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }), //PATCH

  // getImages: () => instance.get("/posts"), //GET---> 전체 포스트들을 가져옴
  // getImage: (id) => instance.get(`/posts?id=${id}`), //GET---> 디테일페이지에 알맞은 포스트를 가져옴
  // deletePost: (postID) => instance.delete(`/posts/${postID}`), //DELET
  // patchPost: (postID, edit) =>
  //   instance.patch(`/posts/${postID}`, { content: edit }), //PATCH
};

export const detailApi = {
  getDetail: (id) => instance.get(`/api/star/comments/${id}`), //GET
  postDetail: (payload) =>
    instance.post(
      `/api/star/comments/${payload.id}`,
      { comment: payload.comment },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    ), //POST
  deleteDetail: (commentId) =>
    instance.delete(`/api/star/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }), //DELET
  patchDetail: (payload) =>
    // console.log(payload)
    instance.put(
      `/api/star/comments/${payload.commentId}`,
      { comment: payload.newComment },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    ), //PATCH
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
