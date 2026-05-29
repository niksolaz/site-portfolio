import Image from 'next/image'
import { store } from '../store/store'
import type { Locale } from '../types'

interface AboutProps {
  local: Locale
}

const About = ({ local }: AboutProps) => {
  const about = store.about[local]

  return (
    <div className="flex flex-wrap items-center justify-center space-y-20">
      <div className="relative flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between lg:space-x-10 space-y-10 lg:space-y-0">
        <Image
          src="/skills.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="block lg:hidden rounded-full shadow-yellow-400 shadow-lg mx-auto mb-4 lg:mb-10"
        />
        <span className="text-justify mx-auto">{about.main}</span>
        <Image
          src="/skills.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="hidden lg:block rounded-full shadow-gray-200 shadow-lg mx-auto mb-4 lg:mb-10 delay-75 duration-300 ease-in-out transform hover:rotate-12"
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between lg:space-x-10 space-y-10 lg:space-y-0">
        <Image
          src="/phone.webp"
          alt="Astronaut Hero Image skills"
          width={300}
          height={185}
          priority
          className="rounded-full shadow-gray-200 shadow-lg mx-auto mb-4 lg:mb-10 delay-75 duration-300 ease-in-out transform hover:-rotate-12"
        />
        <span className="text-justify mx-auto">
          <a className="font-bold border border-gray-200 hover:text-sky-600 hover:border-sky-600 rounded-lg px-4 py-2 cursor-pointer" href="/contact">{about.link}</a>
          {about.textLink}
        </span>
      </div>
    </div>
  )
}

export default About
