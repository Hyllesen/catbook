import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash.debounce";
import useWindowWidth from "./hooks/useWindowWidth";

function App() {
  const [cats, addCat] = useState([]);
  const width = useWindowWidth();

  const loadCats = async () => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(axios.get("https://aws.random.cat/meow"));
      const responses = await Promise.all(promises);
      const newCats = responses.map(resp => resp.data.file);
      addCat(cats.concat(newCats));
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  const catWall = cats.map(cat => <img key={cat} width={width} src={cat} />);

  return (
    <div className="App">
      {catWall}
      <button onClick={loadCats}>Give me more cats!</button>
    </div>
  );
}

export default App;
