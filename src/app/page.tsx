import Image from "next/image";
import Link from 'next/link'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-0 z-10 max-w-5xl w-full flex items-center justify-between font-mono text-sm px-10 bg-black">
        <Link href="/" className="py-8 backdrop-blur-2xl text-yellow-400">
        NIXO ><span className="animate-pulse">_</span>
        </Link>
        <Link href="/contact" className="py-8 backdrop-blur-2xl text-yellow-400">
          CONTACT
        </Link>
      </div>
      <section className="text-center py-40">
        <Image
          src="/astronaut-hero-img.webp"
          alt="Astronaut Hero Image"
          width={380}
          height={37}
          priority
        />
        <h2 className="block text-8xl bg-gradient-to-r from-yellow-400 to-yellow-800 text-transparent bg-clip-text py-5">
          NIXO
        </h2>
        <p className="text-3xl  text-white">
          Trasforma le tue idee in realtà.
        </p>
      </section>
      <section className="py-40">
        <p className="text-xl container text-white lg:px-20">
        Lorem ipsum dolor sit amet suscipit aenean euismod curae nisi tristique phasellus felis proin tempus dapibus habitant et in risus mi erat ex fusce gravida lacus luctus quam sociosqu mus magnis vestibulum facilisis integer massa leo ipsum tellus ad blandit porttitor per cubilia arcu platea aliquam cras primis nullam duis sollicitudin bibendum consectetur condimentum rhoncus malesuada ligula nulla dolor taciti metus parturient class dis ornare nisl nibh tincidunt magna placerat tortor nunc amet maecenas congue pharetra adipiscing porta diam laoreet conubia nam suspendisse nascetur ante curabitur lobortis netus id venenatis a libero sagittis letius egestas si molestie faucibus mattis
        </p>
      </section>
    </main>
  );
}
