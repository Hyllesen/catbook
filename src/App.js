import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import useWindowWidth from "./hooks/useWindowWidth";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function App() {
  const [cats, addCat] = useState([]);
  const width = useWindowWidth();
  const [isFetching, setIsFetching] = useInfiniteScroll(loadCats);

  async function loadCats() {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(axios.get("https://aws.random.cat/meow"));
    }
    const responses = await Promise.all(promises);
    const newCats = responses.map(resp => resp.data.file);
    addCat(cats.concat(newCats));
    setIsFetching(false);
  }

  const catWall = cats.map(cat => <img key={cat} width={width} src={cat} />);

  return (
    <div className="App">
      <h1>CatGram 😼</h1>
      {catWall}
    </div>
  );
}

export default App;
