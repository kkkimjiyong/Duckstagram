import React, { useState } from "react";
import "./modal.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import usePost from "../hooks/usePost";
import { __addEstar } from "../../redux/modules/PostSlice";
import Swal from "sweetalert2";

const PostModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.estar);
  // const [value, onChange] = usePost();
  console.log("에러메세지", error);
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImagePreview = (file) => {
    setImg(null);
    setPreview([]);
    console.log(file.target.files);
    // setImg(file.target.files);
    // file.target.files.length < 4
    //   ? setImg(file.target.files)
    //   : alert("사진은 최대 4개까지만 추가 가능합니다");

    //프리뷰 (핸들러를 통해 받은 이미지를 base64로 인코딩)
    // for (let i = 0; i < file.target.files.length; i++) {
    if (file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onloadend = () => {
        setImg(file.target.files[0]);

        //.onloadend : 읽기가 완료 되었을 때
        const base64 = reader.result;
        if (base64) {
          const previewSub = base64.toString();
          setPreview(previewSub);
        }
      };
    }
    // }
  };

  const onPhotoDelete = () => {
    setImg(null);
    setPreview([]);
    setComment("");
    setTitle("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "" || title.trim() === "")
      // else if (img === null) return alert("사진을 업로드 해주세요");
      return;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      iconColor: "#6e5d0f",
      title: "내용을 입력해주세요",
      color: "#6e5d0f",
      background: "#f3d653c5",
    });

    // e.preventDefault();

    const sendFD = new FormData();
    sendFD.append("images", img);
    sendFD.append("content", JSON.stringify(comment)); // 넣고싶은 데이터는 이렇게 넣으면 됨
    sendFD.append("title", JSON.stringify(title));

    //sendFD 콘솔에서 확인방법
    for (let a of sendFD.entries()) {
      console.log("sendFD출력", a);
    }

    //Post dispatch
    dispatch(__addEstar(sendFD));
    // 알럿이 모달창 밑에 뜸
    // Swal.fire({
    //   position: "top-left",
    //   icon: "success",
    //   title: "게시글 작성! 😎",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <Card enctype="multipart/form-data">
              <Photo>
                <Preview>
                  {preview.length > 0 ? (
                    <img
                      key={1}
                      src={preview}
                      alt="미리보기"
                      style={{
                        width: `100%`,
                        height: `100%`,
                      }}
                    />
                  ) : (
                    <div>사진을 추가해 주세요</div>
                  )}
                </Preview>
                <Upload>
                  <UploadInput
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImagePreview(e);
                    }}
                    multiple="multiple"
                  ></UploadInput>
                  <UploadInputDesign htmlFor="upload-input">
                    사진 추가
                  </UploadInputDesign>
                  <PhotoResetButton
                    onClick={() => {
                      onPhotoDelete();
                    }}
                  >
                    내용 다시 쓰기
                  </PhotoResetButton>
                </Upload>
              </Photo>
              <Half>
                <Title
                  name="title"
                  value={title}
                  placeholder="제목 적어죠"
                  onChange={onTitleChange}
                />
                <Write
                  name="content"
                  value={comment}
                  placeholder="텍스트를 적는 공간"
                  onChange={onCommentChange}
                ></Write>
              </Half>

              <UploadButton onClick={onSubmit}>업로드 하기</UploadButton>
            </Card>
            {props.children}
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default PostModal;

const UploadButton = styled.button``;
const Card = styled.form`
  /* width: 90%;
  height: 80%; */
  margin: 0 auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;

  div {
    margin-bottom: 30px;
  }

  ${UploadButton} {
    /* width: 120px;
    height: 50px;
    background-color: lightgray;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -60px;
    margin-bottom: 10px;

    color: #fff;
    background-color: #6c757d;
    font-size: 18px; */

    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -60px;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    transition: 0.25s;
    background: #ffae7b;
    color: white;
    font-size: 18px;
    font-weight: bold;

    :hover {
      background: #ef6c00;
      color: white;
      font-weight: bold;
      box-shadow: 1px 1px 3px 0 gray;
      letter-spacing: 2px;
      transform: scale(1.1);
      margin-left: -64px;
    }

    :active {
      transform: scale(1.3);
    }
  }
`;

const Preview = styled.div``;
const Photo = styled.div`
  width: 45%;

  ${Preview} {
    border: 1px solid #f7efea;
    height: 300px;
    width: 100%;
    margin-bottom: 20px;
    line-height: 300px; //글자를 vertical로 중앙 정렬시 line-height 주고 vertical-align 주기
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
    img {
      //스타일드 컴포넌트내에 있는 태그
      object-fit: contain;
      /* border: 1px solid black; */
    }
    div {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const UploadInput = styled.input``;
const UploadInputDesign = styled.label``;
const PhotoResetButton = styled.button``;
const Upload = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  ${UploadInput} {
    display: none;
  }

  ${UploadInputDesign} {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    background-color: #f7efea;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    :hover {
      background: #ffae7b;
    }
  }

  ${PhotoResetButton} {
    width: 130px;
    height: 40px;
    background-color: #f7efea;
    border-radius: 10px;
    :hover {
      background: #ffae7b;
    }
  }
`;

const Title = styled.input``;
const Write = styled.textarea``;
const Half = styled.div`
  width: 45%;
  height: 300px;
  background-color: #f7efea;
  border: 1px solid #f7efea;
  border-radius: 20px;
  padding: 10px;
  ${Title} {
    border-radius: 20px 20px 0 0;
    width: 100%;
    height: 70px;
    padding: 15px;
    line-height: 100px;
    vertical-align: middle;
  }

  ${Write} {
    border-radius: 0 0 20px 20px;
    background-color: #f7efea;
    width: 100%;
    height: 205px;
    padding: 16px;
    resize: none;
  }
`;
