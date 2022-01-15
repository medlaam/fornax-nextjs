import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';
import { getAuthor } from '../../lib/author';
import { marked } from 'marked';


const SingleAuthor = ({ authorName, author }) => {
  const authors = authorName.filter(a => a.frontmatter.name === author)
  return (
    <>
      <Head>
        <title>Author | {author}</title>
      </Head>
      {
        authors.map((a, i) => (
          <div key={i} className={`mt-10 ${styles.about}`}>
            <div className="text-center">
              <Image height={100} width={100} objectFit="cover" src={a.frontmatter.image}></Image>
              <p className="mt-3 font-bold">{a.frontmatter.name}</p>
              <p className="mt-4 m-auto w-1/3">
                <span dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}></span>
              </p>
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
    </>
  );
};

export async function getStaticPaths() {
  const authors = getAuthor()
  const paths = authors.map(n => ({
    params: {
      author: n.frontmatter.name
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { author } }) {
  const authorName = getAuthor()

  return {
    props: {
      authorName,
      author
    }
  }
}


export default SingleAuthor;
