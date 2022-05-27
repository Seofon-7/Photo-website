import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setDate] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f917000010000011aff643bd3324abe837a28136082e6ea";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=16";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=1`;

  // fetch data from pexels api
  const search = async (url) => {
    setPage(2); // 避免搜尋照片時state沒重置
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setDate(parseData.photos);
  };

  // load more pictures
  const morepicture = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=${page}`;
    }
    setPage(page + 1);

    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setDate(data.concat(parseData.photos));
  };

  // 跑頁面時就fetch data
  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
    search(searchURL);
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data && //因data是State，在search之前裡面沒東西所以map不出來，用&&來讓data被search的時候顯示照片
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>載入更多</button>
      </div>
    </div>
  );
};

export default Homepage;
