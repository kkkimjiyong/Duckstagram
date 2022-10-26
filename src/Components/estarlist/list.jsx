import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { getCookie } from "../estarlogin/cookiehook";
import Loader from "./loading";
import { useCookies } from "react-cookie";

const List = () => {
  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setTimeout(() => {
        setIsLoading(false);
        Setposts((prevPosts) => [...prevPosts, ...data.data]);
      }, 2000);
      const { data } = await axios.get(
        `http://3.90.29.60/api/star/posts?page=${page.current}&pagesize=6`
      );
      console.log(data.data.length);
      // Setposts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length == 6);
      if (data.data.length) {
        page.current += 1;
      }

      //로드되면 로딩화면 아웃
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setIsLoading(false);
    // }
  }, []);
  // console.log(page);
  // console.log(posts);
  // console.log(hasNextPage);

  // ref를 타겟으로 지정하고, 타겟이 뷰에 보이면 inView의 값이 True로
  const [ref, inView] = useInView({
    // 라이브러리 옵션
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      // console.log(1);
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  return (
    <BoxCtn>
      {/* 로딩화면 */}
      {isLoading ? <Loader /> : null}

      <Boxes>
        {posts?.map((post) => {
          return (
            <BoxMemo
              key={post.PostId}
              onClick={() => {
                navigate(`/estardetail/${post.PostId}`);
              }}
            >
              <Image>
                <img src={post.imgUrl}></img>
              </Image>

              <BoxBtm>
                <Words>
                  <div>{JSON.parse(post.title)}</div>
                  <div>{JSON.parse(post.content)}</div>

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
const BoxCtn = styled.div`
  width: 95%;
`;

const Boxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BoxMemo = styled.div`
  border: none;
  padding: 14px 10px;
  border-radius: 20px;
  width: 350px;
  height: 350px;
  margin: auto;
  cursor: pointer;
  box-shadow: 3px 3px 6px 0px gray;
  :hover {
    transform: scale(1.05);
  }
`;
const Image = styled.div`
  width: 330px;
  height: 250px;
  background-color: antiquewhite;
  box-shadow: 3px 3px 3px 0px gray;
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
  display: flex;
  flex-direction: row;
  margin: auto 10px;
`;
const ScrollBtn = styled.button`
  background-color: white;
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
