import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { getAuthor, getAuthorDefault } from '../../lib/author';
import { marked } from 'marked';
import socialIcons from '../../config/config.json';
import { kebabCase } from '../../utils/kebabcase';


const Authors = ({ authorsData, authorDefaultPage }) => {
  const title = authorDefaultPage.map(a => a.frontmatter.title);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={` my-16 md:my-24 ${styles.about}`}>
        <h1 className="text-center text-textColor text-h2 font-bold">{title}</h1>
        <div className="flex gap-4 flex-wrap my-10 justify-center mx-auto">
          {
            authorsData.map((a, i) => (
              <div key={i} className="px-8 pt-8 pb-14 shadow-2xl w-2/4 max-w-xl">
                <div className="text-center mb-6">
                  <Image className="rounded-full" height={150} width={150} objectFit="cover" priority="true" src={a.frontmatter.image} />
                </div>
                <h5 className="text-center font-bold text-textColor text-h5 md:text-h4 transition  duration-300 ease-in-out hover:text-primaryColor mb-6"><Link href={`/authors/${kebabCase(a.frontmatter.name)}`}>{a.frontmatter.name}</Link></h5>

                <div className="text-center prose-p:text-large leading-7 mb-10 text-textLight" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}>
                </div>
                <ul className={`flex items-center justify-center`}>
                  {
                    socialIcons.socialMedia.map(s => (
                      <li key={s.name} className="">
                        <a className="transition duration-300 ease-in-out hover:text-primaryColor mx-4" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
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