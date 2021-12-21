import React from 'react';
import styles from '../../styles/about.module.css';
import authors from '../../public/author.jpg';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/dist/client/image';

const Author = ({ author }) => {
  return (
    <>
    <Head>
        <title>Author</title>
      </Head>
      <div className={`mt-10 ${styles.about}`}>
        <div className="text-center ">
          <Image objectFit="cover" src={authors}></Image>
          <p className="mt-3 font-bold">{author}</p>
          <p className="mt-4 m-auto w-1/3">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.aecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
        </div>
        <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
          <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
          <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
          <li className="ml-5"><a href="#"><FaInstagram /></a></li>
          <li className="ml-5"><a href="#"><FaDribbble /></a></li>
        </ul>
      </div>
    </>
  );
};

Author.getInitialProps = async ({ query }) => {
  const { author } = query
  return { author }

}

export default Author;