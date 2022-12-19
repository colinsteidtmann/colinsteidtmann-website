import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="p-8">
                <Link href="/">
                    <h1 className="text-2xl font-mono">Colin Steidtmann</h1>
                </Link>

            </div>
        </>
    );
}