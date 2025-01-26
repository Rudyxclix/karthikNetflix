import React from "react";
import NavBar from "./components/NavBar/NavBar"
import './App.css'
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import { action, horror, originals, romantic, trending } from "./urls";

function App() {

  return (
    <>
      <NavBar />
      <Banner />
      <RowPost url={originals} title={'Netflix Originals'} isBackDrop />
      <RowPost url={action} title={'Action'} isSmall />
      <RowPost url={trending} title={'Trending'} isSmall />
      <RowPost url={romantic} title={'Romantic'} isSmall />
    </>
  )
}

export default App
