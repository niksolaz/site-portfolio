import React from 'react'
import Image from "next/image";
import {store}  from "../store/store";

interface AboutState {
  main: string;
  link: string;
  textLink: string;
}  

interface AboutObject {
  it: AboutState;
  en: AboutState;
  es: AboutState;
}  


const About = ({local}: {local: string}) => {
  const about:AboutObject = store.about
  return (
    <div className="flex flex-wrap items-center justify-center space-y-20">
      <div className="relative flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between lg:space-x-10 space-y-10 lg:space-y-0">
        <Image
          src="/skills.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="block lg:hidden rounded-full shadow-yellow-400 shadow-lg mx-auto  mb-4 lg:mb-10"
        />
       <span className="text-justify mx-auto">{ about[local as keyof AboutObject].main }</span>
       <Image
          src="/skills.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="hidden lg:block rounded-full shadow-yellow-400 shadow-lg mx-auto  mb-4 lg:mb-10"
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between lg:space-x-10 space-y-10 lg:space-y-0">
        <Image
          src="/phone.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="rounded-full shadow-yellow-400 shadow-lg mx-auto  mb-4 lg:mb-10"
        />
       <span className="text-justify mx-auto">
        <a className="text-yellow-400 cursor-pointer" href="/contact">{ about[local as keyof AboutObject].link }</a> { about[local as keyof AboutObject].textLink }
       </span>
      </div>
    </div>
  )
}

export default About