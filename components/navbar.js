import Image from 'next/image';
// import Link from 'next/link';
import Img1 from '../public/logo-dark.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble, FaSearch } from 'react-icons/fa';
import styles from '../styles/navbar.module.css';


const Navbar = () => {
  return (
    <div className={styles.Container}>
      <div className="container mx-auto flex flex-wrap  mt-5 p-5 flex-col md:flex-row
      items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900
        mb-4 md:mb-0">
          <Image src={Img1} alt="" className="w-8" />
        </a>
        <nav
          className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <ul className="flex mr-5">
            <li>
              <a href="/" className={`${styles.navLink} mr-5 `}>Home</a>
              <ul className={`${styles.dropdown} dropdown-menu absolute hidden pt-1`}>
                <li className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Home 1</a></li>
                <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Home 2</a></li>
                <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Home 3</a></li>
              </ul>
            </li>
            <li>
              <a className="mr-5 hover:text-gray-900">Features</a>
            </li>
            <li>
              <a className="mr-5 hover:text-gray-900">About</a>
            </li>
            <li>
              <a className="mr-5 hover:text-gray-900">Contact</a>
            </li>
            <li>
              <a className="mr-5 hover:text-gray-900">Pages</a>
            </li>
          </ul>
        </nav>
        <div className="navbar-right mr-6 mt-2">
          <ul className={`${styles.socialLinks} flex`}>
            <li className="border-l-2 mr-10" ></li>
            <li className="mr-8"><a href="#!">
              <FaFacebookF />
            </a></li>
            <li className="mr-8"><a href="#!">
              <FaTwitter />
            </a></li>
            <li className="mr-8"><a href="#!">
              <FaInstagram />
            </a></li>
            <li className="mr-8"><a href="#!">
              <FaDribbble />
            </a></li>

            <li className="list-inline-item ml-3 d-none d-lg-inline-block">
              <button className={styles.search_toggle} data-toggle="search">
                <FaSearch />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;