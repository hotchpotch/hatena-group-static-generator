const path = require(`path`)
const mtParser = require("mt-parser")
const HTMLParser = require("node-html-parser")
const { htmlUnescape } = require("escape-goat")
const { perPage } = require("./site-settings")

const PER_PAGE = perPage
const DEV_MAX_ENTRIES = 30

// XXX: .cache/redux/ があると、onCreateNode がうまく呼ばれない
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createContentDigest,
}) => {
  if (node.internal.type !== "File" || node.ext !== ".mt") {
    return
  }

  try {
    const { createNode } = actions
    const nodeContent = await loadNodeContent(node)
    const parsed = mtParser.parse(nodeContent)
    const entries =
      process.env.NODE_ENV === "production"
        ? parsed
        : parsed.slice(0, DEV_MAX_ENTRIES)

    entries.forEach(entry => {
      if (entry.status === "Publish") {
        // const raw = entry.body[0] + "\n" + entry.body.slice(2).join("\n");
        const raw = entry.body.join("\n")
        const html = HTMLParser.parse(raw, {
          lowerCaseTagName: false,
          script: false,
          style: true,
          pre: true,
          comment: true,
        })
        const body = html.toString()
        const text = html.text
          // <span class="synPreProc">textNode</span> などを textNode のみに
          .replace(/<.+?>(.*?)<\/.+?>/gm, (_, text) => text)
        const comments = entry.comments.map(comment => ({
          author: comment.author,
          date: new Date(comment.date * 1000),
          text: htmlUnescape(comment.text.join("\n")),
        }))
        const commentsText = comments
          .map(({ author, text }) => `${author}\n${text}`)
          .join("\n")
        const content = {
          id: String(entry.date),
          comments,
          children: [],
          title: htmlUnescape(entry.title),
          date: new Date(entry.date * 1000),
          content: body,
          searchText: text + "\n" + commentsText,
          internal: {
            contentDigest: createContentDigest(body),
            type: "HatenaGroupContent",
          },
        }
        createNode(content)
      }
    })
  } catch (e) {
    console.error("onCreateNode Error:", e)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type HatenaGroupContent implements Node {
        comments: [Comment]!
      }
      type Comment {
        author: String!
        text: String!
        date: Date @dateformat(formatString: "YYYY-MM-DD HH:mm")
      }
    `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allHatenaGroupContent {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  const contents = result.data.allHatenaGroupContent.edges

  // Entry Page ( /142201221 )
  contents.forEach(({ node }, index) => {
    const nav = {}
    if (index !== contents.length - 1) {
      nav.prev = {
        path: "/" + contents[index + 1].node.id,
        label: contents[index + 1].node.title,
      }
    }
    if (index !== 0) {
      nav.next = {
        path: "/" + contents[index - 1].node.id,
        label: contents[index - 1].node.title,
      }
    }
    createPage({
      path: "/" + node.id,
      component: path.resolve(`./src/templates/hatena-group-entry.tsx`),
      context: {
        id: node.id,
        ...nav,
      },
    })
  })

  // List Page ( root(/) && /archives/2 )
  const totalPageCount = Math.ceil(contents.length / PER_PAGE)
  Array.from({ length: totalPageCount }).forEach((_, i) => {
    const currentPage = i + 1
    createPage({
      path: i === 0 ? `/` : `/archives/${currentPage}`,
      component: path.resolve("./src/templates/entry-list.tsx"),
      context: {
        limit: PER_PAGE,
        skip: i * PER_PAGE,
        totalPageCount,
        currentPage,
      },
    })
  })
}
