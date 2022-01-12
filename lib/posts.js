import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '../utils';

const files = fs.readdirSync(path.join('content/posts'))

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '').replace(/ /g,"-")

    const markdownWithMeta = fs.readFileSync(
      path.join('content/posts', filename),
      'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
      content
    }
  })

  return posts.sort(sortByDate)
}
