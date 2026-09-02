import { useState } from "react";
import { Link } from "react-router";

import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function Navbar() {

    const [mobileMenuButton, setMobileMenuButton] = useState(false)

    const navlinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/products", label: "Shop Now" },
        { href: "/contact", label: "Contact" }
    ]

    return (
        <header className="fixed inset-x-0 top-0 z-10">
            <nav className="container mx-auto lg:px-18 px-4 py-4 flex justify-between items-center bg-background/60 border border-border">
                <Link to="/" className="text-3xl font-play">Step<span className="text-muted">ora</span></Link>
                {/* Desktop Nav */}
                <div className="hidden sm:flex">
                    <div className="flex items-center gap-7">
                        {navlinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.href}
                                className="text-muted hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-7 font-bold">
                    <Link to="/signup" className="hover:scale-105 transition-all"><button className="bg-white text-background px-3 py-1.5 rounded-full">SignUp</button></Link>
                    <Link to="/login" className="hover:scale-105 transition-all">Login</Link>
                </div>
                {/* Mobile Menu */}
                <button
                    className="sm:hidden"
                    onClick={() => setMobileMenuButton((prev) => !prev)}
                >
                    {mobileMenuButton ? <RxCross2 size={30} /> : <IoReorderThree size={35} />}
                </button>
            </nav>
            {/* Mobile Nav */}
            {mobileMenuButton && <div className="sm:hidden bg-foreground text-background rounded-3xl p-3 my-2">
                <div className="flex flex-col gap-3 px-5 font-semibold">
                    {navlinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.href}
                            className="p-2 hover:font-bold"
                            onClick={() => setMobileMenuButton(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/login" onClick={() => setMobileMenuButton(false)}><button className="bg-background text-foreground px-7 py-3 rounded-3xl">Login</button></Link>
                </div>
            </div>}
        </header>
    )
}

export default Navbar;