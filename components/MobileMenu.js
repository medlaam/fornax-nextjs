import Link from 'next/dist/client/link'
import styles from '../styles/navbar.module.css';
import NavLinks from '../data/NavLinks';
import SocialIcons from '../data/SocialIcons';


const MobileMenu = ({ isOpen, toggle }) => {
  return (
    <div className={`${styles.Container} `}>
      <div className={isOpen ? "text-center block shadow-sm" : 'hidden top-0 h-0'}>
        <ul className={`inline-block ${styles.navLink}`}>
          {
            NavLinks.map(n => {
              return (
                <li onClick={toggle} key={n.title} className="p-2">
                  <Link href={n.href}><a className="">{n.title}</a></Link>
                </li>
              )
            })
          }

        </ul>
        <ul className={`${styles.socialLinks} flex items-center justify-center p-2`}>
          {
            SocialIcons.map(s => {
              return (
                <li key={s.name} className="p-4">
                  <Link href={s.href}><a>{s.icons}</a></Link>
                </li>
              )
            })
          }

        </ul>
      </div>
    </div>
  )
}

export default MobileMenu