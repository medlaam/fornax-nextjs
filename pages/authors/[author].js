import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import { getAuthor } from '../../lib/author';
import { marked } from 'marked';
import socialIcons from '../../config/config.json';
import { kebabCase } from '../../utils/kebabcase';


const SingleAuthor = ({ authorName, author }) => {
  const authors = authorName.filter(a => kebabCase(a.frontmatter.name) === author);
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
              <div className="mt-4 m-auto w-full p-3 md:w-1/3 md:p-0" dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
              </div>
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
    </>
  );
};

export async function getStaticPaths() {
  const authors = getAuthor()
  const paths = authors.map(n => ({
    params: {
      author: kebabCase(n.frontmatter.name)
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
