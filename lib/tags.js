import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {kebabCase} from '../utils/kebabcase'

export const getAllTag = () => {
  let tagCount = {};
  const file = fs.readdirSync(path.join("content/posts"));
  file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/posts", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(metaDataWithFrontMatter);
    if (frontmatter) {
      frontmatter.tag.forEach((i) => {
        const formattedKey = kebabCase(i);
        if (formattedKey in tagCount) {
          tagCount[formattedKey] += 1;
        } else {
          tagCount[formattedKey] = 1;
        }
      });
    }
  });

  return tagCount;
};