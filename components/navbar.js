import Image from 'next/image';
import Img1 from '../public/logo-dark.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaBuromobelexperte, FaTimes } from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc'
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from './context';


const Navbar = ({ toggle, isOpen }) => {
  const [showSearch, setShowSearch] = useContext(AppContext);

  return (
    <div className={styles.Container}>
      <nav className="flex justify-between items-center h-18 bg-white  relative shadow-sm" role="navigation">
        <Link href="/"><a className="ml-6 p-8 mt-2" >
          <Image src={Img1}></Image>
        </a></Link>

        {/* for mobile Menu */}
        <div className={`px-4 flex items-center cursor-pointer md:hidden ${styles.mobileMenu}`}>
          <li onClick={() => setShowSearch(!showSearch)}><a className="mr-8 p-4"><VscSearch size={20} /></a></li>
          <li>
            {isOpen ? <FaTimes size={25} onClick={toggle} /> : <FaBuromobelexperte size={25} onClick={toggle} />}
          </li>
        </div>

        <div className={`${styles.navLink} pr-8 md:block hidden`}>
          <ul className="flex items-center justify-center">
            <li><Link href="/"><a className={`${styles.active} p-4`} >Home</a></Link></li>
            <li><Link href="/"><a className="p-4">Features</a></Link></li>
            <li><a className="p-4" href="/">About</a></li>
            <li><Link href="/contact"><a className="p-4">Contact</a></Link></li>
            <li><a className="p-4" href="/">Pages</a></li>
            <li className=" flex items-center justify-center border-l-2 p-4 ml-4"></li>
            <li><a className="mr-8 p-4" href="/"><FaFacebookF /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaTwitter /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaInstagram /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaPinterest /></a></li>
            <li className="cursor-pointer" onClick={() => setShowSearch(!showSearch)}><a className="mr-8 p-4"><VscSearch /></a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;