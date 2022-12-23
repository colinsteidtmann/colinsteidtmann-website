export default function MdxContent({ filePath }) {
    const Content = require("../content/dog.mdx").default;
    return <Content />;
}