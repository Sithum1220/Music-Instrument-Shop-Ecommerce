import React, { useEffect } from 'react';
import Home from '../components/LayOut/Home/Home';
import Navbar from '../components/LayOut/NavBar/Navbar';
import Footer from '../components/LayOut/Footer/Footer';

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
