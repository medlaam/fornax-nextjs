import styles from '../styles/footer.module.css';
import socialIcons from '../config/config.json';
import footerData from "../config/config.json";
import { marked } from "marked";
import Link from 'next/link';

const Footer = () => {

  const { footer } = footerData;

  return (
    <div className={`mt-24 pt-5 border-t-2 mb-5`}>
      <div className="text-center">
      </div>
      <ul className={`${styles.icons} mt-10 flex items-center justify-center`}>
        {
          socialIcons.socialMedia.map(s => (
            <li key={s.name}>
              <a className="p-4 transition  duration-300 ease-in-out hover:text-primaryColor" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
            </li>
          ))
        }
      </ul>
      <div className="mt-5 text-center">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(footer.copyright) }}>

        </div>
        {footer.theme_copyright && (
          <>
            &nbsp; Theme by&nbsp;
            <Link href="https://statichunt.com/">
              <a
                className="transition  duration-300 ease-in-out text-primaryColor hover:opacity-80"
                target="_blank"
                rel="noflow"
              >
                Statichunt
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Footer;