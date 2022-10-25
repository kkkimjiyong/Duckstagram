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
  }, []);

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
        {globalposts?.map((post) => {
          return (
            <BoxMemo key={post.PostId}>
              <Image
                onClick={() => {
                  navigate(`/estardetail/${post.PostId}`);
                }}
              >
                <img src={post.imgUrl}></img>
              </Image>
              <Words>
                <div>
                  <div>
                    제목: {post.title}
                    <br></br>
                    내용: {post.content}
                  </div>

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
  margin-top: 10px;
  margin-right: 50px;
  font-size: x-large;

  button {
    margin: 10px;
    &:hover {
      font-size: larger;
    }
  }
`;

const Boxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 50px;
`;
const BoxMemo = styled.div`
  width: 300px;
  padding: 10px;
  border-radius: 10px;
`;
const Image = styled(BoxMemo)`
  border: 1px solid black;
  height: 300px;
  box-shadow: 0 0 0.5em 0 gray;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Words = styled(BoxMemo)`
  border: 1px solid black;
  box-shadow: 0 0 0.5em 0 gray;

  div {
    display: flex;
    justify-content: space-between;
  }
`;
