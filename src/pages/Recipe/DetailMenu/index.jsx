import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailMenu = ({ match }) => {
  const token = localStorage.getItem('authToken');
  const [menuData, setMenuData] = useState({});
  const id = '907e8b53-adb6-445c-88a1-2ed193a47654';

  useEffect(() => {
    // Ambil data dari API
    axios
      .get(`http://localhost:3001/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">{/* Navbar Content */}</nav>

      <section id="home" style={{ marginTop: '120px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 headUser">
              <div className="user d-flex align-items-center ps-5">{/* User Profile Content */}</div>
            </div>
            <div className="col-md-6 date">
              <div className="d-flex align-items-center pe-5">{/* Date Content */}</div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center mt-5 homedetail">
              <h1 className="mt-5">{menuData.title}</h1>
              <img src={menuData.photo} alt="Menu" className="mt-5 rounded-3" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="listingre">
                <h5>Ingredients</h5>
                <ul>{menuData.ingredients && menuData.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
              </div>
            </div>
            {/* Other Columns */}
            <div className="col-md-1"></div>
          </div>
          <div className="row btnSL">
            <div className="col-md-4">
              <button type="button" className="btn btnsave"></button>
              <button type="button" className="btn btnlike ms-2"></button>
            </div>
          </div>
          {/* Comments Section */}
        </div>
      </section>

      <footer className="bg-warning d-flex align-items-center justify-content-center">
        <div className="text-center text">{/* Footer Content */}</div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossOrigin="anonymous"></script>
    </div>
  );
};

export default DetailMenu;
