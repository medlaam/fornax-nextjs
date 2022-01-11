import Link from 'next/link'
import styles from '../styles/navbar.module.css';
import Menu from '../config/menu.json'
import socialIcons from '../config/config.json'


const MobileMenu = ({ isOpen, toggle }) => {
  return (
    <div className={`${styles.Container} `}>
      <div className={isOpen ? "text-center block shadow-sm" : 'hidden top-0 h-0'}>
        <ul className={`inline-block ${styles.navLink}`}>
          {
            Menu.header.map(n => {
              return (
                <li onClick={toggle} key={n.menu} className="p-2">
                  <Link href={n.link}><a className="">{n.menu}</a></Link>
                </li>
              )
            })
          }

        </ul>
        <ul className={`${styles.socialLinks} flex items-center justify-center p-2`}>
          {
            socialIcons.socialMedia.map(s => {
              return (
                <li key={s.name} className="p-4">
                  <Link href={s.link}><a><i className={`${s.icon} not-italic`}></i></a></Link>
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