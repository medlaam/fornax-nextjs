import Image from 'next/image';
import Img1 from '../public/logo-dark.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaBuromobelexperte, FaTimes } from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc'
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from './context';
import { useRouter } from 'next/router';
import Search from './search';


const Navbar = ({ toggle, isOpen }) => {
  const {value1} = useContext(AppContext);
  const [showSearch, setShowSearch] = value1;

  const router = useRouter()

  return (
    <div className={styles.Container}>
      <nav className="flex justify-between items-center h-18 bg-white  relative shadow-sm" role="navigation">
        <Link href="/"><a className="md:ml-8 p-4 md:p-8 mt-2">
          <Image src={Img1}></Image>
        </a></Link>

        {/* for mobile Menu */}
        <div className={`px-4 flex items-center lg:hidden ${styles.mobileMenu}`}>
          <li><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 cursor-pointer"><VscSearch size={20} /></a></li>
          <ul className={showSearch ? `block absolute ${styles.showSearch}` : 'hidden'} >
              <li ><Search></Search></li>
            </ul>
          <li>
            {isOpen ? <FaTimes className="cursor-pointer" size={25} onClick={toggle} /> : <FaBuromobelexperte className="cursor-pointer" size={25} onClick={toggle} />}
          </li>
        </div>

        <div className={`${styles.navLink} pr-8 lg:block hidden`}>
          <ul className="flex items-center justify-center">
            <li>
              <Link href="/"><a className={router.pathname == '/' ? `${styles.active} p-4` : "p-4"}>Home</a></Link>
            </li>
            <li>
              <Link href="/"><a className={router.pathname == '/feature' ? `${styles.active} p-4` : "p-4"}>Features</a></Link>
            </li>
            <li><Link href="/about"><a className={router.pathname == '/about' ? `${styles.active} p-4` : "p-4"}>About</a></Link>
            </li>
            <li>
              <Link href="/contact"><a className={router.pathname == '/contact' ? `${styles.active} p-4` : "p-4"}>Contact</a></Link>
            </li>
            <li><a className="p-4" href="/">Pages</a></li>
            <li className=" flex items-center justify-center border-l-2 p-4 ml-4"></li>
            <li><a className="mr-8 p-4" href="/"><FaFacebookF /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaTwitter /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaInstagram /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaPinterest /></a></li>
            <li className="cursor-pointer" ><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4"><VscSearch /></a>
            </li>
          </ul>
          <div className={showSearch ? `block relative ${styles.showSearch}` : 'hidden'} >
              <Search></Search>
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;