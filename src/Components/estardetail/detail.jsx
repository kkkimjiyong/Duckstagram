import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
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

  // 설렉터
  const globalposts = useSelector((state) => state.posts.postlist); //포스트 리스트 가져오기

  const globalComments = useSelector((state) => state.comments.comments); // 댓글 리스트 가져오기
  console.log(globalComments);

  // 댓글 리스트들 중 파람아이디에 일치하는 것만 필더해주기
  const newglobalposts = globalComments.filter((comment) => {
    return comment.postId === parseInt(id);
  });
  console.log(newglobalposts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newContent, setNewContent] = useState({
    content: "",
  });

  console.log();
  // 게시물에 달린 댓글을 post해줌 -> (각 게시물에 달리도록 처리필요)
  console.log(comment);
  const saveCommentHandler = () => {
    if (comment.trim() === "") return;
    dispatch(__postDetailComment({ comment, id })); //피림 아이디를 추가로 줌으로써 어떤 게시글에 달린 글인지 알수있게해줌

    const Toast = Swal.mixin({
      toast: true,
      position: "center-center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      iconColor: "#48792c",
      title: "댓글 저장",
      color: "#48792c",
      background: "#aedd93c8",
    }).then(function () {
      window.location.reload();
    });
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
  }, [dispatch, id]);

  // 게시물 삭제 Delete!!
  const deletepostHandler = async (id) => {
    Swal.fire({
      title: "정말 삭제 하시겠습니다까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5496d3",
      cancelButtonColor: "#da5959",
      confirmButtonText: "삭제",
    })
      // const result = window.confirm("정말 삭제 하시겠습니까?");
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(__deleteEstar(id));
          // 댓글삭제 알럿창(토스트)
          const Toast = Swal.mixin({
            toast: true,
            position: "center-center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            iconColor: "#da5c5c",
            title: "게시물 삭제",
            color: "#da5c5c",
            background: "#dd9393c7",
          });
        } else {
          return;
        }
      });
  };
  // 게시물 수정 patch!!
  const updatePostHandler = () => {
    dispatch(__updateEstar(newContent));

    setIsEditMode(false);
    setNewContent({
      content: "",
    });
    // 댓글수정 알럿창(토스트)
    const Toast = Swal.mixin({
      toast: true,
      position: "center-center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      iconColor: "#6e5d0f",
      title: "게시물 수정",
      color: "#6e5d0f",
      background: "#f3d653c5",
    });
  };
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
          ❌
        </BackButton>
        <DeleteButton
          key={globalposts.PostId}
          onClick={() => deletepostHandler(globalposts.PostId)}
        >
          {/* 휴지통 */}
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjNjc2NzY3Ij4KICA8cGF0aCBkPSJtNDIzLjM2IDI2Mi4zNHYtMTQuMjA3YzAtNS4yMjY2LTQuMjQyMi05LjQ3MjctOS40NzI3LTkuNDcyN2gtNzUuNzczYy01LjIyNjYgMC05LjQ3MjcgNC4yNDIyLTkuNDcyNyA5LjQ3Mjd2MTQuMjA3aC02MS41NjJjLTUuMjI2NiAwLTkuNDcyNyA0LjI0MjItOS40NzI3IDkuNDcyN3YyOC40MTRjMCA1LjIyNjYgNC4yNDIyIDkuNDcyNyA5LjQ3MjcgOS40NzI3aDIxNy44NWM1LjIyNjYgMCA5LjQ3MjctNC4yNDIyIDkuNDcyNy05LjQ3Mjd2LTI4LjQxNGMwLTUuMjI2Ni00LjI0MjItOS40NzI3LTkuNDcyNy05LjQ3Mjd6Ii8+CiAgPHBhdGggZD0ibTI4Ni4wMiAzMTkuMTdjLTIuNjI4OSAwLTUuMTMyOCAxLjA4OTgtNi45MjE5IDMuMDExNy0xLjc4OTEgMS45MjE5LTIuNzAzMSA0LjUtMi41MjM0IDcuMTE3MmwxOC45NDEgMjAzLjY0YzAuMzQ3NjYgNC45NjQ4IDQuNDcyNyA4LjgxMjUgOS40NDkyIDguODEyNWgxNDIuMDdjNC45NzY2IDAgOS4xMDE2LTMuODUxNiA5LjQ0OTItOC44MTI1bDIzLjY4LTIwMy42NGMwLjE4MzU5LTIuNjE3Mi0wLjczMDQ3LTUuMTk5Mi0yLjUxOTUtNy4xMTcyLTEuNzk2OS0xLjkyMTktNC4zMDA4LTMuMDExNy02LjkyOTctMy4wMTE3em01MS42MDkgMTc5LjkzYy0wLjI0NjA5IDAuMDE1NjI1LTAuNDk2MDkgMC4wMjczNDMtMC43MzQzOCAwLjAyNzM0My00LjkwNjIgMC05LjA1NDctMy43NzczLTkuNDMzNi04Ljc0NjFsLTkuMDYyNS0xMTguMjRjLTAuMzk4NDQtNS4yMTg4IDMuNTAzOS05Ljc2OTUgOC43MTg4LTEwLjE2OCA1LjE3OTctMC4zOTg0NCA5Ljc2NTYgMy41MDM5IDEwLjE2OCA4LjcxODhsOS4wNjI1IDExOC4yNGMwLjQwMjM0IDUuMjE4OC0zLjUgOS43Njk1LTguNzE4OCAxMC4xNjh6bTQ3Ljg0NC05LjU0M2MwIDUuMjI2Ni00LjI0MjIgOS40NzI3LTkuNDcyNyA5LjQ3MjctNS4yMjY2IDAtOS40NzI3LTQuMjQyMi05LjQ3MjctOS40NzI3bDAuMDAzOTA2LTExOC4zYzAtNS4yMjY2IDQuMjQyMi05LjQ3MjcgOS40NzI3LTkuNDcyNyA1LjIyNjYgMCA5LjQ3MjcgNC4yNDIyIDkuNDcyNyA5LjQ3Mjd6bTM3LjA0MyAwLjg4MjgxYy0wLjQ2MDk0IDQuOTA2Mi00LjU4OTggOC41ODU5LTkuNDE4IDguNTg1OS0wLjI5Njg4IDAtMC41OTM3NS0wLjAxNTYyNS0wLjg5MDYyLTAuMDQyOTY5LTUuMjEwOS0wLjQ4ODI4LTkuMDM1Mi01LjEwNTUtOC41NDY5LTEwLjMxNmwxMS4wNzQtMTE4LjA0YzAuNDg4MjgtNS4yMTA5IDUuMDk3Ny05LjAyNzMgMTAuMzE2LTguNTQzIDUuMjEwOSAwLjQ4ODI4IDkuMDM1MiA1LjEwNTUgOC41NDY5IDEwLjMxNnoiLz4KIDwvZz4KPC9zdmc+Cg==" />
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
                <Title>{JSON.parse(globalposts.title)}</Title>
                <textarea
                  Def
                  value={newContent.content}
                  onChange={(e) =>
                    // setReContent()
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
  width: 60%;
  min-width: 700px;
  min-height: 500px;
  background-color: #f8c37e;
  border: 1px solid orange;
  box-shadow: 5px 5px #fa9511;
  border-radius: 20px;
  margin: 70px auto;
  position: relative;
`;

const BackButton = styled.button`
  /* width: 110px; */
  height: 30px;
  /* text-align: center; */
  font-size: 30px;
  font-weight: 1000;
  position: absolute;
  top: 16px;
  right: 1%;
  &:hover {
    transform: scale(1.2);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: -10px;
  width: 70px;
  background-color: transparent;
  /* font-size: 20px; */
  z-index: 99999;
  img {
    /* width: 100%; */
  }
`;

const Card = styled.div`
  width: 90%;
  margin: 60px auto 20px auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;

  flex-wrap: wrap;
  position: relative;
  padding: 10px;
`;
const Photo = styled.div`
  /* background-color: lightcoral; */
  width: 48%;
  height: 100%;
  margin-right: 10px;
  box-shadow: 0.5em 0.5em 0.5em 0 #fde4c4;
  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Half = styled.div`
  width: 48%;
  /* background-color: lightblue; */
`;

const Title = styled.div``;
const Content = styled.div``;
const Info = styled.div`
  background-color: #fddaab;
  width: 100%;
  height: 100%;
  word-break: break-all;
  padding: 10px;
  position: relative;
  border-radius: 10px;
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
    height: 67%;
    vertical-align: top;
    padding: 10px;
    resize: none;
    background-color: #afcae0;
    margin-top: 10px;
    border-radius: 15px;
    background-color: #ffc4768d;
  }

  ${Title} {
    height: 30%;
    padding: 44px 10px;
    background-color: #ecb56c;
    text-align: left;
    box-shadow: inset -1px -1px 10px #f8e5a7;
    border-radius: 15px;
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
  background-color: #fddaab;
  width: 100%;
  height: 100%;
  padding: 16px;
  resize: none;
  border-radius: 10px;
  form {
    display: flex;
    justify-content: space-between;
    /* margin: 10px; */
    input {
      background-color: #ffc4768d;
      width: 85%;
      padding: 5px;
      border-radius: 10px;
    }
    button {
      width: 10%;
      border: 3px solid #fd950d;
      border-radius: 20px;
      padding: 5px;
      color: black;
      background-color: #f8c37e;
      &:hover {
        font-weight: 700;
        background-color: #fd950d;
      }
    }
    div {
      overflow-y: scroll;
    }
  }
`;
