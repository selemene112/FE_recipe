import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from './../../components/nav';

function EditProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  const [profil, setProfil] = useState(null);
  const [inputData, setInputData] = useState({
    nama: '',
    email: '',
    password: '',
    profil: '',
  });

  const editdata = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nama', inputData.nama);
    formData.append('email', inputData.email);
    formData.append('password', inputData.password);
    if (profil) {
      formData.append('profil', profil);
    }
    try {
      axios.put(`http://localhost:3001/user/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
    // navigate('/Menu');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  const onChangePhoto = (e) => {
    setProfil(e.target.files[0]);
    setInputData((prevInputData) => ({
      ...prevInputData,
      profil: URL.createObjectURL(e.target.files[0]),
    }));
  };

  return (
    <div>
      <CustomNavbar />

      <section className="container w-100 d-flex justify-content-center align-items-center" style={{ paddingTop: '100px' }}>
        <div className="my-5 col-sm-12 col-md-6 col-lg-6">
          <form onSubmit={editdata}>
            <div className="d-flex flex-column align-items-center">
              <img src={inputData.profil} alt="" className="w-50" />
              <div className="fw-medium">Change Profile Picture</div>
            </div>
            <input type="file" accept="image/*" onChange={onChangePhoto} className="form-control mt-3" />

            <label htmlFor="nama" className="mt-3 fw-medium">
              Name
            </label>
            <input type="text" id="nama" name="nama" placeholder="Name" value={inputData.nama} className="w-100 p-3 rounded mt-3" onChange={onChange} />
            <label htmlFor="email" className="mt-3 fw-medium">
              Email
            </label>
            <input type="text" id="email" name="email" placeholder="Email" value={inputData.email} className="w-100 p-3 rounded mt-3" onChange={onChange} />
            <label htmlFor="password" className="mt-3 fw-medium">
              Password
            </label>
            <input type="password" id="password" name="password" placeholder="Password" value={inputData.password} className="w-100 p-3 rounded mt-3" onChange={onChange} />

            <Button className="p-3 rounded border-0 text-white w-100 mt-5 bg-warning" type="submit">
              Update Profile
            </Button>
            <p className="mt-3 fw-medium">
              Change Password?{' '}
              <a href="./change-password.html" className="text-warning text-decoration-none">
                Click Here
              </a>
            </p>
          </form>
        </div>
      </section>
      <section id="call-modal">
        <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-warning" id="exampleModalLabel">
                  You want to logout?
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn w-100 bg-warning text-white border-0">
                  Yes
                </button>
                <button type="button" className="btn bg-secondary-subtle w-100 text-white border-0" data-bs-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
