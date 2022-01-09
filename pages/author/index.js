import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import Link from 'next/link';


const Author = () => {
  return (
    <>
      <Head>
        <title>Our Author</title>
      </Head>
      <div className={`mt-10 ${styles.about} container`}>
        <div className="flex gap-4 flex-wrap my-7 justify-center m-auto">
          <div className="p-4 shadow md:w-1/2 lg:w-1/3">
           <div className="text-center">
           <Image height={100} width={100} objectFit="cover" src="/author.jpg"/>
           </div>
            <p className="mt-3 font-bold text-center"><Link href="/about/AZUMI">AZUMI</Link></p>
            <p className="mt-4 text-center">
              Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
            
          </div>
          <div className="p-4 shadow md:w-1/2 lg:w-1/3">
            <div className="text-center">
            <Image height={100} width={100} objectFit="cover" src="/author.jpg" />
            </div>
            <p className="mt-3 text-center font-bold"><Link href="/about/Melissa">Melissa</Link></p>
            <p className="mt-4 text-left md:text-center">
              Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Author;