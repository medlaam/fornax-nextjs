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
      <div className={`mt-10 ${styles.about}`}>
        <h3 className="text-center text-textColor text-h3_sm md:text-h3">{title}</h3>
        <div className="flex gap-4 flex-wrap my-10 justify-center mx-auto">
          {
            authorsData.map((a, i) => (
              <div key={i} className="p-4 shadow w-2/3 max-w-xl">
                <div className="text-center">
                  <Image className=" rounded-full" height={150} width={150} objectFit="cover" priority={true} src={a.frontmatter.image} />
                </div>
                <h5 className="mt-3 text-center font-bold text-textColor text-sm md:text-h5 transition  duration-300 ease-in-out hover:text-primaryColor"><Link href={`/authors/${kebabCase(a.frontmatter.name)}`}>{a.frontmatter.name}</Link></h5>

                <div className="mt-4 p-6 text-center prose-p:text-sm" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}>
                </div>
                <ul className={`flex items-center justify-center mt-10 `}>
                  {
                    socialIcons.socialMedia.map(s => (
                      <li key={s.name} className="">
                        <a className="p-4 transition  duration-300 ease-in-out hover:text-primaryColor" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
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