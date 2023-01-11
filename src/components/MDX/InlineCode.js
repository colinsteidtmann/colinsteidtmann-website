export default function InlineCode(props) {
  return (
    <code
      className="before:content-[''] after:content-[''] rounded-md bg-gray-500 bg-opacity-10 px-1 py-px"
      {...props}
    />
  );
}

/*
export default function InlineCode(props) {
  // syntax highlighted inline code
}
*/
