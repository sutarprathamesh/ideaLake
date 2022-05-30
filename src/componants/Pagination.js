import React, { memo } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, page }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className='pagination-ul'>
        {pageNumber.map((number, index) => (
          <button
            className='pagination-btn'
            type='button'
            key={index}
            style={{
              backgroundColor: page === number ? "#ccebff" : "white",
            }}
            onClick={() => {
              paginate(number);
            }}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Pagination);
