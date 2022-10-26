import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import PostModal from "../modal/postmodal";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const [isLogin, setIsLogin] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [postOpen, setPostOpen] = useState();

  const openModal = () => {
    setPostOpen(true);
  };

  const closeModal = () => {
    setPostOpen(false);
  };

  useEffect(() => {
    console.log("cookies콘솔", cookies);
    if (cookies.token) {
      setIsLogin(true);
      setIsPost(true);
    } else {
      setIsLogin(false);
      setIsPost(false);
    }
  });

  return (
    <>
      <MainImg>
        <EstagramTag
          onClick={() => {
            navigate("/estarlist");
          }}
        >
          <div>Duckstagram</div>
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtNDYyLjA1IDIzMC43NmgtMTcyLjA5Yy0xNS42OTUgMC4wMTk1MzItMzAuNzQyIDYuMjYxNy00MS44NCAxNy4zNTktMTEuMDk4IDExLjA5OC0xNy4zNCAyNi4xNDUtMTcuMzU5IDQxLjg0djE3Mi4wOWMwLjAxOTUzMiAxNS42OTUgNi4yNjE3IDMwLjczOCAxNy4zNTkgNDEuODQgMTEuMDk4IDExLjA5OCAyNi4xNDUgMTcuMzQgNDEuODQgMTcuMzU1aDE3Mi4wOWMxNS42OTUtMC4wMTU2MjYgMzAuNzM4LTYuMjU3OCA0MS44NC0xNy4zNTUgMTEuMDk4LTExLjEwMiAxNy4zNC0yNi4xNDUgMTcuMzU1LTQxLjg0di0xNzIuMDljLTAuMDE1NjI2LTE1LjY5NS02LjI1NzgtMzAuNzQyLTE3LjM1NS00MS44NC0xMS4xMDItMTEuMDk4LTI2LjE0NS0xNy4zNC00MS44NC0xNy4zNTl6bS0xNzIuMDkgMjMuNjhoMTcyLjA5YzkuNDE4IDAuMDExNzE5IDE4LjQ0NSAzLjc1NzggMjUuMTAyIDEwLjQxNCA2LjY2MDIgNi42NjAyIDEwLjQwNiAxNS42ODggMTAuNDE4IDI1LjEwNXY3NC4yMDNoLTU0LjIxMWMtMy42ODc1LTIxLjMzNi0xNy4yNjYtMzkuNjY4LTM2LjYwOS00OS40MDYtMTkuMzQtOS43NDIyLTQyLjE1Mi05Ljc0MjItNjEuNDkyIDAtMTkuMzQgOS43MzgzLTMyLjkyMiAyOC4wNy0zNi42MDkgNDkuNDA2aC01NC4yMDd2LTc0LjIwM2MwLjAxMTcxOS05LjQxOCAzLjc1NzgtMTguNDQ1IDEwLjQxNC0yNS4xMDUgNi42NjAyLTYuNjU2MiAxNS42ODgtMTAuNDAyIDI1LjEwNS0xMC40MTR6bTEzMC45MiAxMjEuNTZjMCAxMS45MDItNC43MzA1IDIzLjMxNi0xMy4xNDUgMzEuNzMtOC40MTQxIDguNDE0MS0xOS44MjggMTMuMTQ1LTMxLjczIDEzLjE0NS0xMS44OTggMC0yMy4zMTItNC43MzA1LTMxLjcyNy0xMy4xNDUtOC40MTgtOC40MTQxLTEzLjE0NS0xOS44MjgtMTMuMTQ1LTMxLjczIDAtMTEuODk4IDQuNzI2Ni0yMy4zMTIgMTMuMTQ1LTMxLjcyNyA4LjQxNDEtOC40MTggMTkuODI4LTEzLjE0NSAzMS43MjctMTMuMTQ1IDExLjg5OCAwLjAxNTYyNSAyMy4zMDUgNC43NDYxIDMxLjcxNSAxMy4xNiA4LjQxNDEgOC40MTAyIDEzLjE0NSAxOS44MTYgMTMuMTYgMzEuNzExem00MS4xNzIgMTIxLjU2LTE3Mi4wOSAwLjAwMzkwNmMtOS40MTgtMC4wMTE3MTgtMTguNDQ1LTMuNzU3OC0yNS4xMDUtMTAuNDE4LTYuNjU2Mi02LjY1NjItMTAuNDAyLTE1LjY4NC0xMC40MTQtMjUuMTAydi03NC4yMDdoNTQuMjExYzMuNjgzNiAyMS4zNCAxNy4yNjYgMzkuNjY4IDM2LjYwNSA0OS40MSAxOS4zNDQgOS43NDIyIDQyLjE1MiA5Ljc0MjIgNjEuNDk2IDAgMTkuMzQtOS43NDIyIDMyLjkxOC0yOC4wNyAzNi42MDUtNDkuNDFoNTQuMjA3djc0LjIwN2gwLjAwMzkwNmMtMC4wMTE3MTggOS40MTgtMy43NTc4IDE4LjQ0NS0xMC40MTQgMjUuMTA1LTYuNjYwMiA2LjY1NjItMTUuNjg4IDEwLjQwMi0yNS4xMDUgMTAuNDE0em0tMjcuODk4LTIxMS44MmMtMC4wMDM5MDctMy4xNDA2IDEuMjQyMi02LjE1NjIgMy40NjQ4LTguMzc1IDIuMjE4OC0yLjIyMjcgNS4yMzQ0LTMuNDY4OCA4LjM3NS0zLjQ2NDhoMTUuNjA5LTAuMDAzOTA2YzYuNTM5MSAwIDExLjg0IDUuMzAwOCAxMS44NCAxMS44NCAwIDYuNTM5MS01LjMwMDggMTEuODQtMTEuODQgMTEuODRoLTE1LjYwOSAwLjAwMzkwNmMtMy4xNDA2IDAtNi4xNTYyLTEuMjQ2MS04LjM3NS0zLjQ2ODgtMi4yMjI3LTIuMjE4OC0zLjQ2ODgtNS4yMzA1LTMuNDY0OC04LjM3MTF6IiBmaWxsPSIjZmY4MTRhIi8+Cjwvc3ZnPgo=" />
        </EstagramTag>
      </MainImg>
      <TopCtn>
        <PostBtn
          onClick={() => {
            navigate("/");
          }}
        >
          {/* Main */}
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtNTI3LjU1IDMyMC4yMXYtNjUuMTY0YzAtNy42MjUtNi4xNTYyLTEzLjgyOC0xMy43ODEtMTMuODI4aC0yOC41NTljLTcuNjI1IDAtMTMuODI4IDYuMjAzMS0xMy44MjggMTMuODI4djE2LjQzNGwtODAuMjctNjkuNzE1Yy04LjY2OC03LjUzMTItMjEuNTQ3LTcuNTMxMi0zMC4yNjIgMGwtMTgyLjIzIDE1OC4yM2MtNy4yNDYxIDYuMjk2OS05Ljg1MTYgMTYuNDgtNi40ODgzIDI1LjUyNyAzLjQxMDIgOC45OTYxIDExLjk4IDE1LjAxMiAyMS41OTQgMTUuMDEyaDM0Ljk0OXYxNDIuMDdjMCA3LjMzOTggNS45Njg4IDEzLjMwOSAxMy4zMDkgMTMuMzA5aDc4LjUydi0xMDMuMzRjMC0xNC41ODYgMTEuODQtMjYuNDI2IDI2LjQyNi0yNi40MjZoNTguMTU2YzE0LjU4NiAwIDI2LjQyNiAxMS44NCAyNi40MjYgMjYuNDI2djEwMy4yOWg3OC40NzNjNy4zMzk4IDAgMTMuMzA5LTUuOTE4IDEzLjMwOS0xMy4zMDl2LTE0Mi4wN2gzNC45NDljMTIuNzM4IDAgMjMuMDYyLTEwLjMyNCAyMy4wNjItMjMuMTA5IDAtNy4yOTMtMy4zNjMzLTEzLjc4MS04LjY2OC0xOC4wNDN6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo="></img>
        </PostBtn>

        <PostBtn
          onClick={() => {
            if (isPost) {
              openModal();
            } else {
              Swal.fire({ title: "로그인후 이용해주세요" });
            }
          }}
        >
          {/* Post */}
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMzUwIDEzOS4yMWgyNjIuNzl2MjYyLjc5aC0yNjIuNzl6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxwYXRoIGQ9Im0yNTcuNjEgMTk4LjM5Yy0zMi40NTMgMC01OS4xOTkgMjYuNzQyLTU5LjE5OSA1OS4xOTl2MjM2Ljc5YzAgMzIuNDUzIDI2Ljc0MiA1OS4xOTkgNTkuMTk5IDU5LjE5OWgyMzYuNzljMzIuNDUzIDAgNTkuMTk5LTI2Ljc0MiA1OS4xOTktNTkuMTk5di0xMzguMTNoLTM5LjQ2NXYxMzguMTNjMCAxMS4yNzMtOC40NjA5IDE5LjczNC0xOS43MzQgMTkuNzM0aC0yMzYuNzljLTExLjI3MyAwLTE5LjczNC04LjQ2MDktMTkuNzM0LTE5LjczNHYtMjM2Ljc5YzAtMTEuMjczIDguNDYwOS0xOS43MzQgMTkuNzM0LTE5LjczNGgxMzguMTN2LTM5LjQ2NXoiIGZpbGw9IiNmZmYiLz4KIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEzLjk1MyAxMy45NTMgLTEzLjk1MyAxMy45NTMgNjM2Ljk1IDI2OC41NCkiIGQ9Im0tNy4wMDAxIDFjLTAuNTU0MDQgMC0xIDAuNDQ1OTctMSAxdjEzbDIuNSA0IDIuNS00di0xM2MwLTAuNTU0MDQtMC40NDU5Ny0xLTEtMXptMCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEzLjk1MyAxMy45NTMgLTEzLjk1MyAxMy45NTMgMTQ5ODYgLTE0MDgwKSIgZD0ibS04LjAwMDEgMTAzMi45aDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIvPgogPC9nPgogPHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMTMuOTUzIDEzLjk1MyAtMTMuOTUzIDEzLjk1MyAxNDk4NiAtMTQwODApIiBkPSJtLTggMTA0Mi45aDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIvPgo8L3N2Zz4K"></img>
        </PostBtn>
        {isLogin ? (
          <PostBtn
            onClick={() => {
              Swal.fire({ title: "로그아웃하시겠습니까?!?!?!?!" }).then(() =>
                removeCookie("token")
              );
            }}
          >
            {/* Logout */}
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtNDI4LjU3IDQyNS43M2MtMTAuODkxIDAtMTkuODkxIDguOTk2MS0xOS44OTEgMTkuODkxdjU2LjM1NWgtNjEuNTY2di0yNTIuNDJoNjEuMDk0djU2LjM1NWMwIDEwLjg5MSA4Ljk5NjEgMTkuODkxIDE5Ljg5MSAxOS44OTEgMTAuODkxIDAgMTkuODkxLTguOTk2MSAxOS44OTEtMTkuODkxbC0wLjAwMzkwNi03Ni43MTljMC0xMC44OTEtOC45OTYxLTE5Ljg5MS0xOS44OTEtMTkuODkxaC04MC45OHYtMTEuMzY3YzAtNi4xNTYyLTIuODM5OC0xMS44NC03LjU3ODEtMTUuNjI5LTQuNzM0NC0zLjc4OTEtMTAuODkxLTUuMjEwOS0xNi41NzQtNC4yNjE3bC0xNTUuODEgMzEuNzNjLTkuNDcyNyAxLjg5NDUtMTYuMTAyIDkuOTQ1My0xNi4xMDIgMTkuODkxdjI5My4xNWMwIDkuNDcyNyA2LjYyODkgMTcuOTk2IDE2LjEwMiAxOS44OTFsMTU1LjgxIDMxLjI1OGMxLjQyMTkgMC40NzI2NiAyLjgzOTggMC40NzI2NiAzLjc4OTEgMC40NzI2NiA0LjczNDQgMCA4Ljk5NjEtMS40MjE5IDEyLjc4NS00LjczNDQgNC43MzQ0LTMuNzg5MSA3LjU3ODEtOS40NzI3IDcuNTc4MS0xNS42Mjl2LTExLjM2N2g4MC45OGMxMC44OTEgMCAxOS44OTEtOC45OTYxIDE5Ljg5MS0xOS44OTF2LTc2LjcyM2MwLjQ3NjU2LTExLjM2My04LjUyMzQtMjAuMzYzLTE5LjQxNC0yMC4zNjN6bS0xNDIuMDctMjguNDE0Yy0xMS44NCAwLTIxLjMxMi05LjQ3MjctMjEuMzEyLTIxLjMxMnM5LjQ3MjctMjEuMzEyIDIxLjMxMi0yMS4zMTIgMjEuMzEyIDkuNDcyNyAyMS4zMTIgMjEuMzEyYy0wLjAwMzkwNiAxMS44NC05LjQ3MjcgMjEuMzEyLTIxLjMxMiAyMS4zMTJ6Ii8+CiAgPHBhdGggZD0ibTU5NS4yNyAzNjEuNzktNTguNzIzLTU4LjcyM2MtOC4wNTA4LTguMDUwOC0yMC4zNjMtOC4wNTA4LTI4LjQxNCAwLTguMDUwOCA4LjA1MDgtOC4wNTA4IDIwLjM2MyAwIDI4LjQxNGwyNC4xNTIgMjQuMTUyaC0xMzAuNzFjLTEwLjg5MSAwLTE5Ljg5MSA4Ljk5NjEtMTkuODkxIDE5Ljg5MSAwIDEwLjg5MSA4Ljk5NjEgMTkuODkxIDE5Ljg5MSAxOS44OTFoMTMwLjcxbC0yNC4xNTIgMjQuMTUyYy04LjA1MDggOC4wNTA4LTguMDUwOCAyMC4zNjMgMCAyOC40MTQgMy43ODkxIDMuNzg5MSA4Ljk5NjEgNS42ODM2IDE0LjIwNyA1LjY4MzYgNS4yMTA5IDAgMTAuNDE4LTEuODk0NSAxNC4yMDctNS42ODM2bDU4LjcyNy01Ny43NzdjNy41NzgxLTguMDUwOCA3LjU3ODEtMjAuMzYzIDAtMjguNDE0eiIvPgogPC9nPgo8L3N2Zz4K"></img>
          </PostBtn>
        ) : (
          <PostBtn
            onClick={() => {
              Swal.fire({
                title: "로그인하시겠습니까?",
                showCancelButton: true,
                cancelButtonText: "페이지에 머물기",
                confirmButtonText: "로그인하기",
              }).then((result) => result.value && navigate("/estarlogin"));
            }}
          >
            {/* Login */}
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtNDQyLjc0IDI1Mi44N2MwIDM1LjU1MS0yOC44MiA2NC4zNzEtNjQuMzcxIDY0LjM3MS0zNS41NTUgMC02NC4zNzUtMjguODItNjQuMzc1LTY0LjM3MSAwLTM1LjU1MSAyOC44Mi02NC4zNzEgNjQuMzc1LTY0LjM3MSAzNS41NTEgMCA2NC4zNzEgMjguODIgNjQuMzcxIDY0LjM3MSIvPgogIDxwYXRoIGQ9Im01MDYuMjMgNDg5LjY2YzAgNzAuNjE3LTU3LjI0NiA4My42NjQtMTI3Ljg3IDgzLjY2NC03MC42MTcgMC4wMDM5MDYtMTI3Ljg2LTEzLjA0My0xMjcuODYtODMuNjY0IDAtNzAuNjE3IDU3LjI0Ni0xNTEuNTUgMTI3Ljg3LTE1MS41NSA3MC42MTcgMCAxMjcuODYgODAuOTMgMTI3Ljg2IDE1MS41NXoiLz4KIDwvZz4KPC9zdmc+Cg=="></img>
          </PostBtn>
        )}
      </TopCtn>

      <PostModal
        open={postOpen}
        close={closeModal}
        header="포스트"
        style={{ zIndex: "-9999999" }}
      ></PostModal>
    </>
  );
};

const EstagramTag = styled.button``;
const MainImg = styled.div`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  margin: auto;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: white;
  ${EstagramTag} {
    display: inline-flex;
    width: 300px;

    div {
      margin-top: 10px;
      margin-left: 20px;
      font-size: 30px;
      font-weight: bold;
    }

    img {
      width: 70px;
      height: 70px;
    }
  }
`;
const TopCtn = styled.div`
  width: 100vw;

  position: fixed;
  padding: 80px 30px 40px 0;
  top: 0;
  left: 0;
  gap: 120px;
  /* margin-left: -400px; */
  /* width: 800px; */
  z-index: 999;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
`;
// const Homebtn = styled.button`
//   box-shadow: 0px 3px 3px 0px black;
//   width: 40px;
//   height: 40px;
//   border-radius: 10px;
//   background-color: #ff8f00;

//   :hover {
//     background-color: #ef6c00;
//     color: white;
//     transform: scale(1.1);
//   }
// `;

const PostBtn = styled.button`
  box-shadow: 0px 3px 3px 0px gray;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #ff8f00;
  :hover {
    background-color: #ef6c00;
    color: white;
    transform: scale(1.1);
  }
`;

export default Header;
