import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { __getLists } from "../../redux/modules/ListSlice";
import { useState } from "react";
import { useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalposts = useSelector((state) => state.posts.posts);

  // //무한스크롤구현
  // const [posts, Setposts] = useState([]);
  // const [hasNextPage, setHasNextPage] = useState(true);
  // const page = useRef(1);

  // //json에서 5개씩 끊어서 가져오기
  // const fetch = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get("http://3.90.29.60/api/star/posts");
  //     Setposts((prevPosts) => [...prevPosts, ...data]);
  //     setHasNextPage(data.length == 5);
  //     if (data.length) {
  //       page.current += 1;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  // //ref를 타겟으로 지정하고, 타겟이 뷰에 보이면 inView의 값이 True로
  // const [ref, inView] = useInView();

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetch();
  //     console.log(posts);
  //   }
  // }, [fetch, hasNextPage, inView]);

  useEffect(() => {
    dispatch(__getLists());
  }, []);

  return (
    <>
      <MainImg />
      <Boxes>
        {globalposts?.map((post) => {
          return (
            <BoxMemo key={post.PostId}>
              <Image
                onClick={() => {
                  navigate(`/estardetail/${post.PostId}`);
                }}
              >
                {post.images}
              </Image>
              <Words>
                <div>
                  제목: {post.title}
                  {/* <p>내용: {post.content}</p> */}
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

const Boxes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const BoxMemo = styled.div`
  width: 300px;
  height: 300px;
  padding: 30px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  position: relative;
  /* max-width: 500px; */
`;
const Image = styled.div`
  height: 180px;
  background-color: aliceblue;
  box-shadow: 0px 3px 3px 0px gray;
  border-radius: 10px;
`;
const Words = styled.div`
  padding: 10px;
  top: 150px;
  bottom: 10px;
  /* border-top: 1px solid gray; */
  overflow: hidden;
  text-overflow: ellipsis;
  height: 25%;
`;

const MainImg = styled.div`
  width: 100%;
  height: 500px;
  background-color: aliceblue;
`;
