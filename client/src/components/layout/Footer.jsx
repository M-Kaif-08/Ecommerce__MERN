import { Link } from "react-router"

const Footer = () => {

  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Running", href: "/products?category=running" },
    { name: "Training", href: "/products?category=training" },
    { name: "Lifestyle", href: "/products?category=lifestyle" }
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]

  return (
    <footer className="min-h-[30vh] border border-border">

      <div className="grid-footer gap-4 md:px-30 py-15">

        <div className="area-footer-content flex flex-col gap-3">
          <Link to="/" className="text-3xl font-play">Step<span className="text-muted">ora</span></Link>
          <p className="text-muted">Performance footwear crafted for comfort, style, and <br /> every step ahead.</p>
        </div>

        <div className="area-footer-product-nav flex flex-col justify-center gap-4">
          <Link to="/products" className="text-sm">Shop</Link>
          <div className="flex flex-col justify-center gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={category.href} className="text-sm text-muted">{category.name}</Link>
            ))}
          </div>
        </div>

        <div className="area-footer-company-nav flex flex-col justify-center gap-4">
          <p className="text-sm">Company</p>
          <div className="flex flex-col justify-center gap-4">
            {company.map((link, index) => (
              <Link key={index} to={link.href} className="text-sm text-muted">{link.name}</Link>
            ))}
          </div>
        </div>

      </div>

      {/* CopyRight */}
      <div className="text-center text-sm text-muted py-4 border border-border">
        © {currentYear} Stepora. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer