export default function InlineCode(props) {
    return (
        <code
            className="before:content-[''] after:content-['']"
            {...props}
        />
    );
}