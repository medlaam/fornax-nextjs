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
          <div key={i} className={`mt-10 w-full p-4 md:w-2/4 md:p-0 m-auto  ${styles.about}`}>
            <div>
              <div className="relative w-full h-60">
                <Image width={700} height={340} layout='fill' objectFit="cover" src={a.frontmatter.image}></Image>
              </div>
              <h3 className="mt-3 font-bold text-h3_sm md:text-h3">{a.frontmatter.name}</h3>
              <ul className={`flex my-5 ${styles.writersLink}`}>
              {
              socialIcons.socialMedia.map(s => (
                <li key={s.name}>
                  <a className="mr-5 hover:text-primaryColor" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
              ))
            }
              </ul>
              <div className="text-textColor prose-p:text-sm" dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
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