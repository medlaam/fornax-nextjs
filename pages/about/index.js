import React from 'react';
import Image from 'next/dist/client/image';
import authors from '../../public/author.jpg';
import styles from '../../styles/singleblog.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';


const About = () => {
  return (
    <div className="mt-10">
        <div className="text-center ">
          <Image objectFit="cover" src={authors}></Image>
          <p className="mt-3">AZUMI</p>
          <p className="mt-4 m-auto w-1/3">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.aecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis</p>
        </div>
        <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
            <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
            <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
            <li className="ml-5"><a href="#"><FaInstagram /></a></li>
            <li className="ml-5"><a href="#"><FaDribbble /></a></li>
          </ul>
    </div>
  );
};

export default About;