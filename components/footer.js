import styles from '../styles/footer.module.css';
import { FaFacebookF,FaTwitter,FaInstagram,FaDribbble, FaLinkedinIn, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={`${styles.footer} mt-24 pt-5 border-t-2 mb-5`}>
      <div className="text-center">
        <p className={`${styles.heading} mt-5`}>Our Instagram</p>
      </div>
      <div className={`${styles.icons} mt-5 flex justify-center`}>
        <ul className={`${styles.icons} mt-5 flex justify-center`}>
          <li className="m-4"><a href=""><FaFacebookF /></a></li>
          <li className="m-4"><a href=""><FaTwitter /></a></li>
          <li className="m-4"><a href=""><FaInstagram /></a></li>
          <li className="m-4"><a href=""><FaDribbble /></a></li>
          <li className="m-4"><a href=""><FaLinkedinIn /></a></li>
          <li className="m-4"><a href=""><FaPinterest /></a></li>
        </ul>
      </div>
      <div className="mt-5 text-center">
        <p>© {new Date().getFullYear()}, All rights reserved. <br /> Develop by  <a className={styles.titles} href="">GetHugoThemes</a></p>
      </div>
    </div>
  );
};

export default Footer;