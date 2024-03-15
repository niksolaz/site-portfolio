import React from 'react'
import {store}  from "../store/store";

const About = () => {
  const about = store.about;
  return (
    <div className="flex flex-wrap items-center justify-center lg:grid lg:grid-cols-2 gap-2">
       <div className="col-span-1 mx-4 text-justify">{ about }</div>
       <div className="col-span-1 mx-4 text-justify text-yellow-500">{ about }</div>
    </div>
  )
}

export default About