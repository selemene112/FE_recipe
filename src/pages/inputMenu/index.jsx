import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from './../../components/nav';

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

const token = localStorage.getItem('authToken');
//==================================================================================================
export default function AddMenu() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category: '',
    photo: '',
  });
  const postData = (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputData.title);
    bodyFormData.append('ingredients', inputData.ingredients);
    bodyFormData.append('category', inputData.category_id);
    bodyFormData.append('photo', photo);

    console.log(bodyFormData);

    axios
      .post('http://localhost:3001/recipe', bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/menu');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onChangePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container style={containerStyle}>
      <CustomNavbar />

      <Form className="col-sm-12 col-md-9 col-lg-9 mx-auto" onSubmit={postData}>
        <label className="border border-dark bg-light" htmlFor="addimage" style={labelStyle}>
          {selectedImage ? <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', maxHeight: '200px' }} /> : 'Add Photo'}
          <input type="file" name="addimage" id="addimage" hidden onChange={onChangePhoto} />
        </label>
        <input className="border border-dark bg-light" type="text" name="title" placeholder="Title" style={inputStyle} value={inputData.title} onChange={onChange} />
        <div className="border border-dark bg-light addingredients " style={textareaStyle}>
          <textarea name="ingredients" placeholder="Ingredients" style={{ ...textareaStyle, height: '300px' }} value={inputData.ingredients} onChange={onChange}></textarea>
        </div>
        <div className=" mt-5 col-sm-12 col-md-6 " style={{ ...selectStyle, marginTop: '1.5rem' }}>
          <Form.Select style={selectStyle} aria-label="Floating label select example" value={inputData.category} onChange={onChange} name="category">
            <option value="" disabled>
              Category
            </option>
            <option value="1">Main Course</option>
            <option value="2">Dessert</option>
            <option value="3">Appetizer</option>
          </Form.Select>
        </div>
        <div className="text-center">
          <Button style={buttonStyle} type="submit">
            Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}
