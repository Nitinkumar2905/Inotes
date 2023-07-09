import React from "react";

const About = (props) => {
  return (
    <>
      <div className={`container d-flex justify-content-center text-${props.mode==="Dark"?"white":"dark"}`}>Coming soon</div>
    </>
  );
};

export default About;
