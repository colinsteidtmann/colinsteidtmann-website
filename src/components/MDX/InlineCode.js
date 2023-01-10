export default function InlineCode({ props }) {
    return (
        <p
            className="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-highlight dark:bg-highlight-dark py-0"
            {...props}
        />
    );
}