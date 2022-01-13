import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import { getAuthor, getAuthorDefault } from '../../lib/author';
import { marked } from 'marked';



const Authors = ({ authorsData, authorDefaultPage }) => {
  const title = authorDefaultPage.map(a => a.frontmatter.title)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`mt-10 ${styles.about}`}>
      <h2 className="text-center text-3xl">{title}</h2>
        <div className="flex gap-4 flex-wrap my-10 justify-center m-auto">
          {
            authorsData.map((a,i) => (
              <div key={i} className="p-4 shadow md:w-1/2 lg:w-1/3">
            <div className="text-center">
              <Image height={100} width={100} objectFit="cover" src={a.frontmatter.image} />
            </div>
            <p className="mt-3 font-bold text-center"><Link href={`/authors/${a.frontmatter.name}`}>{a.frontmatter.name}</Link></p>
 
              <div className="mt-4 text-center" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}>                
              </div>
            <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
              <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
              <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
              <li className="ml-5"><a href="#"><FaInstagram /></a></li>
              <li className="ml-5"><a href="#"><FaDribbble /></a></li>
            </ul>
          </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const authorsData = getAuthor()
  const authorDefaultPage = getAuthorDefault()

  return {
    props: {
      authorsData,
      authorDefaultPage
    }
  }
}

export default Authors;