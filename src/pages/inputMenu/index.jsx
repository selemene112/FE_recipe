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
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const postData1 = (e) => {
    e.preventDefault();
    // Lakukan posting data ke server atau tindakan sesuai kebutuhan
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] && setInputData({ ...inputData, photo: URL.createObjectURL(e.target.files[0]) });
    console.log(e.target.files);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <Container style={containerStyle}>
      <CustomNavbar />

      <Form className="col-sm-12 col-md-9 col-lg-9 mx-auto" onSubmit={postData}>
        <label htmlFor="addimage" style={labelStyle}>
          {selectedImage ? ( // Conditional rendering for image display
            <img src={inputData.photo} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          ) : (
            'Add Photo'
          )}
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
        <div className="text-center">
          <Button style={buttonStyle} type="submit">
            Post
          </Button>
        </div>
      </Form>

      {/* Modal code here */}
    </Container>
  );
}
