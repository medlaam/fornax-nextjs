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
          <div key={i} className={`my-24 flex justify-center items-center ${styles.about}`}>
            <div className="mx-auto w-full max-w-4xl">
              <div className="relative w-full md:h-37 h-60 mb-6">
                <Image src={a.frontmatter.image} layout='fill' objectFit="cover" placeholder='blur' priority="true" blurDataURL='/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3Bhcm'></Image>
              </div>
              <h3 className="mb-5 font-bold text-h3_sm md:text-h3">{a.frontmatter.name}</h3>
              <ul className={`mb-6 flex ${styles.writersLink}`}>
              {
              socialIcons.socialMedia.map(s => (
                <li key={s.name}>
                  <a className="social-icon mr-5 " href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
              ))
            }
              </ul>
              <div className=" prose-p:text-large leading-9 text-textLight" dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
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