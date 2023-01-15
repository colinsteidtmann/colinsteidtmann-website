import { Sandpack } from "@codesandbox/sandpack-react";
import React from "react";
export default function Sandbox(props) {
    let { children, template = "react", externalResources = [] } = props;

    // convert the children to an array
    let codeSnippets = React.Children.toArray(children);

    // using the array.reduce method to reduce the children to an object containing
    // filename as key then other properties like the code, if the file is hidden as 
    // properties
    const files = codeSnippets.reduce((result, codeSnippet) => {
        if (codeSnippet.type !== "pre") {
            return result;
        }

        const { props } = codeSnippet.props.children;
        let filePath; // path in the folder structure
        let fileHidden = false; // if the file is available as a tab
        let fileActive = false; // if the file tab is shown by default

        if (props.meta) {
            // get our metadata from the prop
            const [name, ...params] = props.meta.split(" ");
            filePath = (template === "react" ? "/" : "/src/") + name;
            if (params.includes("hidden")) {
                fileHidden = true;
            }
            if (params.includes("active")) {
                fileActive = true;
            }
        } else {
            // if no name is given to the file, we give them defaults based on 
            // the language
            if (props.className === "language-js") {
                filePath = "/App.js";
            } else if (props.className === "language-css") {
                filePath = "/styles.css";
            } else if (props.className === "language-vue") {
                filePath = "/src/App.vue";
            } else {
                throw new Error(`Code block is missing a filename: ${props.children}`);
            }
        }

        if (result[filePath]) {
            throw new Error(
                `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
            );
        }

        result[filePath] = {
            code: props.children,
            hidden: fileHidden,
            active: fileActive,
        };
        return result;
    }, {});

    return (
        <Sandpack
            template={template}
            //theme={nightOwlTheme}
            customSetup={{
                files,
                dependencies: {},
            }}
            options={{
                showLineNumbers: true,
                showInlineErrors: false,
                showTabs: true,
                externalResources,
            }}
        />
    );
}