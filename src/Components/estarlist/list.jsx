import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { __getLists } from "../../redux/modules/ListSlice";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalposts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(__getLists());
  }, [dispatch]);

  return (
    <>
      <MovePage>
        <button
          onClick={() => {
            navigate("/estarpost");
          }}
        >
          ✏️
        </button>
      </MovePage>
      <Boxes>
        {globalposts.map((post) => {
          return (
            <BoxMemo key={post.id}>
              <Image
                onClick={() => {
                  navigate(`/estardetail/${post.id}`);
                }}
              >
                {post.images}
              </Image>
              <Words>
                <div>
                  제목: {post.title}
                  <p>내용: {post.content}</p>
                </div>
                <div>
                  <LikeApp />
                </div>
              </Words>
            </BoxMemo>
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
    margin: 10px;
  }
`;

const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 50px;
`;
const BoxMemo = styled.div`
  width: 100%;
  padding: 10px;
  /* max-width: 500px; */
`;
const Image = styled(BoxMemo)`
  border: 1px solid black;
  height: 300px;
`;
const Words = styled(BoxMemo)`
  border: 1px solid black;
  justify-content: space-between;
`;
