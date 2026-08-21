import { Link } from 'react-router'

import AnimatedBorderButton from "../components/AnimatedBtn"

import { FaArrowRightLong } from "react-icons/fa6";


const Home = () => {

    const categories = [
        { name: "Sport Shoes", href: "/products?category=sport", image: "Sport-shoes.png", description: "Built for movement, comfort, and everyday performance." },
        { name: "Formal Footwear", href: "/products?category=formal", image: "Formal-footwear.webp", description: "Sophisticated styles crafted for polished, timeless occasions." },
        { name: "Boots", href: "/products?category=boots", image: "Boots.webp", description: "Rugged designs combining durability, confidence, and modern style." },
        { name: "Sandals", href: "/products?category=sandels", image: "Sandal.webp", description: "Lightweight comfort designed for effortless everyday wear." }
    ]
    return (
        <main className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="Hero relative min-h-screen overflow-hidden bg-background text-foreground">
                {/* Glow center */}
                <div className="absolute left-1/2 top-1/2 w-[90%] sm:w-150 md:w-180 lg:w-200 h-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/10 blur-[100px]" />
                {/* Header */}
                <div className="mt-35">
                    <h1 className="text-center text-3xl md:text-5xl font-thin">You Deserve Luxury in</h1>
                    <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-widest bg-linear-to-r from-foreground via-foreground/70 to-foreground/5 bg-clip-text text-transparent">EVERY STEP</h1>
                </div>
                {/* Image */}
                <div className="absolute left-1/2 top-[40%] sm:top-[30%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[60%] md:w-auto">
                    <img src="Hero-section-shoe.png" alt="Hero Section image" className="mix-blend-screen w-full h-auto md:w-auto md:h-auto" />
                </div>
                {/* Highligths */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:mt-76 mt-64">
                    <p className="text-muted md:max-w-55 max-w-[90%] md:text-right text-center leading-tight">Discover our latest collection of performance footwear, crafted for comfort, style, and every step ahead.</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-thin">Elevate <br className="hidden sm:block" /> Comfort</h2>
                </div>
                {/* CTA Buttons */}
                <div className="flex justify-center mt-5">
                    <AnimatedBorderButton>SHOP NOW</AnimatedBorderButton>
                </div>
            </section>
            {/* Category Section */}
            <section className="Category relative min-h-[110vh] overflow-hidden flex flex-col items-center bg-primary space-y-6">
                {/* Heading */}
                <h3 className="text-highlight mt-22 uppercase tracking-widest">Shop by Category</h3>
                <h3 className="font-play text-5xl">Explore the collection</h3>
                <div className="container px-5 pt-9">
                    {/* Category Grid */}
                    <div className="grid gap-6 px-10 lg:grid-cols-4 md:grid-cols-2">
                        {categories.map((category, index) => (
                            <Link key={index} to={category.href}>
                                <img src={category.image} alt={category.name} />
                                <div className='px-2'>
                                    <h4 className='font-play text-xl font-semibold mt-4'>{category.name}</h4>
                                    <p className='text-muted text-sm mt-3'>{category.description}</p>
                                    <p className='uppercase text-sm mt-3 flex items-center gap-4'>Shop {category.name}<FaArrowRightLong className='w-10 h-4' /></p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
