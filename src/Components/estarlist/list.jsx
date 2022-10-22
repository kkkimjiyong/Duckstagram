import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getLists } from "../../redux/modules/ListSlice";
// http://localhost:3001/posts?postId=1
const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalposts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  console.log(error);

  useEffect(() => {
    dispatch(__getLists());
  }, [dispatch]);

  return (
    <>
      <div>E스타그램</div>
      {/* <img src={`http://localhost:3001/${posts.images}`} /> */}
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
      <Boxes>
        {globalposts.map((post) => {
          return (
            <div
              key={post.postId}
              onClick={() => {
                navigate(`/estardetail/${post.postId}`);
              }}
            >
              <BoxMemo>
                <Image>{post.images}</Image>
                <Words>
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </Words>
              </BoxMemo>
            </div>
          );
        })}
      </Boxes>
    </>
  );
};

export default List;

const MovePage = styled.div`
  float: right;
  margin-right: 40px;
  font-size: x-large;
  button {
    margin-left: 10px;
    background-color: #dde7f0;
  }
`;

const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  div {
    border: 1px solid black;
    max-width: 300px;
    width: 90%;
    height: 300px;
  }
`;

const BoxMemo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled(BoxMemo)`
  border: 1px solid black;
  max-width: 250px;
  width: 90%;
  height: 150px;
`;
const Words = styled(BoxMemo)`
  border: 1px solid black;
  max-width: 250px;
  width: 90%;
  height: 10px;
  margin-top: 10px;
`;
