import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 max-w-5xl w-full flex items-center justify-between font-mono text-sm px-10 bg-black">
        <Link href="/" className="py-8 backdrop-blur-2xl text-yellow-400">
        NIXO ><span className="animate-pulse">_</span>
        </Link>
        <Link href="/contact" className="py-8 backdrop-blur-2xl text-yellow-400">
            CONTACT
        </Link>
    </div>
  )
}

export default Navbar