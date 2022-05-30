import React, { useEffect, useState } from "react";
import Card from "../componants/Card";
import axios from "axios";
import Nav from "../componants/Nav";
import Pagination from "../componants/Pagination";
import "../styles/mainStyle.css";

const URL = "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=500";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [postPerPage] = useState(9);

  const getAllTheData = async () => {
    await axios
      .get(URL)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data);
          setFilterData(response?.data);
          setErrorMessage("");
        } else {
          setErrorMessage("Failed to load the data. Please try again!");
        }
      })
      .catch((err) => {
        console.log("Got the error while fetching data: ", err);
        setErrorMessage("Something went wrong. Please try again!");
      });
  };

  useEffect(() => {
    getAllTheData();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPost = filterData.slice(indexOfFirstPost, indexOfLastPost);

  const applyFilter = async (albumid) => {
    setSelectedId(albumid);
    let filterdata = data.filter((res) => {
      return res.albumId === albumid || !albumid;
    });
    setFilterData(filterdata);
    setCurrentPage(1);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filter = () => {
    return (
      <div style={{ flex: 1 }}>
        <div className='filter-body'>
          <button
            className={!selectedId ? "btn active" : "btn"}
            onClick={() => applyFilter(null)}
          >
            {" "}
            ALL
          </button>
          <button
            className={selectedId === 1 ? "btn active" : "btn"}
            onClick={() => applyFilter(1)}
          >
            {" "}
            Album 1
          </button>
          <button
            className={selectedId === 2 ? "btn active" : "btn"}
            onClick={() => applyFilter(2)}
          >
            {" "}
            Album 2
          </button>
          <button
            className={selectedId === 3 ? "btn active" : "btn"}
            onClick={() => applyFilter(3)}
          >
            {" "}
            Album 3
          </button>
          <button
            className={selectedId === 4 ? "btn active" : "btn"}
            onClick={() => applyFilter(4)}
          >
            {" "}
            Album 4
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <div className='HomeScreen-body'>
        {filter()}
        {errorMessage && <h5 className='errorMessage'>{errorMessage}</h5>}
        <div className='HomeScreen-container'>
          {currentPost.map((info, index) => {
            return (
              <div key={index}>
                <Card title={info.title} url={info.url} />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={filterData.length}
        paginate={onPageChange}
        page={currentPage}
      />
    </div>
  );
};

export default HomeScreen;
