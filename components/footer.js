import styles from '../styles/footer.module.css';
import socialIcons from '../config/config.json'

const Footer = () => {
  return (
    <div className={`mt-24 pt-5 border-t-2 mb-5`}>
      <div className="text-center">
      </div>
        <ul className={`${styles.icons} mt-10 flex items-center justify-center`}>
          {
              socialIcons.socialMedia.map(s => (
                <li key={s.name}>
                  <a className="p-4 hover:text-primaryColor" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
              ))
            }
        </ul>
      <div className="mt-5 text-center">
        <p>© {new Date().getFullYear()}, All rights reserved. <br /> Develop by  <a className="text-primaryColor" href="">GetHugoThemes</a></p>
      </div>
    </div>
  );
};

export default Footer;