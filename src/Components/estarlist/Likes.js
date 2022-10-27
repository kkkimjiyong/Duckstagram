import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from ".././estarlogin/cookiehook";

const Likes = ({ post }) => {
  const [isLike, SetisLike] = useState(
    post.userLike ? { like: false } : { like: true }
  );

  const PostLike = async (Data) => {
    try {
      console.log(isLike);
      console.log(Data.Like);
      const { data } = await axios.put(
        `https://hi-prac.shop/api/star/posts/likes/${Data.Id}`,
        Data.Like,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(Data);
      SetisLike(Data.Like);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(post.likesum);
  console.log(post.userLike);
  return (
    <div>
      {isLike.like ? (
        <LikeBtn
          onClick={async () => {
            await PostLike({ Like: { like: true }, Id: post.PostId });
            SetisLike({ like: !isLike.like });
          }}
        >
          🤍{post.likesum}
        </LikeBtn>
      ) : (
        <LikeBtn
          onClick={async () => {
            await PostLike({ Like: { like: false }, Id: post.PostId });
            SetisLike({ like: !isLike.like });
          }}
        >
          ❤️{post.likesum}
        </LikeBtn>
      )}
    </div>
  );
};

const LikeBtn = styled.span`
  cursor: pointer;
  position: absolute;
  bottom: 14px;
  right: 0;
`;

export default Likes;
