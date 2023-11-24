import React from "react";

const Header = ({ scrollTo, aboutRef, setForm }) => {
  return (
    <>
      <header>
        <div>
          <h3>LOREM IPSUM</h3>
          <nav>
            <a onClick={() => scrollTo(aboutRef.current)}>About</a>
            {/* <a >Gallery</a>
            <a >Prices</a> */}
            <a onClick={() => setForm((prev) => !prev)}>Contact</a>
          </nav>
        </div>
      </header>
      <div>
        <div id="image-gradient">
          <div>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            placeat
          </h1>
          <button onClick={() => setForm((prev) => !prev)}>Contact</button></div>
        </div>
      </div>
    </>
  );
};

export default Header;
