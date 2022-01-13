import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


export function getAuthor() {
  const files = fs.readdirSync(path.join('content/author'))
  const markDownFile = files.filter((f) => f.includes(".md"));
  const pageData = markDownFile.filter((d) => d.match(/^[a-z]/));

  const author = pageData.map((filename) => {
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


export function getAuthorDefault() {
  const files = fs.readdirSync(path.join('content/author'))
  const pageData = files.filter((d) => d.match(/^_/));

  const authorDefault = pageData.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/author', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      frontmatter,
    }
  })
  return authorDefault

}

