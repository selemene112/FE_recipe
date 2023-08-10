import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal
    localStorage.removeItem('authToken');

    // Arahkan pengguna ke halaman login (atau halaman lain)
    navigate('/Menu');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}
