import React from 'react';
import Image from 'next/dist/client/image';
import aboutMe from '../../public/about.jpg';
import styles from '../../styles/about.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';


const About = () => {
  return (
    <>
      <Head>
        <title>About Author</title>
      </Head>
      <div className={`mt-10 w-2/3 m-auto  ${styles.about}`}>
        <div className="">
          <div className="text-center">
          <Image height={350} width={800} objectFit="cover" src={aboutMe}></Image>
          </div>
          <p className="mt-3 ml-12 font-bold text-3xl">Sarah Taylor</p>
          <ul className={`flex items-start mt-5 ml-5 ${styles.writersLink}`}>
          <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
          <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
          <li className="ml-5"><a href="/#"><FaInstagram /></a></li>
          <li className="ml-5"><a href="/#"><FaDribbble /></a></li>
        </ul>
          <p className="mt-4 md:ml-12">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.aecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
          <p className="mt-2 md:ml-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nihil enim maxime corporis cumque totam aliquid nam sint inventore optio modi neque laborum officiis necessitatibus, facilis placeat pariatur! Voluptatem, sed harum pariatur adipisci voluptates voluptatum cumque, porro sint minima similique magni perferendis fuga! Optio vel ipsum excepturi tempore reiciendis id quidem? Vel in, doloribus debitis nesciunt fugit sequi magnam accusantium modi neque quis, vitae velit, pariatur harum autem a! Velit impedit atque maiores animi possimus asperiores natus repellendus excepturi sint architecto eligendi non, omnis nihil. Facilis, doloremque illum. Fugit optio laborum minus debitis natus illo perspiciatis corporis voluptatum rerum laboriosam.</p>
        </div>
        {/* <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
          <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
          <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
          <li className="ml-5"><a href="#"><FaInstagram /></a></li>
          <li className="ml-5"><a href="#"><FaDribbble /></a></li>
        </ul> */}
      </div>
    </>
  );
};

export default About;