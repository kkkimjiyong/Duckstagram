import React, { useState } from "react";

const usePost = () => {
  //value 는 state 관리!
  const [postPage, setPostPage] = useState({
    postId: 1,
    title: "",
    images: "",
    content: "",
    like: "",
    dislike: "",
  });

  //핸들러 로직
  const handler = (e) => {
    const { name, value } = e.target;
    setPostPage({ ...postPage, [name]: value });
  };

  return [postPage, handler];
};

export default usePost;
