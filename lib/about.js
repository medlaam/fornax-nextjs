import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const files = fs.readdirSync(path.join('content/about'))

export function getAbout() {
  const about = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/about', filename),
      'utf-8'
    )
    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
      frontmatter,
      content
    }
  })
  return about

}
