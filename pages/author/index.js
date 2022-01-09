import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';


const Author = () => {
  return (
    <>
      <Head>
        <title>Our Author</title>
      </Head>
      <div className={`mt-10 ${styles.about} container`}>
        <div className="flex md:w-2/3 sm:w-full justify-center  mx-auto">
          <div className="px-6 shadow space-x-4">
           <div className="text-center">
           <Image height={100} width={100} objectFit="cover" src="/author.jpg"/>
           </div>
            <p className="mt-3 font-bold text-center">AZUMI</p>
            <p className="mt-4 text-center">
              Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
            <div className={`mt-10 ${styles.writersLink}`}>
              <ul className='flex items-center justify-center mx-auto'>
                <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
                <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
                <li className="ml-5"><a href="#"><FaInstagram /></a></li>
                <li className="ml-5"><a href="#"><FaDribbble /></a></li>
              </ul>
            </div>
          </div>
          <div className="px-6 mx-auto shadow">
            <div className="text-center">
            <Image height={100} width={100} objectFit="cover" src="/author.jpg" />
            </div>
            <p className="mt-3 text-center font-bold">Melissa Hunter</p>
            <p className="mt-4 text-left md:text-center">
              Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
            <div className={`mt-10 ${styles.writersLink}`}>
              <ul className='flex items-center justify-center mx-auto'>
                <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
                <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
                <li className="ml-5"><a href="#"><FaInstagram /></a></li>
                <li className="ml-5"><a href="#"><FaDribbble /></a></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Author;