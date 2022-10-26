import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import {
  __getDetailComment,
  __postDetailComment,
} from "../../redux/modules/DetailSlice";
import { __getList } from "../../redux/modules/ListSlice";
import { __deleteEstar, __updateEstar } from "../../redux/modules/ListSlice";
import Comment from "./comments";

const Detail = () => {
  // hooks

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // 인풋박스 훅
  const [comment, setComment] = useState({
    commentId: 0,
    comment: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [newContent, setNewContent] = useState({ content: "" });

  // 설렉터
  const globalposts = useSelector((state) => state.posts.postlist); //포스트 리스트 가져오기

  const globalComments = useSelector((state) => state.comments.comments); // 댓글 리스트 가져오기
  console.log(globalComments);

  // 댓글 리스트들 중 파람아이디에 일치하는 것만 필더해주기
  const newglobalposts = globalComments.filter((comment) => {
    return comment.postId === parseInt(id);
  });
  console.log(newglobalposts);

  // 게시물에 달린 댓글을 post해줌 -> (각 게시물에 달리도록 처리필요)
  console.log(comment);
  const saveCommentHandler = () => {
    if (comment.trim() === "") return;
    dispatch(__postDetailComment({ comment, id })); //피림 아이디를 추가로 줌으로써 어떤 게시글에 달린 글인지 알수있게해줌
    setComment({
      comment: "",
    });
  };
  // 게시물에 달린 댓글 가져오기 GET
  useEffect(() => {
    dispatch(__getList(id));
    // dispatch(__getList(id));
    dispatch(__getDetailComment(id));
    // navigate("/estarlist");
  }, []);

  // 게시물 삭제 Delete!!
  const deletepostHandler = async (id) => {
    const result = window.confirm("정말 삭제 하시겠습니까?");
    if (result) {
      await dispatch(__deleteEstar(id));
      // window.location.replace("/estarlist");
    } else {
      return;
    }
  };
  // 게시물 수정 patch!!
  const updatePostHandler = () => {
    dispatch(__updateEstar(newContent));

    setIsEditMode(false);
    // setNewContent({
    //   content: "",
    // });
  };
  console.log(newContent);
  return (
    <>
      <BigCard>
        {/* {!isEditMode && (
          <PostButton onClick={() => setIsEditMode(true)}>✏️</PostButton>
        )}
        {isEditMode && (
          <>
            <PostButton
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              🔙
            </PostButton>
          </>
        )} */}
        <BackButton
          onClick={() => {
            navigate("/estarlist");
          }}
        >
          Back
        </BackButton>
        <DeleteButton
          key={globalposts.PostId}
          onClick={() => deletepostHandler(globalposts.PostId)}
        >
          ❌
        </DeleteButton>
        <Card key={globalposts.PostId}>
          <Photo>
            <div>
              <img src={globalposts.imgUrl}></img>
            </div>
          </Photo>
          <Half>
            {!isEditMode && (
              <Info>
                <Title>{globalposts.title}</Title>
                <Content>{globalposts.content}</Content>
                {/* <div>
                        내가쓴글: {post.content}
                        <LikeApp />
                      </div> */}
                <PostButton onClick={() => setIsEditMode(true)}>✏️</PostButton>
              </Info>
            )}
            {isEditMode && (
              <Info>
                <Title>{globalposts.title}</Title>
                <textarea
                  value={globalposts.content}
                  onChange={(e) =>
                    setNewContent({ ...globalposts, content: e.target.value })
                  }
                />
                {/* {isEditMode && ( */}

                <PostButton
                  onClick={() => {
                    setIsEditMode(false);
                  }}
                >
                  🔙
                </PostButton>

                {/* )} */}
                <button onClick={() => updatePostHandler(globalposts.PostId)}>
                  🔒
                </button>
              </Info>
            )}
          </Half>
          <MoreComments>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveCommentHandler(comment);
              }}
            >
              <input
                type="text"
                required
                maxLength="15"
                title="15자 이하로만 입력 가능합니다."
                placeholder="댓글을 달아주세요"
                value={comment.comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button>저장</button>
            </form>
            <div>
              {newglobalposts?.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </MoreComments>
        </Card>
      </BigCard>
    </>
  );
};

export default Detail;

const BigCard = styled.div`
  width: 90%;
  min-height: 500px;
  background-color: lightgray;
  border: 1px solid black;
  box-shadow: 5px 5px gray;
  border-radius: 20px;
  margin: 100px auto;
  position: relative;
`;

const BackButton = styled.button`
  width: 120px;
  height: 34px;
  text-align: center;
  background-color: white;
  position: absolute;
  top: 16px;
  right: 5%;
  &:hover {
    font-size: x-large;
  }
`;

const DeleteButton = styled(BackButton)`
  width: 50px;
  background-color: transparent;
  right: 0%;
`;

const Card = styled.div`
  width: 90%;
  margin: 60px auto 20px auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
  position: relative;
  padding: 10px;
`;
const Photo = styled.div`
  background-color: lightcoral;
  width: 48%;
  height: 100%;
  margin-right: 10px;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Half = styled.div`
  width: 48%;
  background-color: lightblue;
`;

const Title = styled.div``;
const Content = styled.div``;
const Info = styled.div`
  background-color: #8bb6db;
  width: 100%;
  height: 100%;
  word-break: break-all;
  padding: 10px;
  position: relative;

  button {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 50px;
  }

  input {
    width: 100%;
    height: 30%;
  }

  textarea {
    width: 100%;
    height: 70%;
    vertical-align: top;
    padding: 10px;
    resize: none;
    background-color: #afcae0;
  }

  ${Title} {
    height: 30%;
    padding: 44px 10px;
    background-color: gray;
    text-align: left;
  }

  ${Content} {
    padding: 10px;
    height: 70%;
    text-align: left;
  }
`;
const PostButton = styled(BackButton)`
  background-color: transparent;
  font-size: larger;
  position: absolute;
  right: 50px;
  bottom: 20px;
  width: 50px;
`;

const MoreComments = styled.div`
  margin-top: 30px;
  background-color: pink;
  width: 100%;
  height: 100%;
  padding: 16px;
  resize: none;

  form {
    display: flex;
    justify-content: space-between;
    /* margin: 10px; */
    input {
      background-color: #fcd6dc;
      width: 85%;
      padding: 5px;
    }
    button {
      width: 10%;
      border: 3px solid #8f5053;
      border-radius: 20px;
      padding: 5px;
      color: white;
      background-color: #da777c;
      &:hover {
        font-weight: 700;
        background-color: #8f5053;
      }
    }
    div {
      overflow-y: scroll;
    }
  }
`;
