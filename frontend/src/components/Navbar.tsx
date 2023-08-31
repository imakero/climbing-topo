import Link from "next/link";
import NavUser from "./NavUser";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <svg
          className="mr-2 h-8 w-8 fill-current"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 19 8 a 8 8 0 0 0 16 0 a 8 8 0 0 0 -16 0 Z m 6 0 l 4 32 l 0 -32 Z" />
        </svg>
        <span className="text-xl font-semibold tracking-tight">Topo</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white">
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/search"
            className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            Search
          </Link>
        </div>
      </div>
      <div>
        <NavUser />
      </div>
    </nav>
  );
};

export default Navbar;
