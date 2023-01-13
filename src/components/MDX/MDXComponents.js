import Image from "next/image";
import Link from "next/link";
import InlineCode from "./InlineCode";
import TableOfContents from "./TableOfContents";

const IMG = (props) => {
  return (
    <Image src={require(`public/static/notes/${props.src}`)} alt={props.alt} />
  );
};

const LINK = (props) => {
  const customProps = {
    className: "text-blue-900",
    ...props,
  };
  if (props.href.indexOf("http")) return <a {...customProps} />;
  return <Link {...customProps} />;
};

const PRE = (props) => {
  return (
    <pre className="rounded-lg bg-white shadow-lg text-black" {...props} />
  );
};

export const MDXComponents = {
  a: LINK,
  img: IMG,
  code: InlineCode,
  pre: PRE,
  TableOfContents,
};
