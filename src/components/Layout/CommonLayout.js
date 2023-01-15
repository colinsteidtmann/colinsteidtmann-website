import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function CommonLayout({ children, backUrl = "/", backName = "Home", noBack = false }) {
    return (
        <div className="bg-[#fdfdfd] min-h-screen -mx-4 sm:mx-0 px-4 sm:px-0">
            <Navbar />
            <div className="prose mx-auto">
                {/* Back button */}
                {!noBack && <Link href={backUrl}>{"<--- " + backName}</Link>}
                {/* Children */}
                {children}
            </div>
            <Footer />
        </div>
    );
}