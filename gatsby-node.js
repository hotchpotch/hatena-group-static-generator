const path = require(`path`)
const mtParser = require('mt-parser');
const HTMLParser = require('node-html-parser');
const { htmlUnescape } = require('escape-goat');
const { perPage } = require('./src/Contants');

exports.onCreateNode = async (
    { node, actions, loadNodeContent, createContentDigest }
) => {
    if (node.internal.type === 'File' && node.ext === '.mt') {
        const { createNode } = actions;
        const nodeContent = await loadNodeContent(node);
        const entries = mtParser.parse(nodeContent).slice(0, 20);

        entries.forEach((entry) => {
            if (entry.status === 'Publish') {
                // const raw = entry.body[0] + "\n" + entry.body.slice(2).join("\n");
                const raw = entry.body.join("\n");
                const html = HTMLParser.parse(raw, {
                    lowerCaseTagName: false,
                    script: false,
                    style: true,
                    pre: true,
                    comment: true
                });
                const body = html.toString();
                const text = html.text;
                const comments = entry.comments.map((comment) => ({
                    author: comment.author,
                    date: new Date(comment.date * 1000),
                    text: htmlUnescape(comment.text.join("\n")),
                }));
                const content = {
                    id: String(entry.date),
                    comments,
                    children: [],
                    title: htmlUnescape(entry.title),
                    date: new Date(entry.date * 1000),
                    content: body,
                    text: text,
                    internal: {
                        contentDigest: createContentDigest(body),
                        type: 'HatenaGroupContent',
                    },
                }
                createNode(content);
            }
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    query {
      allHatenaGroupContent {
        edges {
          node {
            id
          }
        }
      }
    }`);

    const contents = result.data.allHatenaGroupContent.edges

    // Entry Page ( /142201221 )
    contents.forEach(({ node }) => {
        createPage({
            path: '/' + node.id,
            component: path.resolve(`./src/templates/hatena-group-entry.js`),
            context: {
                id: node.id,
            },
        })
    })

    // List Page ( root(/) && /archives/2 )
    const totalPageCount = Math.ceil(contents.length / perPage)
    Array.from({ length: totalPageCount }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/` : `/archives/${i + 1}`,
            component: path.resolve("./src/templates/entry-list.js"),
            context: {
                limit: perPage,
                skip: i * perPage,
                totalPageCount,
                currentPage: i + 1,
            },
        })
    })
}
