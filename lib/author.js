import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const files = fs.readdirSync(path.join('content/author'))

export function getAuthor() {
  const author = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/author', filename),
      'utf-8'
    )
    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
      frontmatter,
      content
    }
  })
  return author

}
