import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';

const Home = ({ projectIdeas }) => {
  return (
    <>
      
      <HeroSection projectIdeas={projectIdeas} />
    </>
  );
};

export default Home;
