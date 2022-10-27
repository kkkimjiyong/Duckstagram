import { useState, useEffect } from "react";

export default function RandomApi(url) {
  const [word, setWord] = useState("");
  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://nickname.hwanmoo.kr/?format=json&count=1"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWord(data);
      });
  }, []);

  return word.words;
}
