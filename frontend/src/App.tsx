<<<<<<< HEAD
import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Content from './components/Content';
import imagePath from './assets/logotu.png';



function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar brandName="Hochschulwahl" imageScrPath={imagePath} />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  './App.css'

import ConsentForm from './components/ConsentFormsFolder/ConsentForm.tsx'



function App() {

  return (
    <div>
      <ConsentForm />
    </div>
  )
}

export default App
>>>>>>> 63d273955938e36da957886d9f167f9237b71f15
