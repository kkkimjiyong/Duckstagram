const Like = (props) => {
  return (
    <div
      onClick={() => {
        props.changeLike(props.isLike, props.index);
      }}
    >
      {props.isLike ? "❤️" : "🤍"}
    </div>
  );
};
export default Like;
