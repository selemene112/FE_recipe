import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileImage from './e.png';
import CustomNavbar from './../../components/nav';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Container } from 'react-bootstrap';

const SearchMenu = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:3001/recipe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <CustomNavbar />

      <Container style={{ paddingTop: '100px' }}>
        <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
          <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
            <div>
              <img src={profileImage} alt="" />
            </div>
            <div>
              <div>Ayudia</div>
              <div className="fw-bold">10 Recipes</div>
            </div>
          </div>
          <div>
            <div>21 Februari 2023</div>
          </div>
        </div>
        {/*  */}

        <div className="detail-profile-menu border-bottom border-warning border-5">
          <ul className="list-unstyled d-flex gap-4 fs-3 fw-bold flex-wrap">
            <li>
              <a href="/DetailRecipe.html" className="text-decoration-none selected">
                Recipes
              </a>
            </li>
            <li>
              <a href="./DetailBookmark.html" className="text-decoration-none">
                Bookmarked
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                Liked
              </a>
            </li>
          </ul>
        </div>
        {/*  */}
        {/* ... Rest of the content ... */}
        {data.map((item, index) => (
          <div key={index} className="row mt-5 align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <a href={`/Detail-menu/${item.id}`}>
                <img src={item.photo} alt="" className="w-100" />
              </a>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h2>{item.title}</h2>
              <p>Ingredients: {item.ingredients}</p>
              <div className="w-75">
                <div className="bg-warning rounded p-3 text-center text-white">
                  {item.likes} Likes - {item.comments} Comments - {item.bookmarks} Bookmarks
                </div>
              </div>
              <div className="d-flex align-items-center gap-5 mt-3 mb-5">
                <div>
                  <a href={`/EditMenuPage/${item.id}`}>
                    <button className="p-3 rounded border-0 btn btn-info text-white">Like</button>
                  </a>
                </div>
                <div>
                  <button className="p-3 rounded border-0 btn btn-danger text-white">Add Bookmark</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/*  */}
        <div className="my-5 text-center">
          <div>
            <button className="rounded p-2 button-custom text-white border-0">Prev</button> Show 6-10 From 10
          </div>
        </div>
      </Container>
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
      {/* ... Modal and Footer ... */}
    </div>
  );
};

export default SearchMenu;
