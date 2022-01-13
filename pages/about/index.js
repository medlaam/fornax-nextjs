import React from 'react';
import Image from 'next/dist/client/image';
import aboutMe from '../../public/about.jpg';
import styles from '../../styles/about.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';
import { getAbout } from '../../lib/about';
import { marked } from 'marked';


const About = ({ about }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      {
        about.map((a, i) => (
          <div key={i} className={`mt-10 w-2/3 m-auto  ${styles.about}`}>
            <div>
              <div className="relative w-full h-60">
                <Image layout='fill' objectFit="cover" src={a.frontmatter.image}></Image>
              </div>
              <p className="mt-3 font-bold text-3xl">{a.frontmatter.name}</p>
              <ul className={`flex mt-5 ${styles.writersLink}`}>
                <li className="mr-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
                <li className="mr-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
                <li className="mr-5"><a href="/#"><FaInstagram /></a></li>
                <li className="mr-5"><a href="/#"><FaDribbble /></a></li>
              </ul>
              <span dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
              </span>
            </div>
          </div>
        ))
      }
    </>
  );
};

export async function getStaticProps() {
  const about = getAbout();

  return {
    props: {
      about
    }
  }
}

export default About;