import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import { getAbout } from '../../lib/about';
import { marked } from 'marked';
import socialIcons from '../../config/config.json';


const About = ({ about }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      {
        about.map((a, i) => (
          <div key={i} className={`py-16 px-4 sm:px-6 flex justify-center items-center ${styles.about}`}>
            <div className="mx-auto w-full max-w-4xl">
              <div className="relative w-full h-60">
                <Image layout='fill' objectFit="cover" src={a.frontmatter.image}></Image>
              </div>
              <h3 className="mt-3 font-bold text-h3_sm md:text-h3">{a.frontmatter.name}</h3>
              <ul className={`flex my-5 ${styles.writersLink}`}>
              {
              socialIcons.socialMedia.map(s => (
                <li key={s.name}>
                  <a className="mr-5 transition  duration-300 ease-in-out  hover:text-primaryColor" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
              ))
            }
              </ul>
              <div className="text-textColor prose-p:text-xl" dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
              </div>
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