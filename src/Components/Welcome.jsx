import React from "react";

const About = (props) => {
  return (
    <>
      <div className={`container d-flex justify-content-center text-${props.mode==="Dark"?"white":"dark"}`}>Welcome To Inotes cloud service</div>
    </>
  );
};

export default About;
