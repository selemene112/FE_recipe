import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { toggleNavbar, selectNavbarIsOpen, setUserData, selectUserData } from '../../redux/Modules/navbarSlice';
function CustomNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const dispatch = useDispatch();
  const isOpen = useSelector(selectNavbarIsOpen);
  const userData = useSelector(selectUserData);

  const handleToggle = () => {
    dispatch(toggleNavbar());
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/Menu');
  };

  useEffect(() => {
    getNav();
  }, []);

  const getNav = () => {
    axios
      .get('http://localhost:3001/user/users/navbar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container mt-3">
        <div className="burger">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <img src="/Logomama.png" alt="" style={{ width: '50px', height: '50px' }} />
            <ul className="navbar-nav me-auto mb-2 mt-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link className="nav-link active" to="/LandingPage">
                  Home
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="/InputMenu">
                  Add Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/searchMenu">
                  Search Menu
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="user d-flex justify-content-center align-items-center">
          <div className="photo me-4">
            <Link className="nav-link" to={`/EditProfile/${userData?.id}`}>
              <img src={userData?.profil} alt="Search" width="40" />
            </Link>
          </div>
          <div className="text">
            <p className="mb-0">{userData?.nama}</p>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
