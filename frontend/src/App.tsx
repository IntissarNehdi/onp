import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Content from './components/content';
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
