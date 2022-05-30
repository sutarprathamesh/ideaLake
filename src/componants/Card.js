import React from "react";
import "../screen/HomeScreen.css";
const Card = ({ title, url }) => {
  return (
    <>
      <div className='gallery'>
        <img src={url} alt='altimg' />
        <div className='desc'>{title}</div>
      </div>
    </>
  );
};

export default Card;
