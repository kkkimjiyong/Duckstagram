import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Like = (props) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log("cookies콘솔", cookies);
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
  return (
    <div
      onClick={() => {
        props.changeLike(props.isLike, props.index);
        if (!isLogin) {
          Swal.fire({ title: "로그인후 이용해주세요" });
        }
      }}
    >
      {props.isLike ? "❤️" : "🤍"}
    </div>
  );
};
export default Like;
