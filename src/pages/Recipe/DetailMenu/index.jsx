import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function DetailMenu() {
  const { id } = useParams();

  const token = localStorage.getItem('authToken');
  const [data, setData] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Getcomment();
    getdetailMenu();
  }, []);

  // const writecom = () => {
  //   axios
  //     .post(`http://localhost:3001/com/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setComments(res.data.writecom);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const Getcomment = () => {
    axios
      .get(`http://localhost:3001/com/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getdetailMenu = () => {
    axios
      .get(`http://localhost:3001/recipe/${id}`, {
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

  // =============================== Update Comment ===============================

  const handleCommentChange = (event) => {
    setNewComment(event.target.value); // Update new comment state
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Send the new comment to the API
    axios
      .post(
        `http://localhost:3001/com/${id}`,
        {
          commentar: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // Update the comments state with the new comment
        setComments([...comments, { commentar: newComment, nama: 'Your Name' }]);
        // Clear the new comment input
        setNewComment('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link href="../index.html">Home</Nav.Link>
              <Nav.Link href="./addMenu.html">Add Menu</Nav.Link>
              <Nav.Link href="./SeacrhMenu.html">Search Menu</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* ... Rest of the content ... */}
        </Container>
      </Navbar>

      <section id="home" style={{ marginTop: '120px' }}>
        <Container>
          <div className="row">
            <div className="col-md-6 headUser">
              <div className="user d-flex align-items-center ps-5">
                <div className="photo me-4">
                  <img src="../asset/img/Profil/ProfilNav.svg" alt="User" width="40" />
                </div>
                <div className="text">
                  <p className="mb-0">Ayudia</p>
                  <p className="mb-0">
                    <a href="#" className="text-dark">
                      <strong>10 Recipes</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 date">
              <div className="d-flex align-items-center pe-5">
                <div className="text ps-5">
                  <p className="mb-0">21 February 2023</p>
                  <p className="mb-0">20 Likes - 2 Comments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 headUser">
              <div className="user d-flex align-items-center ps-5">{/* User photo and text */}</div>
            </div>
            <div className="col-md-6 date">
              <div className="d-flex align-items-center pe-5">{/* Date and likes info */}</div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center mt-5 homedetail">
              <h1 className="mt-5">{data.title}</h1>
              <a href={data.photo} target="_blank" rel="noopener noreferrer">
                <img src={data.photo} alt="Recipe" className="mt-5 rounded-3" />
              </a>
            </div>
            <h1 className="mt-5 text-left">Ingredients</h1>
            <ul>
              <li>{data.ingredients}</li>
            </ul>
          </div>
          {/* UNTUK COMMENT  */}
          <div className="row mt-5 tagComment">
            <hr className="border border-warning border-2 opacity-100 mb-5" />
            {/* Loop through the comments */}

            {comments.map((comment, index) => (
              <div key={index} className="komentar">
                <p>{comment.commentar}</p>
                <p>Oleh: {comment.nama}</p>
              </div>
            ))}

            <hr className="border border-warning border-2 opacity-100 mt-5" />
          </div>

          <div className="row mt-5">
            <div className="col-md-1"></div>
            <div className="col-md-10 mt-5">
              <form onSubmit={handleCommentSubmit}>
                <div className="form-floating text-center">
                  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ height: '200px' }} value={newComment} onChange={handleCommentChange} required></textarea>
                  <label htmlFor="floatingTextarea">Your comment here!</label>
                  <button type="submit" className="btn btn-warning mt-4 text-light btncomment">
                    Send a comment
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-1"></div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default DetailMenu;
