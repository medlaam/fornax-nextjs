import React from 'react';
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image';
import styles from '../../styles/tagname.module.css';
import Head from 'next/head';
import { marked } from 'marked';
import { getPosts } from '../../lib/posts';
import { getAuthor } from '../../lib/author';
import { kebabCase } from '../../utils/kebabcase';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllCategory } from '../../lib/category';
import { BsFillTagFill } from 'react-icons/bs';
import { BsFillCalendar2DateFill } from 'react-icons/bs';

const Category = ({ post, category, authors }) => {
  const blogsByTag = post.filter((p) => p.length > 0);
  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <Head>
        <title>tagname | {category}</title>
      </Head>
      <div className="px-8 sm:px-0 my-10 sm:mt-16 md:mt-24 sm:mb-16 text-center m-auto">
        <h3 className="text-h3_sm md:text-h3 text-bold">All <span className="text-primaryColor"> {category}</span> Categories blogs are here</h3>
      </div>

      <div className={` sm:mb-4 md:mb-10 flex flex-wrap justify-center container m-auto px-8 xl:px-0 ${styles.container}`}>
        {
          blogsByTag[0].map((r, i) => {
            return (
              <div key={i} className="px-2 mb-10 sm:mb-14 bg-body md:w-1/2 lg:w-1/3 overflow-hidden">
                <div >
                <Link href={`/blog/${r.slug}`} ><a className="mb-8 block">
                    <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image></a>
                  </Link>
                  <h3 className="blog-title">
                    <Link href={`/blog/${r.slug}`} ><a className="">{r.frontmatter.title}</a></Link>
                  </h3>
                  
                </div>
                <div className="flex flex-wrap mb-4 ">
                  <div className="sm:mr-3 mr-1 mb-2">
                    <div className={`flex flex-shrink-0 ${styles.author}`}>
                      {
                        authors.map((a, i) => a.frontmatter.name === r.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${kebabCase(r.frontmatter.author)}`}>
                        <a className="blog-tag">{r.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-3 mr-1 mb-2">
                    <small className="text-textLight  flex items-center text-base">
                      <div className="date"><BsFillCalendar2DateFill /></div>
                      {new Date(r.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                  </div>
                  <div className="flex items-center mb-2">
                  <div className="tag"><BsFillTagFill/></div>
                    {
                      r.frontmatter.category.map((c, i) => (
                        <Link key={i} href={`/categories/${kebabCase(c)}`} >
                          <a className={`blog-tag flex items-center mr-1 ${styles.tags}`}>{c} ;</a>
                        </Link>
                      ))
                    }
                  </div>

                </div>
                <div className=" text-large text-textLight pr-4">
                  <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 133) + ' ...' }}></span>
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
  const category = getAllCategory();
  const paths = Object.keys(category).map((c) => ({
    params: {
      category: c,
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
    const filter = frontmatter.category.filter(
      (c) => kebabCase(c) == params.category
    );

    const post = getPosts();
    const data = post.filter(function (e) {
      return e.frontmatter.category.some(function (a) {
        return filter.indexOf(a) != -1;
      });
    });

    return data;
  });

  return { props: { post: posts, category: params.category, authors } };
}


export default Category;

