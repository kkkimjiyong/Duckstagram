import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Loader from "./loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moment from "react-moment";
import Likes from "./Likes";
import { getCookie } from "../estarlogin/cookiehook";
import { __getLists } from "../../redux/modules/ListSlice";
import { useDispatch } from "react-redux";

const List = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
        `https://hi-prac.shop/api/star/posts?page=${page.current}&pagesize=6`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setTimeout(() => {
        setIsLoading(false);
        Setposts((prevPosts) => [...prevPosts, ...data.data]);
      }, 2000);
      //배포용
      // `${process.env.REACT_APP_HOST}/api/star/posts?page=${page.current}&pagesize=6`
      console.log(data.data.length);
      // Setposts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length == 6);
      if (data.data.length) {
        page.current += 1;
      }

      //로드되면 로딩화면 아웃
    } catch (err) {
      console.log(err);
    }
    // finally {
    //   setIsLoading(false);
    // }
  }, []);

  // ref를 타겟으로 지정하고, 타겟이 뷰에 보이면 inView의 값이 True로
  const [ref, inView] = useInView({
    // 라이브러리 옵션
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      // console.log(1);
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  //뭔가 이상한데 일단 이게낫나?
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, offsetHeight } = document.documentElement;
  //     if (window.innerHeight + scrollTop + 400 >= offsetHeight) {
  //       fetch();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  //타임스탬프
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };
  const [like, Setlike] = useState();
  return (
    <BoxCtn>
      {/* 로딩화면 */}
      {isLoading ? <Loader /> : null}

      <Boxes>
        {posts?.map((post, index) => {
          return (
            <BoxMemo>
              <Image
                key={post.PostId}
                onClick={() => {
                  navigate(`/estardetail/${post.PostId}`);
                }}
              >
                <img src={post.imgUrl}></img>
              </Image>

              <BoxBtm>
                <Words>
                  <Time>{displayCreatedAt(post.createdAt)}</Time>

                  <div>{JSON.parse(post.title)}</div>
                  <Likes post={post}>{post.likesum}</Likes>

                  {/* <LikeApp post={post} /> */}
                  {/* <div>{JSON.parse(post.content)}</div> */}
                </Words>
              </BoxBtm>
            </BoxMemo>
          );
        })}
        <div style={{ width: "100%" }}>
          <p
            ref={ref}
            style={{
              width: "100%",
              position: "relative",

              color: "white",
              //아놔 여백 와이리 안없어지노
            }}
          >
            {/* 오리 발자국같은거 gif */}
            <img
              ref={ref}
              src="https://storymoves.com/wp-content/uploads/2020/06/dusty-the-duck-footprints.gif"
              style={{ width: "200px", margin: "20px auto" }}
            />
          </p>
        </div>
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
  margin-top: 50px;
  width: 100%;
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
  /* cursor: pointer; */
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
    cursor: pointer;
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

const Time = styled.div``;
const Words = styled.div`
  height: 70px;
  /* overflow: hidden; */
  margin: auto 10px;
  // display: flex;
  // justify-content: space-between;
  position: relative;
  div {
    width: 300px;
    overflow: hidden;
    height: 24px;
    font-size: 18px;
    font-weight: 500;
    margin: 5px;
  }
  ${Time} {
    position: absolute;
    bottom: 5px;
    left: 0;
    color: gray;
    font-weight: 300;
    font-size: 12px;
  }
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
