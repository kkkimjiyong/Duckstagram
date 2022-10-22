import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  __postDetailComment,
  __getDetailComment,
} from "../../redux/modules/DetailSlice";
import { __getList } from "../../redux/modules/ListSlice";

const Detail = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const [comment, setComment] = useState({
    commentId: 0,
    comment: "",
  });
  const { comments } = useSelector((state) => state.comments);
  console.log(comments);
  const globalposts = useSelector((state) => state.posts.posts);

  // 게시물에 달린 댓글을 post해줌 -> (각 게시물에 달리도록 처리필요)
  const saveCommentHandler = () => {
    if (comment.trim() === "") return;
    dispatch(__postDetailComment({ comment }));
    setComment({
      commentId: 0,
      comment: "",
    });
  };
  // 게시물에 달린 댓글 가져오기 GET
  useEffect(() => {
    dispatch(__getList(id));
    dispatch(__getDetailComment());
  }, [dispatch, id]);
  return (
    <>
      <div>E스타그램</div>
      디테일 페이지입니당!!!
      <MovePage>
        <button
          onClick={() => {
            navigate("/estarpost");
          }}
        >
          ✏️
        </button>
        <button>🔙익명게시판</button>
      </MovePage>
      {globalposts.map((post) => {
        return (
          <DetailBox>
            <DetailPic>
              게시글 이미지 불러오기❤️
              <p>{post.images}</p>
            </DetailPic>
            <DetailComment>
              사진옆쪽 박스
              <Profile>
                프로필 이미지{post.title}/ 이름/ ~시간전{post.like}
                {post.dislike}{" "}
              </Profile>
              <Mymemo>내가 게시물에 쓴글{post.content}</Mymemo>
              <MoreComments>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCommentHandler(comment);
                  }}
                >
                  <input
                    type="text"
                    placeholder="댓글을 달아주세요"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button>저장</button>
                </form>
              </MoreComments>
            </DetailComment>
          </DetailBox>
        );
      })}
    </>
  );
};

export default Detail;

const MovePage = styled.div`
  float: right;
  margin-right: 40px;
  font-size: x-large;
  button {
    margin-left: 10px;
    background-color: #dde7f0;
  }
`;
const DetailBox = styled.div`
  height: 600px;
  width: 1000px;
  border: 1px solid black;
  margin: 50px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const DetailPic = styled.div`
  height: 550px;
  width: 450px;
  border: 1px solid black;
`;
const DetailComment = styled(DetailPic)``;
const Profile = styled.div`
  height: 100px;
  width: 410px;
  border: 1px solid black;
  margin: auto;
`;
const Mymemo = styled(Profile)`
  margin-top: 10px;
`;
const MoreComments = styled(Mymemo)`
  height: 280px;
  form {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    input {
      border: 1px solid black;
    }
    button {
      border: 1px solid black;
    }
  }
`;
