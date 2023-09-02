import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import the axios library
import { useParams } from 'react-router-dom';
import CustomNavbar from './../../components/nav';
const token = localStorage.getItem('authToken');
const containerStyle = {
  width: '100%',
  marginTop: '100px',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.25rem',
  marginTop: '1.5rem',
};

const inputStyle = {
  padding: '1rem',
  marginTop: '1.5rem',
  borderRadius: '0.25rem',
  border: 'none',
  width: '100%',
};

const textareaStyle = {
  padding: '1rem',
  marginTop: '1.5rem',
  borderRadius: '0.25rem',
  border: 'none',
  width: '100%',
};

const selectStyle = {
  padding: '1rem',
  borderRadius: '0.25rem',
  border: 'none',
};

const buttonStyle = {
  padding: '1rem',
  backgroundColor: '#efc81a',
  color: 'white',
  borderRadius: '0.25rem',
  border: 'none',
  marginTop: '1.5rem',
  width: '75%',
};

const EditMenuPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category: '',
    photo: '',
  });

  const postData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', inputData.title);
    formData.append('ingredients', inputData.ingredients);
    formData.append('category', inputData.category);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      axios.put(`http://localhost:3001/recipe/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setInputData({ ...inputData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <>
      <CustomNavbar />

      <Container style={containerStyle}>
        <Form className="col-sm-12 col-md-9 col-lg-9 mx-auto" onSubmit={postData}>
          <label htmlFor="addimage" style={labelStyle}>
            {inputData.photo ? <img src={inputData.photo} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} /> : 'Add Photo'}
            <input type="file" name="addimage" id="addimage" hidden onChange={onChangePhoto} />
          </label>
          <input type="text" name="title" placeholder="Title" style={inputStyle} value={inputData.title} onChange={onChange} />
          <div style={textareaStyle} className="addingredients">
            <textarea name="ingredients" placeholder="Ingredients" style={{ ...textareaStyle, height: '300px' }} value={inputData.ingredients} onChange={onChange}></textarea>
          </div>
          <div style={{ ...selectStyle, marginTop: '1.5rem' }} className="mt-5 col-sm-12 col-md-6">
            <Form.Select style={selectStyle} aria-label="Floating label select example" value={inputData.category} onChange={onChange} name="category">
              <option value="" disabled>
                Category
              </option>
              <option value="1">Main Course</option>
              <option value="2">Dessert</option>
              <option value="3">Appetizer</option>
            </Form.Select>
          </div>
          <div className="text-center" style={{ marginBottom: '1.5rem' }}>
            <Button style={buttonStyle} type="submit">
              Post
            </Button>
          </div>
        </Form>
      </Container>

      <section id="call-modal">{/* ... Your modal content ... */}</section>

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
    </>
  );
};

export default EditMenuPage;
