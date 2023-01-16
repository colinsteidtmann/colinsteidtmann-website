
export default function CodeBlock(props) {
    console.log(props);
    return (<code {...props} />);
    // Static and syntax highlighted code
}

/*
export default function CodeBlock({ children }) {
    // Static and syntax highlighted code
}
*/