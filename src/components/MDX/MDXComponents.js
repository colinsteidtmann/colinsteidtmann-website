import imageSize from "image-size";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import InlineCode from "./InlineCode";

function Img(props) {
    // const src = props.src.substring(props.src.)
    // const { width, height } = imageSize(props.src);
    return <Image src={props.src} alt={props.alt} width={500} height={500} />;
}

export const MDXComponents = {
    p: (props) => <p className="text-blue" {...props} />,
    img: (props) => <Img {...props} />,
    a: (props) => <Link className="text-yellow" {...props} />,
};