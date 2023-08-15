import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import Menu from './pages/DetailRecipe';
import InputMenu from './pages/inputMenu';
import EditMenuPage from './pages/EditMenu';
import Login from './pages/Login';
import Logout from './pages/Logout';
import EditProfile from './pages/EditProfil';
import DetailMenu from './pages/Recipe/DetailMenu';
import LandingPage from './pages/LandingPage';

function Menu1() {
  const { id } = useParams();
  return <h1>menu1</h1>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/LandingPage" replace={true} />} />
          <Route path="/Menu" element={<Menu />} />

          <Route path="/login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/LandingPage" element={<LandingPage />} />

          <Route path="/InputMenu" element={<InputMenu />} />
          <Route path="/Detail-menu/:id" element={<DetailMenu />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />

          <Route path="/EditMenuPage/:id" element={<EditMenuPage />} />

          <Route path="/menu-1" element={<Menu1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
