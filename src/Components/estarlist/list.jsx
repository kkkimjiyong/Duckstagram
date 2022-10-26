import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeApp from "../../mytools/likeApp";
import { __getLists } from "../../redux/modules/ListSlice";
import Detail from "../estardetail/detail";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const globalposts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(__getLists());
  }, [dispatch]);

  // //무한스크롤구현
  // const [posts, Setposts] = useState([]);
  // const [hasNextPage, setHasNextPage] = useState(true);
  // const page = useRef(1);

  // //json에서 5개씩 끊어서 가져오기
  // const fetch = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://3.90.29.60/api/star/posts?page=${page.current}&pageSize=6`
  //     );
  //     Setposts((prevPosts) => [...prevPosts, ...data]);
  //     setHasNextPage(data.length == 6);
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
  //   }
  // }, [fetch, hasNextPage, inView]);

  return (
    <BoxCtn>
      <Boxes>
        <MainImg href="https://imgbb.com/">
          <img
            src="https://i.ibb.co/KWzZrpg/Estargram-Logo-removebg-preview.png"
            alt="Estargram-Logo-removebg-preview"
            border="0"
          />
        </MainImg>
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

              <BoxBtm>
                <Words>
                  <div>내용: {post.content}</div>

                  {/* <LikeApp post={post}/> */}
                </Words>
              </BoxBtm>
            </BoxMemo>
          );
        })}
      </Boxes>
      {/* <div ref={ref} style={{ position: "absolute", bottom: "0px" }} /> */}
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
