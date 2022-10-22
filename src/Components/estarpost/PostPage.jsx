import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import usePost from "../hooks/usePost";
import { __addEstar } from "../../redux/modules/PostSlice";

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.estar);
  const [value, onChange] = usePost();
  console.log(error);
  const [preview, setPreview] = useState("");
  // const [image, setImage] = useState();
  // const [content, setContent] = useState("");

  //참고 링크 https://nukw0n-dev.tistory.com/30 (base64로 인코딩)
  //https://velog.io/@ckm960411/FileReader-%EB%A1%9C-%EC%97%AC%EB%9F%AC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EB%8F%99%EC%8B%9C%EC%97%90-%EC%B2%A8%EB%B6%80%ED%95%98%EA%B8%B0-NextReact-TypeScript

  // //핸들러를 통해 받은 이미지를 base64로 인코딩한다 (FileReader라는 Web API 이용)
  // const handleImagePreview = (file) => {
  //   const reader = new FileReader();

  //   //Formdata로 변환한 URL 를 백엔드로 보내주거나, 내가 서버에 올리고 해당 title, URL을 백엔드로 Post하기
  //   //Aws (S3) 에 정적데이터 올리는 방식
  //   // blob으로 압축

  //   //readAsDataURL메서드 : File이나 Blob을 읽은 뒤 base64로 인코딩한 문자열을 FileReader 인스턴스(reader)의 result 라는 속성에 답아줌
  //   reader.readAsDataURL(file);

  //   //인코딩된 문자열을 state에 넣음으로서 렌더링하여 프리뷰를 보여준다
  //   return new Promise((resolve) => {
  //     //.onload : FileReader가 성공적으로 파일을 읽어들였을때 트리거 되는 이벤트 헨들러(메서드)
  //     //이 핸들러 내부에 우리가 원하는 이미지 프리뷰 로직을 넣어주면 됨
  //     reader.onload = () => {
  //       //reader가 인코딩을 성공했다면 reader.result 안에 담긴 문자열을 setImage로 보내주기
  //       setPreview(reader.result);

  //       // new Promise의 인자 resolve 호출하여 Promise를 이행상태로 만들어주기
  //       resolve();
  //     };
  //   });
  // };

  //미리보기 핸들러 등등
  /*   const handleImagePreview = (event: any) => {
    // event.preventDefault();
    //set Image
    setImage(() => event.target.files[0]);

    //set Preview
    objectURL = URL.createObjectURL(event.target.files[0]);
    setPreview(objectURL);
  };

  const onChange = (event) => {
    setContent(event.target.value);
  }; */

  const onSubmit = () => {
    if (value.content.trim() === "") return alert("내용을 입력해주세요");
    // else if (value.images === "") return alert("사진을 업로드 해주세요");

    //여기서부턴 이미지 관련
    /*     setContent("");
    document.querySelector(".content").focus();

    if (getItem("user")) {
      let body;
      body = new FormData();
      body.append("content", content);
      body.append("user", JSON.stringify(getItem("user")));

      if (image) body.append("images", image);

      const response = await dispatch(writeMemo(body));

      if (response.status === 200) {
        URL.revokeObjectURL(image);
        setImage("");
        window.location.href = "/";
      }
 */

    //Post dispatch

    dispatch(__addEstar(value));
    // navigate("/estarlist");
    // }
  };

  // useEffect(() => {}, [image]);

  // const handleImagePost = async (event: any) => {
  //   const formData = new FormData();
  //   formData.append("file", event.target.files[0]);
  //   const response = await apiClient.post("/brand/logo_image", formData);
  //   //response.data.location이 업로드한 파일의 url
  // };
  if (error) {
    if (window.confirm("회원이아닙니다."))
      window.location.replace("/estarpost");
  } else {
    return (
      <BigCard>
        <BackButton
          onClick={() => {
            navigate("/estarlist");
          }}
        >
          Back
        </BackButton>

        <Card>
          <Photo>
            {/* <Preview>{preview && <img src={preview} alt="미리보기" />}</Preview> */}
            <Upload>
              <UploadInput
                type="file"
                // name="images"
                // value={value.images}
                accept="image/*"
                // onChange={onChange}
                //   onChange={(e) => {
                //     handleImagePreview(e.target.files[0]);}

                // }
              ></UploadInput>
            </Upload>
          </Photo>
          <Half>
            <Info>프로필사진 + 닉네임</Info>
            <Write
              name="content"
              value={value.content}
              placeholder="텍스트를 적는 공간"
              onChange={onChange}
            ></Write>
          </Half>
          <UploadButton
            onClick={() => {
              onSubmit(value);
            }}
          >
            업로드버튼
          </UploadButton>
        </Card>
      </BigCard>
    );
  }
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

const Card = styled.div`
  width: 90%;
  height: 80%;
  margin: 60px auto 20px auto;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
`;

const Photo = styled.div`
  width: 45%;
`;
const Preview = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 100%;
  margin-bottom: 20px;
  line-height: 300px; //글자를 vertical로 중앙 정렬시 line-height 주고 vertical-align 주기
  vertical-align: middle;
`;

const Upload = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto;
`;
const UploadInput = styled.input``;
const UploadButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: gray;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -50px;
  margin-bottom: 10px;
`;

const Half = styled.div`
  width: 45%;
  height: 300px;
  background-color: lightblue;
`;
const Info = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  vertical-align: middle;
`;
const Write = styled.textarea`
  background-color: pink;
  width: 100%;
  height: 200px;
  padding: 16px;
  resize: none;
`;
