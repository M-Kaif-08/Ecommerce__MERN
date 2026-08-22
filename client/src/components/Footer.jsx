import { Link } from 'react-router'

function Footer() {

    const currentYear = new Date().getFullYear();
    const footerlinks = [
        { to: "/about", label: "About Us" },
        { to: "/products", label: "Shop Now" },
        { to: "/contact", label: "Contact" }
    ]

    return (
        <footer className="bg-primary py-24 border-t border-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Logo secton */}
                    <div className="text-center">
                        <Link to='/' className='font-play text-3xl'>Step<span className="text-muted">ora</span></Link>
                        <p className='text-sm text-muted'>©Copyright {currentYear} Srepora. All rights reserved.</p>
                    </div>
                    {/* links */}
                    <nav className='flex flex-wrap gap-6'>
                        {footerlinks.map((link, index) => (
                            <Link 
                            key={index} 
                            to={link.to}
                            className='font-play font-medium hover:text-muted'
                            >{link.label}</Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;