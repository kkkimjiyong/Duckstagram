import { useState } from "react";
import Like from "./like";

const LikeApp = () => {
  const [likeList, setLikeList] = useState([
    {
      isLike: false,
    },
  ]);

  const changeLike = (isLike, index) => {
    const filterArray = likeList.map((likeItem, arrayIndex) => {
      if (arrayIndex === index) {
        return isLike
          ? { ...likeItem, isLike: false }
          : { ...likeItem, isLike: true };
      } else return likeItem;
    });
    setLikeList(filterArray);
  };

  return (
    <div>
      {likeList.map((item, index) => (
        <Like isLike={item.isLike} index={index} changeLike={changeLike} />
      ))}
    </div>
  );
};
export default LikeApp;
