import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getContactData = () => {
  const contactFile = fs.readdirSync(path.join("content/contact"));
  const metaDataWithFrontMatter = fs.readFileSync(
    path.join("content/contact", contactFile[0]),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(metaDataWithFrontMatter);

  return {
    frontmatter,
    content,
  };
};