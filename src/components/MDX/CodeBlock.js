import { cloneElement, useRef, useState } from "react";
import { CheckIcon, DocumentDuplicateIcon } from "../Icons";

export default function CodeBlock(props) {
    const { children, ...other } = props;
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);
    const onCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(ref.current?.textContent);
        setTimeout(() => setCopied(false), 1000);
    };
    return (
        <pre {...other}>
            {!copied ?
                <DocumentDuplicateIcon className="w-6 h-6 float-right" onClick={onCopy} /> :
                <CheckIcon className="w-6 h-6 float-right" />
            }
            {cloneElement(children, { ref })}
        </pre>
    );
    // Static and syntax highlighted code
}

/*
export default function CodeBlock({ children }) {
    // Static and syntax highlighted code
}
*/