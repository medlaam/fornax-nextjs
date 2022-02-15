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
  const { toggleSearch } = useContext(AppContext);
  const [showSearch, setShowSearch] = toggleSearch;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && setShowSearch(false);
    });
  }, []);

  const router = useRouter();

  return (
    <div>
      <nav className="px-4 py-4 sm:py-8 sm:px-12 xl:pl-24 xl:pr-20 flex justify-between items-center h-18 bg-body relative shadow-sm" role="navigation">
        <Link href="/"><a className="">
          <Image width="134" height="29" objectFit="contain" src={logo.parameter.logo}></Image>
        </a></Link>

        {/* for mobile Menu */}
        <div className={`px-4 flex items-center lg:hidden ${styles.mobileMenu}`}>
          <li><a onClick={() => setShowSearch(!showSearch)} className="mr-8 p-4 transition  duration-300 ease-in-out hover:text-primaryColor cursor-pointer"><VscSearch size={20} /></a></li>
          <ul className={showSearch ? `block absolute ${styles.showSearch}` : 'hidden'} >
            <li ><Search /></li>
          </ul>
          <li>
            {isOpen ? <FaTimes className="cursor-pointer hover:text-primaryColor" size={25} onClick={toggle} /> : <FaBuromobelexperte className="cursor-pointer transition  duration-300 ease-in-out hover:text-primaryColor" size={25} onClick={toggle} />}
          </li>
        </div>

        <div className={`${styles.navLink} pr-8 lg:block hidden`}>
          <ul className="flex items-center justify-center">
            {
              Menu.header.map((h, i) => (
                <li key={i} className="text-textColor transition  duration-300 ease-in-out hover:text-primaryColor">
                  <Link href={h.link}><a className={router.pathname == `${h.link}` ? `text-primaryColor mx-6` : "mx-6"}>{h.menu}</a></Link>
                </li>
              ))
            }
            <div className=" flex items-center justify-center border-l-2 px-4 ml-4">
              {
                socialIcons.socialMedia.map((s, i) => (
                  <div key={i}>
                    {socialHeader.parameter.headerSocial &&
                      <li className="social-icon">
                        <a className="mx-4" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                      </li>
                    }
                  </div>
                ))
              }
            </div>
            {
              search.parameter.search &&
              <div className="cursor-pointer flex items-start justify-center text-textColortransition  duration-300 ease-in-out  hover:text-primaryColor"><a onClick={() => setShowSearch(!showSearch)} className="p-2 ml-4"><VscSearch /></a>
              </div>
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