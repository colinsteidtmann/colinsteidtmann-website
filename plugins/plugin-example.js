// SOURCE: https://unifiedjs.com/learn/guide/create-a-plugin

import { visit } from "unist-util-visit";
// ^ Helps us check the tree for a pattern. utility to help us to recursively walk our tree.
import { is } from "unist-util-is";
// small utility for checking node types:

export default function pluginExample() {
    return (tree, file) => {
        // visit all ParagraphNodes (node names specified under mdast: https://github.com/syntax-tree/mdast)
        visit(tree, 'paragraph', (node) => {
            console.log(node);
            /*
            CONSOLE OUTPUTS:
            {
                type: 'ParagraphNode',
                children: [
                    { type: 'SentenceNode', children: [Array], position: [Object] },
                    { type: 'WhiteSpaceNode', value: ' ', position: [Position] },
                    { type: 'SentenceNode', children: [Array], position: [Object] }
                ],
                position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 29, offset: 28 }
                }
                }
                {
                type: 'ParagraphNode',
                children: [
                    { type: 'SentenceNode', children: [Array], position: [Object] },
                    { type: 'WhiteSpaceNode', value: '  ', position: [Position] },
                    { type: 'SentenceNode', children: [Array], position: [Object] }
                ],
                position: {
                    start: { line: 3, column: 1, offset: 30 },
                    end: { line: 3, column: 30, offset: 59 }
                }
                }
            */
            const children = node.children;
            children.forEach((child, index) => {
                if (
                    is(children[index - 1], 'SentenceNode') &&
                    is(child, 'WhiteSpaceNode') &&
                    is(children[index + 1], 'SentenceNode')
                ) {
                    console.log(child);
                    if (child.value.length !== 1) {
                        file.message(
                            'Expected 1 space between sentences, not ' + child.value.length,
                            child
                        );
                    }
                }
            });
            /* CONSOLE OUTPUTS
                {
                    type: 'WhiteSpaceNode',
                    value: ' ',
                    position: Position {
                        start: { line: 1, column: 14, offset: 13 },
                        end: { line: 1, column: 15, offset: 14 }
                    }
                    }
                    {
                    type: 'WhiteSpaceNode',
                    value: '  ',
                    position: Position {
                        start: { line: 3, column: 14, offset: 43 },
                        end: { line: 3, column: 16, offset: 45 }
                    }
                }

                3:14-3:16  warning  Expected 1 space between sentences, not 2

                ⚠ 1 warning
            */
        });
    };
}


// unisst-util-visit: https://unifiedjs.com/explore/package/unist-util-visit/
/**
import {u} from 'unist-builder'
import {visit} from 'unist-util-visit'

const tree = u('tree', [
  u('leaf', '1'),
  u('node', [u('leaf', '2')]),
  u('void'),
  u('leaf', '3')
])

visit(tree, 'leaf', (node) => {
  console.log(node)
})

CONSOLE OUTPUTS:
{type: 'leaf', value: '1'}
{type: 'leaf', value: '2'}
{type: 'leaf', value: '3'}

---------------------------------
TIP from the docs: 
"Walking the tree is an intensive task. Make use of the return values of the visitor when possible. Instead of walking a tree multiple times with different tests, walk it once without a test, and use unist-util-is to check if a node matches a test, and then perform different operations.""
 */