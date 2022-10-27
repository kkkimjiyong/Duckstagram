import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  __deleteDetailComment,
  __updateDetailComment,
} from "../../redux/modules/DetailSlice";

const Comment = ({ comment }) => {
  // console.log(comment);
  // hooks
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false); // 수정하기/댓글보기 모드
  // 수정 댓글 입력창
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  //   게시물별 댓글 삭제 버튼 Delete
  const commentDeleteHandler = (commentId) => {
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
          dispatch(__deleteDetailComment(commentId));
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
            title: "댓글 삭제",
            color: "#da5c5c",
            background: "#dd9393c7",
          });
        } else {
          return;
        }
      });
  };
  // 게시물마다 댓글 수정 저장하기 변경하여 저장 patch
  const onClickUpdateHandler = (commentId) => {
    dispatch(__updateDetailComment({ commentId, newComment }));
    setIsEditMode(false);
    setNewComment({
      comment: "",
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
      title: "댓글 수정",
      color: "#6e5d0f",
      background: "#f3d653c5",
    });
  };

  return (
    <>
      <LineComment>
        <div>
          {isEditMode ? (
            // 댓글수정하기
            <input
              type="text"
              required
              maxLength="15"
              title="15자 이하로만 입력 가능합니다."
              placeholder={comment.comment}
              onChange={(ev) => {
                setNewComment(ev.target.value);
              }}
            />
          ) : (
            // 댓글보여주기
            <>
              <p>{comment.comment}</p>
            </>
          )}
        </div>
        <div>
          {isEditMode && (
            <>
              {/* 댓글 수정중의 버튼 */}
              <button
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                🔙
              </button>
              <button onClick={() => onClickUpdateHandler(comment.commentId)}>
                🔒
              </button>
            </>
          )}
          {!isEditMode && (
            <>
              <button onClick={() => setIsEditMode(true)}>✏️</button>
              <button onClick={() => commentDeleteHandler(comment.commentId)}>
                ❌
              </button>
            </>
          )}
        </div>
      </LineComment>
    </>
  );
};

export default Comment;

const LineComment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  input {
    background-color: #ffc4768d;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
  }
`;
