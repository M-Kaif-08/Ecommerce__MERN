import { useState } from "react";

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
        <header className="fixed right-4 left-4 top-4">
            <nav className="container mx-auto md:px-12 px-4 py-2 flex justify-between items-center text-foreground rounded-full bg-background">
                <a href="/" className="md:text-4xl text-3xl font-play">Step<span className="text-highlight">ora</span></a>
                {/* Desktop Nav */}
                <div className="hidden md:flex">
                    <div className="flex items-center gap-7">
                        {navlinks.map((link, index) => (
                            <a key={index} href={link.href}>{link.label}</a>
                        ))}
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-7 font-bold">
                    <a href="/signup"><button className="bg-white text-primary px-3 py-1.5 rounded-full">SignUp</button></a>
                    <a href="/login">Login</a>
                </div>
                {/* Mobile Menu */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuButton((prev) => !prev)}
                >
                    {mobileMenuButton ? <RxCross2 size={30} /> : <IoReorderThree size={35} />}
                </button>
            </nav>
            {/* Mobile Nav */}
            {mobileMenuButton && <div className="md:hidden bg-foreground rounded-3xl p-3 my-2">
                <div className="flex flex-col gap-3 px-5 font-semibold">
                    {navlinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="p-2 hover:font-bold"
                            onClick={() => setMobileMenuButton(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="/login" onClick={() => setMobileMenuButton(false)}><button className="bg-background text-foreground px-7 py-3 rounded-3xl">Login</button></a>
                </div>
            </div>}
        </header>
    )
}

export default Navbar;