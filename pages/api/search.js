export default function handler(req, res) {
  let posts = require("../../cache/data").posts;

  res.status(200).json(JSON.stringify(posts));
}