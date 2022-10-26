import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { __getLists } from "../../redux/modules/ListSlice";
import { useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { IntersectionOptions } from "react-intersection-observer";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const globalposts = useSelector((state) => state.posts.posts);

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   dispatch(__getLists());
  // }, [dispatch]);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  // 무한스크롤구현
  const [posts, Setposts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);

  // json에서 5개씩 끊어서 가져오기
  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://3.90.29.60/api/star/posts?page=${page.current}&pagesize=6`
      );
      console.log(data.data.length);
      Setposts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length == 6);
      if (data.data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  console.log(page);
  console.log(posts);
  console.log(hasNextPage);

  // ref를 타겟으로 지정하고, 타겟이 뷰에 보이면 inView의 값이 True로
  const [ref, inView] = useInView({
    // 라이브러리 옵션
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      console.log(1);
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  return (
    <BoxCtn>
      <Boxes>
        {/* <MainImg href="https://imgbb.com/">
          <img
            src="https://i.ibb.co/KWzZrpg/Estargram-Logo-removebg-preview.png"
            alt="Estargram-Logo-removebg-preview"
            border="0"
          />
        </MainImg> */}
        {posts?.map((post) => {
          return (
            <BoxMemo key={post.PostId}>
              <Image
                onClick={() => {
                  navigate(`/estardetail/${post.PostId}`);
                }}
              >
                <img src={post.imgUrl}></img>
              </Image>

              <BoxBtm>
                <Words>
                  <div>내용: {post.content}</div>

                  {/* <LikeApp post={post}/> */}
                </Words>
              </BoxBtm>
            </BoxMemo>
          );
        })}
        <div
          ref={ref}
          style={{
            position: "relative",
            bottom: "0px",

            //아놔 여백 와이리 안없어지노
            display: "flex",
          }}
        />
      </Boxes>
      {showButton && (
        <ScrollBtn
          onClick={() => {
            scrollToTop();
          }}
        >
          🡹
        </ScrollBtn>
      )}
    </BoxCtn>
  );
};

export default List;
const BoxCtn = styled.div``;

const MainImg = styled.div`
  width: 100%;
  height: 300px;
  object-fit: scale-down;
  display: flex;
  justify-content: center;
`;

const Boxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BoxMemo = styled.div`
  border: none;
  padding: 10px;
  border-radius: 20px;
  width: 350px;
  height: 350px;
  margin: auto;
  box-shadow: 0px 3px 3px 0px gray;
  :hover {
    transform: scale(1.05);
  }
`;
const Image = styled.div`
  width: 330px;
  height: 250px;
  background-color: antiquewhite;
  box-shadow: 0px 3px 3px 0px gray;
  border-radius: 10px;
  img {
    object-fit: cover;
    width: 330px;
    height: 250px;
    border-radius: 10px;
  }
`;

const BoxBtm = styled.div`
  width: 330px;
  height: 60px;
  margin-top: 15px;
`;
const Words = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ScrollBtn = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 20px;
  box-shadow: 0px 3px 3px 0px gray;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;
