import Link from 'next/dist/client/link'
import styles from '../styles/navbar.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';


const MobileMenu = ({ isOpen }) => {
  return (
    <div className={`${styles.Container} `}>
      <div className={isOpen ? "text-center block shadow-sm" : 'hidden top-0 h-0'}>
        <ul className={`inline-block ${styles.navLink}`}>
          <li className="p-2">
            <Link href='/'><a className="" >Home</a></Link>
          </li>
          <li className="p-2">
            <Link href='/'><a className="" >Feature</a></Link>
          </li>
          <li className="p-2">
            <Link href='/'><a>About</a></Link>
          </li>
          <li className="p-2">
            <Link href="/"><a>Pages</a></Link>
          </li>
          <li className="p-2">
            <Link href="/"><a>Contact</a></Link>
          </li>
        </ul>
        <ul className={`${styles.socialLinks} flex items-center justify-center p-2`}>
          <li className="p-4">
            <Link href="/"><a><FaFacebookF /></a></Link>
          </li>
          <li className="p-4">
            <Link href="/"><a><FaTwitter /></a></Link>
          </li>
          <li className="p-4">
            <Link href="/"><a><FaInstagram /></a></Link>
          </li>
          <li className="p-4">
            <Link href="/"><a><FaPinterest /></a></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobileMenu