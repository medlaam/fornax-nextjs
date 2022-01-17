export const sortByDate = (a, b) => {
  let options = { year: "numeric", month: "long", day: "numeric" }; 
  return new Date(b.frontmatter.date).toLocaleDateString("en-US", options) - new Date(a.frontmatter.date).toLocaleDateString("en-US", options)
}