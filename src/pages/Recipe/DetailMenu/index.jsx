import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../../../components/nav';
import { Container, Navbar, Nav, Modal, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

function DetailMenu() {
  const { id } = useParams();

  const token = localStorage.getItem('authToken');
  const [data, setData] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profilname, setprofilname] = useState('');
  const [Bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const socketIo = io('http://localhost:3001');
    console.log('Socket.io connection successful.');
    setSocket(socketIo);

    return () => {
      if (socketIo) socketIo.disconnect();
      console.log('Socket.io disconnected.');
    };
  }, []);

  useEffect(() => {
    Getcomment();
    getdetailMenu();

    const handleNewComment = (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    };

    if (socket) {
      socket.on('new comment', handleNewComment);
      console.log(socket);
    }

    return () => {
      if (socket) socket.off('new comment', handleNewComment);
    };
  }, [id, socket]);

  useEffect(() => {
    const handleNewLike = (data) => {
      setLiked(data.newLikeStatus);
      setLikeCount(data.newLikeCount);
    };

    if (socket) {
      socket.on('like', handleNewLike);
      console.log('Listening to like events');
    }

    return () => {
      if (socket) socket.off('like', handleNewLike);
    };
  }, [socket]);

  //========================================================================== GET API ====================================================================

  const handleLikeClick = () => {
    axios
      .post(`http://localhost:3001/like/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newLikeCount = res.data.data;
        const newLikeStatus = res.data.status === 'Like';

        // Emit the 'like' event to update other clients
        if (socket) {
          socket.emit('like', { id, newLikeCount, newLikeStatus });
        }

        setLiked(newLikeStatus);
        setLikeCount(newLikeCount);
        console.log(res.data);
        console.log(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getprofil();
  }, []);

  const getprofil = () => {
    axios
      .get('http://localhost:3001/user/users/navbar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('ini profilnya');
        console.log(res.data.data);
        console.log('ini profilnya');

        setProfileImageUrl(res.data.data.profil);
        setprofilname(res.data.data.nama);
        dispatch(setUserData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBookmarkClick = () => {
    // const url = `http://localhost:3001/bookmark/${id}`;

    // axios({
    //   method: Bookmark ? 'delete' : 'post',
    //   url: url,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     setBookmark((prevBookmark) => !prevBookmark);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .post(`http://localhost:3001/bookmark/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const Book1 = res.data.status === 'Bookmark';

        // Emit the 'like' event to update other clients

        setBookmark(Book1);

        console.log(res.data);
        console.log(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //========================================================================== END GET API ====================================================================
  // =============================== Update Comment ===============================

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

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

        setComments([...comments, { commentar: newComment, nama: 'Your Name' }]);

        setNewComment('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomNavbar />
      <div>
        <section id="home" style={{ marginTop: '120px' }}>
          <Container>
            <div className="row">
              <div className="col-md-6 headUser">
                <div className="user d-flex align-items-center ps-5">
                  <div className="photo me-4">
                    <img src={profileImageUrl} alt="User" width="40" />
                  </div>
                  <div className="text">
                    <p className="mb-0">{profilname}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 date">
                <div className="d-flex align-items-center pe-5">
                  <div className="text ps-5">
                    <div>{currentTime.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col text-center mt-5 homedetail">
                <h1 className="mt-5">{data.title}</h1>
                <a href={data.photo} target="_blank" rel="noopener noreferrer">
                  <img src={data.photo} alt="Recipe" className="mt-5 rounded-3" style={{ width: '500px', height: '300px' }} />
                </a>
              </div>
              <h1 className="mt-5 text-left">Ingredients</h1>
              <ul>
                <li>{data.ingredients}</li>
              </ul>
              <div className="d-flex align-items-center gap-5 mt-3 mb-5">
                <div>
                  <button onClick={handleLikeClick} className="p-3 rounded border-0 btn btn-info text-white">
                    {liked ? 'Unlike' : 'Like'}
                  </button>
                  <span className="ms-3">Likes: {likeCount}</span>
                </div>
                <div>
                  <button onClick={handleBookmarkClick} className="p-3 rounded border-0 btn btn-danger text-white">
                    {Bookmark ? 'Unbookmark' : 'Add Bookmark'}
                  </button>
                </div>
              </div>
            </div>
            <hr className="border border-warning border-5 opacity-100 mb-5" />

            <div className="row mt-5 tagComment border-2 border-warning" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {comments.map((comment, index) => (
                <div key={index} className="bg-light border border-warning p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="ml-3" style={{ marginRight: '10px' }}>
                      <Image src={comment.user_profile} alt="User" width="40" roundedCircle />
                      <p className="mt-2">Oleh: {comment?.nama}</p>
                    </div>
                    <div className="d-flex bg-warning vr opacity-100" style={{ height: '100px', width: '5px' }}></div>
                    <div className="ml-2 p-2 bg-light">
                      <p>{comment.commentar}</p>
                    </div>
                  </div>
                </div>
              ))}

              <hr className="border border-warning border-2 opacity-100 mt-5" />
            </div>

            <hr className="border border-warning border-5 opacity-100 mb-5" />

            <div className="row mt-2 ">
              <div className="col-md-1"></div>
              <div className="col-md-10 mt-1">
                <form onSubmit={handleCommentSubmit}>
                  <div className="form-floating text-center">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ height: '100px' }} value={newComment} onChange={handleCommentChange} required></textarea>
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
    </>
  );
}

export default DetailMenu;
