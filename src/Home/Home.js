import React from "react";
import "./Home.css";
import Menu from "./Menu";
import Feed from "./Feed"

const Home = () => {
  return (
    <>
      <div className="menu">
        <Menu />
        
      </div>
      <div className="feed">
        <Feed />
      </div>
    </>
  );
};

export default Home;
