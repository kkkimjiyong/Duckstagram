import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import {
  __deleteDetailComment,
  __updateDetailComment,
} from "../../redux/modules/DetailSlice";

const Comment = ({ comment }) => {
  console.log(comment);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  //   게시물별 댓글 삭제 버튼 Delete
  const commentDeleteHandler = (id) => {
    const result = window.confirm("정말 삭제 하시겠습니까?");
    if (result) {
      dispatch(__deleteDetailComment(id));
    } else {
      return;
    }
  };
  // 게시물마다 댓글 수정 저장하기 변경하여 저장 patch
  const onClickUpdateHandler = (newCommentId) => {
    dispatch(__updateDetailComment({ newCommentId, newComment }));
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
              placeholder={comment.comment}
              value={newComment.comment}
              onChange={(ev) => {
                setNewComment(ev.target.value);
              }}
            />
          ) : (
            // 댓글보여주기
            <>
              <p>{comment.comment}</p>
              <LikeApp />
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
              <button onClick={() => onClickUpdateHandler(comment.id)}>
                🔒
              </button>
            </>
          )}
          {!isEditMode && (
            <>
              <button onClick={() => setIsEditMode(true)}>✏️</button>
              <button onClick={() => commentDeleteHandler(comment.id)}>
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
  margin: 20px;
`;
