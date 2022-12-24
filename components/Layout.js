import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="px-3 sm:px-0">
            <Navbar />
            {children}
        </div>
    );
}