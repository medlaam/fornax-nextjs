import Image from 'next/image';
import Img1 from '../public/logo-dark.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaBuromobelexperte, FaTimes} from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc'
import styles from '../styles/navbar.module.css';
import Link from 'next/link';


const Navbar = ({ toggle, isOpen }) => {
  return (
    <div className={styles.Container}>
      <nav className="flex justify-between items-center h-18 bg-white  relative shadow-sm" role="navigation">
        <a className=" ml-6 p-8 mt-2" href="/">
          <Image src={Img1}></Image>
        </a>
        <div className="px-4 cursor-pointer md:hidden">
          {isOpen ? <FaTimes size={25} onClick={toggle} /> : <FaBuromobelexperte size={25} onClick={toggle} />}
        </div>
        <div className={`${styles.navLink} pr-8 md:block hidden`}>
          <ul className="flex items-center justify-center">
            <li><a className={`${styles.active} p-4`} href="/">Home</a></li>
            <li><a className="p-4" href="/">Features</a></li>
            <li><a className="p-4" href="/">About</a></li>
            <li><Link href="/contact"><a className="p-4">Contact</a></Link></li>
            <li><a className="p-4" href="/">Pages</a></li>
            <li className=" flex items-center justify-center border-l-2 p-4 ml-4"></li>
            <li><a className="mr-8 p-4" href="/"><FaFacebookF /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaTwitter /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaInstagram /></a></li>
            <li><a className="mr-8 p-4" href="/"><FaPinterest /></a></li>
            <li><a className="mr-8 p-4" href="/"><VscSearch /></a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;