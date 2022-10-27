import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import usePost from "../hooks/usePost";
import { __addEstar } from "../../redux/modules/PostSlice";
import Swal from "sweetalert2";

const PostPage = () => {
  const navigate = useNavigate();
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
      position: "center-center",
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

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "게시글 작성! 😎",
      showConfirmButton: false,
      timer: 1500,
    });

    // window.confirm("게시글이 작성되었습니다 !");
    // window.location.replace("/estarlist");
  };

  console.log("preview출력", preview);
  console.log("img출력", img);
  console.log("제목출력", title);
  console.log("내용출력", comment);

  return (
    <BigCard>
      <BackButton
        onClick={() => {
          navigate("/estarlist");
        }}
      >
        Back
      </BackButton>

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
              // name="images"
              // value={value.images}
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
    </BigCard>
  );
};

export default PostPage;

const BigCard = styled.div`
  width: 90%;
  height: 500px;
  background-color: lightgray;
  border: 1px solid black;
  box-shadow: 5px 5px gray;
  border-radius: 20px;
  margin: 100px auto;
  position: relative;
`;

const BackButton = styled.button`
  width: 120px;
  height: 34px;
  text-align: center;
  background-color: white;
  position: absolute;
  top: 16px;
  right: 5%;
`;

const UploadButton = styled.button``;
const Card = styled.form`
  width: 90%;
  height: 80%;
  margin: 60px auto 20px auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;

  ${UploadButton} {
    width: 100px;
    height: 50px;
    background-color: lightgray;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -50px;
    margin-bottom: 10px;
    :hover {
      background: gray;
    }
  }
`;

const Preview = styled.div``;
const Photo = styled.div`
  width: 45%;

  ${Preview} {
    border: 1px solid black;
    height: 300px;
    width: 100%;
    margin-bottom: 20px;
    line-height: 300px; //글자를 vertical로 중앙 정렬시 line-height 주고 vertical-align 주기
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
    img {
      //스타일드 컴포넌트내에 있는 태그
      object-fit: cover;
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
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    background-color: lightgray;
    border-radius: 10px;
    margin-right: 10px;
    :hover {
      background: gray;
    }
  }

  ${PhotoResetButton} {
    width: 130px;
    height: 30px;
    background-color: lightgray;
    border-radius: 10px;
    :hover {
      background: gray;
    }
  }
`;

const Title = styled.input``;
const Write = styled.textarea``;
const Half = styled.div`
  width: 45%;
  height: 300px;
  background-color: lightblue;
  ${Title} {
    width: 100%;
    height: 100px;
    padding: 15px;
    line-height: 100px;
    vertical-align: middle;
  }

  ${Write} {
    background-color: pink;
    width: 100%;
    height: 200px;
    padding: 16px;
    resize: none;
  }
`;
