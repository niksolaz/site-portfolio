import React from 'react'
import {store}  from "../store/store";

const About = () => {
  const about = store.about;
  return (
    <div>{ about }</div>
  )
}

export default About