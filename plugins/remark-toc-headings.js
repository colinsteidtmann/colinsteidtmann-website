import { visit } from "unist-util-visit";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";

// this page is helpful: https://github.com/syntax-tree/mdast#introduction
export default function remarkTocHeadings(options) {
  return (tree) =>
    /* eslint-disable no-unused-vars */
    visit(tree, "heading", (node, index, parent) => {
      const textContent = toString(node);
      options.exportRef.push({
        textContent: textContent,
        url: "#" + slug(textContent),
        depth: node.depth,
        index: index,
      });
    });
}
