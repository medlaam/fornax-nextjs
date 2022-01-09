import React from 'react';
import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import { getPosts } from '../../lib/posts';


const Authors = ({ posts }) => {

  const authors = posts.map(author => author.frontmatter.name)
  const allAuthor = [...new Set(authors)]

  return (
    <>
      <Head>
        <title>Our Authors</title>
      </Head>
      <div className={`mt-10 ${styles.about}`}>
        <div className="flex gap-4 flex-wrap my-7 justify-center m-auto">
          {
            allAuthor.map((a,i) => (
              <div key={i} className="p-4 shadow md:w-1/2 lg:w-1/3">
            <div className="text-center">
              <Image height={100} width={100} objectFit="cover" src="/author.jpg" />
            </div>
            <p className="mt-3 font-bold text-center"><Link href={`/authors/${a}`}>{a}</Link></p>
            <p className="mt-4 text-center">
              Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
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

// export async function getStaticPaths() {
//   const posts = getPosts();

//   const paths = posts.map(post => ({
//     params: {
//       name: post.frontmatter.name
//     }
//   }
//   ))
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getStaticProps() {
  const posts = getPosts()

  return {
    props: {
      posts: posts,
    }
  }
}

export default Authors;