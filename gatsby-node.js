const mtParser = require('mt-parser');
const HTMLParser = require('node-html-parser');
const { htmlUnescape } = require('escape-goat');

exports.createPages = () => { }

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
                const html = HTMLParser.parse(raw);
                const body = html.toString();
                const text = html.text;
                const mdNodeContent = {
                    ...entries,
                    id: String(entry.date),
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
                createNode(mdNodeContent);
            }
        });
    }
}
