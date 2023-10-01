import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavbar from '../../components/nav';
import axios from 'axios';

import './SearchMenu.css';

import { useDispatch, useSelector } from 'react-redux';

const SearchMenu = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const token = localStorage.getItem('authToken');

  const [searchBy, setSearchBy] = useState('');
  const handleCategoryFilterChange = (value) => {
    setSearchBy(value);
  };
  const recipesPerPage = 10;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    // Tambahkan pemanggilan fungsi pencarian di sini
    searchRecipes(value);
  };

  const searchRecipes = (searchText) => {
    axios
      .get('http://localhost:3001/recipe/pagination/recipe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          searchBy,
          search: searchText,
          page: 1, // Reset halaman ke 1 setiap kali mencari
        },
      })
      .then((res) => {
        console.log(res.data);
        setFilteredRecipes(res.data.data);
        setTotalPages(res.data.pagination.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchRecipes(searchValue); // Pencarian awal saat komponen dimuat
  }, [searchValue, searchBy]); // Jadikan searchBy sebagai dependensi untuk memastikan perubahan kategori juga memicu pemanggilan pencarian ulang

  return (
    <>
      <CustomNavbar />
      <section id="home">
        <div className="container">
          <div className="side1 bg-warning"></div>
          <div className="row">
            <div className="col ps-5 d-flex align-items-center">
              <div className="cover">
                <h1 id="discover">
                  Discover Recipe <br />& Delicious Food
                </h1>
                <div className="input-group input-group-lg inputSearch">
                  <input
                    type="text"
                    className="form-control bg-body-secondary ps-4"
                    placeholder="Search by title or creator..."
                    aria-label="Search by title or creator..."
                    aria-describedby="inputGroup-sizing-lg"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <button type="button" className="btn btn-warning text-light btnSearch">
                Search
              </button>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ps-5 btnHelp">
              <button type="button" className={`btn ${searchBy === 'title' ? 'btn-success' : 'btn-secondary'} mt-2`} onClick={() => handleCategoryFilterChange('title')}>
                title
              </button>
              <button type="button" className={`btn ${searchBy === 'ingredients' ? 'btn-success' : 'btn-secondary'} mt-2`} onClick={() => handleCategoryFilterChange('ingredients')}>
                ingredients
              </button>

              <button type="button" className={`btn ${searchBy === '' ? 'btn-success' : 'btn-secondary'} mt-2`} onClick={() => handleCategoryFilterChange('')}>
                All
              </button>
            </div>
          </div>
          {filteredRecipes.map((item, index) => (
            <div key={index} className="row">
              <div className="col-md-4 mt-5 ms-5 imgCoverr rounded-4 p-0" style={{ width: '18rem' }}>
                <a href={`Detail-menu/${item.id}`}>
                  <img src={item.photo} alt="Search" className="rounded-3" style={{ width: '18rem', height: '18rem', objectFit: 'cover' }} onClick={() => handleDetailMenu(item.id)} />
                </a>
              </div>
              <div className="col-md-4 titleDescc">
                <p className="fs-5 mt-3 " onClick={() => handleDetailMenu(item.id)}>
                  {item.title}
                </p>
                <div className="desc">
                  <p>
                    <strong>Ingredients:</strong> <br />
                    {item.ingredients.split(' ').length > 8 ? getFirst10Words(item.ingredients) + ' ...' : item.ingredients}
                  </p>
                </div>
                <button type="button" className="btn btn-warning">
                  10 Likes - 12 Comment - 3 Bookmark
                </button>
                <div className="author mt-3 d-flex">
                  <img src={item.user_profile} alt="Search" className="me-3 rounded-circle" />
                  <h6 className="mt-2 text-capitalize">{item.user_name}</h6>
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center mt-5 page">
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button key={index} type="button" className={`btn ${currentPage === index + 1 ? 'btn-warning text-light' : 'btn-secondary text-dark'} ms-1`} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center page">
              <h5 className="mt-2">
                Show {Math.min((currentPage - 1) * recipesPerPage + 1, filteredRecipes.length)}-{Math.min(currentPage * recipesPerPage, filteredRecipes.length)} From {filteredRecipes.length}
              </h5>
            </div>
          </div>
        </div>
        <footer className="text-center bg-warning pt-5">
          <h1 className="mt-5 text-purple">Eat, Cook, Repeat</h1>
          <p>Share Your Best Recipe By Uploading Here !</p>
          <div className="row justify-content-end m-0 p-0 mt-5 pt-5 pb-4">
            <div className="d-flex justify-content-center col-lg-4">
              <ul className="list-unstyled d-flex gap-3">
                <li>Product</li>
                <li>Company</li>
                <li>Learn More</li>
                <li>Get In Touch</li>
              </ul>
            </div>
            <div className="col-lg-4 fw-bolder">&copy;Arkademy</div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default SearchMenu;
