import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { __postDetailComment } from "../../redux/modules/DetailSlice";
import { __getList } from "../../redux/modules/ListSlice";
import { __deleteEstar, __updateEstar } from "../../redux/modules/ListSlice";

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
  const [newContent, setNewContent] = useState({
    content: "",
  });
  // 설렉터
  const globalposts = useSelector((state) => state.estar.posts); //포스트 리스트 가져오기
  console.log(globalposts);
  const { comments } = useSelector((state) => state.comments); // 댓글 리스트 가져오기
  console.log(comments);
  // 댓글 리스트들 중 파람아이디에 일치하는 것만 필더해주기
  const newglobalposts = comments.filter((comment) => {
    return comment.commentId === parseInt(id);
  });
  console.log(newglobalposts);

  // 게시물에 달린 댓글을 post해줌 -> (각 게시물에 달리도록 처리필요)
  const saveCommentHandler = () => {
    if (comment.trim() === "") return;
    dispatch(__postDetailComment({ comment, commentId: parseInt(id) })); //피림 아이디를 추가로 줌으로써 어떤 게시글에 달린 글인지 알수있게해줌
    setComment({
      commentId: 0,
      comment: "",
    });
  };
  // 게시물에 달린 댓글 가져오기 GET
  useEffect(() => {
    dispatch(__getList(id));
    // dispatch(__getDetailComment());
    // navigate("/estarlist");
  }, [dispatch, id]);

  // 게시물 삭제 Delete!!
  const deletepostHandler = (id) => {
    const result = window.confirm("정말 삭제 하시겠습니까?");
    if (result) {
      dispatch(__deleteEstar(id));
      window.location.replace("/estarlist");
    } else {
      return;
    }
  };
  // 게시물 수정 patch!!
  const updatePostHandler = (postID) => {
    dispatch(__updateEstar({ postID, newContent }));
    setIsEditMode(false);
    setNewContent({
      content: "",
    });
  };

  return (
    <>
      <BigCard>
        {!isEditMode && (
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
        )}

        <BackButton
          onClick={() => {
            navigate("/estarlist");
          }}
        >
          Back
        </BackButton>
        {globalposts?.map((post) => {
          return (
            <DeleteButton
              key={globalposts.postId}
              onClick={() => deletepostHandler(post.id)}
            >
              ❌
            </DeleteButton>
          );
        })}

        {globalposts?.map((post) => {
          return (
            <Card key={post.id}>
              <Photo>
                게시글 이미지 불러오기
                <p>{post.images}</p>
                {!isEditMode && (
                  <Info>
                    <div>
                      내가쓴글: {post.content}
                      <LikeApp />
                    </div>
                  </Info>
                )}
                {isEditMode && (
                  <>
                    <Info>
                      <div>
                        이아이는 제목
                        <button onClick={() => updatePostHandler(post.id)}>
                          🔒
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder={post.content}
                        value={post.newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                    </Info>
                  </>
                )}
              </Photo>

              <Half>
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
                  {/* <div>
                    {newglobalposts?.map((comment) => (
                      <Comment comment={comment} />
                    ))}
                  </div> */}
                </MoreComments>
              </Half>
            </Card>
          );
        })}
      </BigCard>
    </>
  );
};

export default Detail;

const BigCard = styled.div`
  width: 90%;
  height: 500px;
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
const PostButton = styled(BackButton)`
  background-color: transparent;
  font-size: larger;
  width: 50px;
  left: 5%;
`;
const DeleteButton = styled(BackButton)`
  width: 50px;
  background-color: transparent;
  right: 0%;
`;

const Card = styled.div`
  width: 90%;
  height: 80%;
  margin: 60px auto 20px auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
`;
const Photo = styled.div`
  background-color: lightcoral;
  width: 49%;
  height: 100%;
`;

const Half = styled.div`
  width: 49%;
  background-color: lightblue;
`;
const Info = styled.div`
  background-color: #8bb6db;
  width: 100%;
  height: 30%;
  line-height: 50px;
  position: sticky;
  top: 70%;
  word-break: break-all;
  line-height: normal;
  padding: 10px;
  div {
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;
  }

  input {
    width: 90%;
    height: 30px;
    vertical-align: top;
    padding: 10px;

    background-color: #afcae0;
  }
`;

const MoreComments = styled.div`
  background-color: pink;
  width: 100%;
  height: 100%;
  padding: 16px;
  resize: none;
  overflow-y: scroll;
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
        border: 5px solid #8f5053;
      }
    }
  }
`;
