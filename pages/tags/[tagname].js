import React from 'react';
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image';
import styles from '../../styles/tagname.module.css';
import Head from 'next/head';
import { marked } from 'marked';
import { getPosts } from '../../lib/posts';
import { getAuthor } from '../../lib/author';
import { getAllTag } from '../../lib/tags';
import { kebabCase } from '../../utils/kebabcase';
import fs from "fs";
import path from "path";
import matter from "gray-matter";


const TagName = ({ post, tags, authors }) => {
  const blogsByTag = post.filter((p) => p.length > 0);

  return (
    <>
      <Head>
        <title>tagname | {tags}</title>
      </Head>
      <div className="my-7 text-center m-auto">
        <h1 className={styles.heading}>All <span> {tags}</span> blogs are here</h1>
      </div>

      <div className={`my-14 flex flex-wrap justify-center container m-auto ${styles.container}`}>
        {
          blogsByTag[0].map((r, i) => {
            return (
              <div key={i} className="p-4 bg-white md:w-1/2 lg:w-1/3  overflow-hidden">
                <div >
                  <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                  <div className="mt-4">
                    <Link href={`/blog/${r.slug}`} >{r.frontmatter.title}</Link>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="sm:mr-4 mr-1">
                    <div className={`flex ${styles.author}`}>
                      {
                        authors.map((a, i) => a.frontmatter.name === r.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${r.frontmatter.author}`}><a className="text-gray-500">{r.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small>&#x25C8; {r.frontmatter.date}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    <Link href={`/tags/${kebabCase(r.frontmatter.tag[0])}`} >
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {r.frontmatter.tag[0]}</a>
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
  const tags = getAllTag();
  const paths = Object.keys(tags).map((t) => ({
    params: {
      tagname: t,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const authors = getAuthor()
  const file = fs.readdirSync(path.join("content/posts"));
  const posts = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/posts", file),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);
    const filter = frontmatter.tag.filter(
      (c) => kebabCase(c) == params.tagname
    );

    const post = getPosts();
    const data = post.filter(function (e) {
      return e.frontmatter.tag.some(function (a) {
        return filter.indexOf(a) != -1;
      });
    });

    return data;
  });

  return { props: { post: posts, tags: params.tagname, authors } };
}


export default TagName;

