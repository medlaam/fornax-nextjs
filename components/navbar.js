import Image from 'next/image';
import Img1 from '../public/logo-dark.png';
import { FaBuromobelexperte, FaTimes } from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc'
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AppContext } from './context';
import { useRouter } from 'next/router';
import Search from './search';
import Menu from '../config/menu.json'
import socialIcons from '../config/config.json'


const Navbar = ({ toggle, isOpen }) => {
  const { value1 } = useContext(AppContext);
  const [showSearch, setShowSearch] = value1;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && setShowSearch(false);
    })
  }, [])

  const router = useRouter()

  return (
    <div>
      <nav className="flex justify-between items-center h-18 bg-white  relative shadow-sm" role="navigation">
        <Link href="/"><a className="md:ml-8 p-4 md:p-8 mt-2">
          <Image src={Img1}></Image>
        </a></Link>

        {/* for mobile Menu */}
        <div className={`px-4 flex items-center lg:hidden ${styles.mobileMenu}`}>
          <li><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 cursor-pointer"><VscSearch size={20} /></a></li>
          <ul className={showSearch ? `block absolute ${styles.showSearch}` : 'hidden'} >
            <li ><Search/></li>
          </ul>
          <li>
            {isOpen ? <FaTimes className="cursor-pointer hover:text-primaryColor" size={25} onClick={toggle} /> : <FaBuromobelexperte className="cursor-pointer hover:text-primaryColor" size={25} onClick={toggle} />}
          </li>
        </div>

        <div className={`${styles.navLink} pr-8 lg:block hidden`}>
          <ul className="flex items-center justify-center">
            {
              Menu.header.map(h => (
                <li key={h.menu} className="text-textDark hover:text-primaryColor">
                  <Link href={h.link}><a className={router.pathname == `${h.link}` ? `text-primaryColor p-6` : "p-6"}>{h.menu}</a></Link>
                </li>
              ))
            }
            <li className=" flex items-center justify-center border-l-2 p-4 ml-4"></li>
            {
              socialIcons.socialMedia.map(s => (
                <li key={s.name} className="text-textDark hover:text-primaryColor">
                  <a className="mr-8 p-2" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
              ))
            }
            <li className="cursor-pointer" ><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 text-textDark hover:text-primaryColor"><VscSearch /></a>
            </li>
          </ul>
          <div className={showSearch ? `block relative ${styles.showSearch}` : 'hidden'} >
            <Search/>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;