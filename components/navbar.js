import Image from 'next/image';
import { FaBuromobelexperte, FaTimes } from 'react-icons/fa';
import { VscSearch } from 'react-icons/vsc';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AppContext } from './context';
import { useRouter } from 'next/router';
import Search from './search';
import Menu from '../config/menu.json';
import socialIcons from '../config/config.json';
import logo from '../config/config.json';
import search from '../config/config.json';
import socialHeader from '../config/config.json';


const Navbar = ({ toggle, isOpen }) => {
  const { value1 } = useContext(AppContext);
  const [showSearch, setShowSearch] = value1;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && setShowSearch(false);
    });
  }, []);

  const router = useRouter();

  return (
    <div>
      <nav className="flex justify-between items-center h-18 bg-body relative shadow-sm" role="navigation">
        <Link href="/"><a className="md:ml-8 p-4 md:p-8 mt-2">
          <Image width="134" height="29" objectFit="contain" src={logo.parameter.logo}></Image>
        </a></Link>

        {/* for mobile Menu */}
        <div className={`px-4 flex items-center lg:hidden ${styles.mobileMenu}`}>
          <li><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 hover:text-primaryColor cursor-pointer"><VscSearch size={20} /></a></li>
          <ul className={showSearch ? `block absolute ${styles.showSearch}` : 'hidden'} >
            <li ><Search /></li>
          </ul>
          <li>
            {isOpen ? <FaTimes className="cursor-pointer hover:text-primaryColor" size={25} onClick={toggle} /> : <FaBuromobelexperte className="cursor-pointer hover:text-primaryColor" size={25} onClick={toggle} />}
          </li>
        </div>

        <div className={`${styles.navLink} pr-8 lg:block hidden`}>
          <ul className="flex items-center justify-center">
            {
              Menu.header.map((h,i) => (
                <li key={i} className="text-textColor hover:text-primaryColor">
                  <Link href={h.link}><a className={router.pathname == `${h.link}` ? `text-primaryColor p-6` : "p-6"}>{h.menu}</a></Link>
                </li>
              ))
            }
            <li className=" flex items-center justify-center border-l-2 p-4 ml-4"></li>
            {
              socialIcons.socialMedia.map((s,i) => (
                <div key={i}>
                  {socialHeader.parameter.headerSocial &&
                    <li  className="text-textColor hover:text-primaryColor">
                      <a className="mr-8 p-2" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                    </li>
                    }
                </div>
              ))
            }
            {
              search.parameter.search &&
              <li className="cursor-pointer" ><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 text-textColor hover:text-primaryColor"><VscSearch /></a>
              </li>
            }
          </ul>
          <div className={showSearch ? `block relative ${styles.showSearch}` : 'hidden'} >
            <Search />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;