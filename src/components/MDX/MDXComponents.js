import Image from "next/image";
import Link from "next/link";
import InlineCode from "./InlineCode";

function Img(props) {
    return <Image src={require(`public/static/notes/${props.src}`)} alt={props.alt} />;
}

export const MDXComponents = {
    link: (props) => <Link href={props.href} {...props} />,
    img: Img,
    code: InlineCode,
};