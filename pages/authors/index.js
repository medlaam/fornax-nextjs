import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { getAuthor, getAuthorDefault } from '../../lib/author';
import { marked } from 'marked';
import socialIcons from '../../config/config.json'


const Authors = ({ authorsData, authorDefaultPage }) => {
  const title = authorDefaultPage.map(a => a.frontmatter.title)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`mt-10 ${styles.about}`}>
        <h3 className="text-center text-h3_sm md:text-h3">{title}</h3>
        <div className="flex gap-4 flex-wrap my-10 justify-center m-auto">
          {
            authorsData.map((a, i) => (
              <div key={i} className="p-4 shadow md:w-1/2 lg:w-1/3">
                <div className="text-center">
                  <Image height={100} width={100} objectFit="cover" src={a.frontmatter.image} />
                </div>
                <h6 className="mt-3 text-center font-bold text-textDark text-small md:text-h5"><Link href={`/authors/${a.frontmatter.name}`}>{a.frontmatter.name}</Link></h6>

                <div className="mt-4 text-center" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}>
                </div>
                <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
                  {
                    socialIcons.socialMedia.map(s => (
                      <li key={s.name} className="hover:text-primaryColor">
                        <a className="ml-5" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                      </li>
                    ))
                  }
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