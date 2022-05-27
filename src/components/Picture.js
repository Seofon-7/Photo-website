import React from "react";

const picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
        <img src="" alt="" />
      </div>
      <p>
        下載照片:{" "}
        <a target="_blank" href={data.src.large}>
          下載
        </a>
      </p>
    </div>
  );
};

export default picture;
