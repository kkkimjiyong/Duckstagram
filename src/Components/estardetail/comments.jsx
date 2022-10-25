import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
    const result = window.confirm("정말 삭제 하시겠습니까?");
    if (result) {
      dispatch(__deleteDetailComment(commentId));
    } else {
      return;
    }
  };
  // 게시물마다 댓글 수정 저장하기 변경하여 저장 patch
  const onClickUpdateHandler = (commentId) => {
    dispatch(__updateDetailComment({ commentId, newComment }));
    setIsEditMode(false);
    setNewComment({
      comment: "",
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
  margin: 15px 5px;
`;
