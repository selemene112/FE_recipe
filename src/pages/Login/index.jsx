import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // const history = useHistory();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  //================================== Refresh Token ====================================
  const startTokenRefresh = async () => {
    const token = localStorage.getItem('authToken');
    console.log('ini tokennya yang lain');
    console.log(token);

    try {
      const response = await axios.post(
        'http://localhost:3001/Auth',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('isi dalam Respon');
      console.log(response);

      // Mengupdate token di localStorage dengan token baru dari respons
      localStorage.setItem('authToken', response.data.data);
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    // Lakukan pemanggilan berulang setelah 5 detik
    setTimeout(startTokenRefresh, 15000);
  };

  // Memulai proses refresh token
  // startTokenRefresh();

  //============================ For Login ======================================
  const AuthLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/login', inputData);
      console.log(response.data); // Data dari respons
      const token = response.data.data; // mengambil token
      localStorage.setItem('authToken', token); // menyimpan di lokal
      console.log('ini Token belum di refresh');
      console.log(token);
      startTokenRefresh();
      // navigate('/Menu'); // Contoh: Arahkan ke dashboard setelah masuk berhasil
      // history.push('/login');
    } catch (error) {
      console.error('Error:', error);
      // Lakukan penanganan kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
  };

  return (
    <div>
      <section className="container w-100">
        <div className="w-100 my-5 registration d-flex align-items-center justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-5 auth-desc text-center">
              <h2 className="mb-5 fw-bolder">Recipe</h2>
              <h1>Welcome</h1>
              <p>Login into your existing account</p>
            </div>
            <hr />
            <form onSubmit={AuthLogin}>
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input type="text" id="email" name="email" value={inputData.email} onChange={handleInputChange} placeholder="Enter email address" className="p-3 rounded w-100 mt-3" />
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input type="password" id="password" name="password" value={inputData.password} onChange={handleInputChange} placeholder="Password" className="p-3 rounded w-100 mt-3" />
              <label className="check-wrap mt-3">
                I agree to terms & conditions
                {/* <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> */}
                {/* perubahan CHECK BOX */}
                <span className="checkmark"></span>
              </label>
              <button type="submit" className="p-3 border-0 bg-warning text-white rounded mt-5 w-100">
                Login
              </button>
            </form>
            <div className="mt-1">
              <p>
                Forgot your password?{' '}
                <a href="./forget_password.html" className="text-decoration-none text-warning">
                  Click here
                </a>
              </p>
            </div>
            {/* <div className="mt-5 text-center">
              <p>
                Don't have an account?{' '}
                <a href="./register.html" className="text-decoration-none text-warning">
                  Sign Up
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
