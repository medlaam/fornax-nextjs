import React from 'react';
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image';
import styles from '../../styles/tagname.module.css';
import Head from 'next/head';
import { marked } from 'marked';
import { getPosts } from '../../lib/posts';


const TagName = ({ tagname, posts }) => {

  // filter blogs by tagname
  const blogsByTag = posts.filter(a => a.frontmatter.tags == tagname || a.frontmatter.tags2 == tagname);


  return (
    <>
      <Head>
        <title>{tagname}</title>
      </Head>
      <div className="my-7 text-center m-auto">
        <h1 className={styles.heading}>All <span> {tagname}</span> blogs are here</h1>
      </div>

      <div className={`my-14 flex flex-wrap justify-center container m-auto ${styles.container}`}>
        {
          blogsByTag.map((r, i) => {
            return (
              <div key={i} className="p-4 bg-white md:w-1/2 lg:w-1/3  overflow-hidden">
                <div >
                  <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                  <div className="mt-4">
                    <Link href={`/blog/${r.frontmatter.title.replace(/ /g, "-")}`} >{r.frontmatter.title}</Link>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="sm:mr-4 mr-1">
                    <div className={`flex ${styles.author}`}>
                      <img loading="lazy" src={r.frontmatter.authorImage} />
                      <span><Link href={`/authors/${r.frontmatter.name}`}><a className="text-gray-500">{r.frontmatter.name}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small>&#x25C8; {r.frontmatter.date}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    <Link href={`/tags/${r.frontmatter.tags}`} >
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {r.frontmatter.tags}</a>
                    </Link>
                  </div>

                </div>
                <div className="mt-4 mb-3">
                  <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 130) + ' ...' }}></span>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getPosts();
  const paths = posts.map((tags) => ({
    params: {
      tagname: tags.frontmatter.tags 
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { tagname } = params;

  const posts = getPosts();
  return {
    props: {
      tagname: tagname,
      posts: posts,
    },
  };
};


export default TagName;

