import { Link } from 'react-router'

import AnimatedBorderButton from "../components/AnimatedBtn"

import { FaArrowRightLong } from "react-icons/fa6";
import { BsTruck, BsBuildingCheck } from "react-icons/bs";
import { PiHandHeart } from "react-icons/pi";
import { LiaHeadsetSolid } from "react-icons/lia";

const Home = () => {

    const categories = [
        { name: "Sport Shoes", href: "/products?category=sport", image: "Sport-shoes.png", description: "Built for movement, comfort, and everyday performance." },
        { name: "Formal Footwear", href: "/products?category=formal", image: "Formal-footwear.webp", description: "Sophisticated styles crafted for polished, timeless occasions." },
        { name: "Boots", href: "/products?category=boots", image: "Boots.webp", description: "Rugged designs combining durability, confidence, and modern style." },
        { name: "Sandals", href: "/products?category=sandels", image: "Sandal.webp", description: "Lightweight comfort designed for effortless everyday wear." }
    ]

    const facilites = [
        { icon: BsTruck, title: "Free Shipping", description: "Free delivery on all orders within Pakistan." },
        { icon: PiHandHeart, title: "Hand-Crafted", description: "Each pair finished by hand." },
        { icon: BsBuildingCheck, title: "Built to be Resoled", description: "Designed to be rebuilt and worn for decades." },
        { icon: LiaHeadsetSolid, title: "Personal Service", description: "Reach us on WhatsApp from 10am to 8pm." }
    ]
    return (
        <main className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="Hero relative min-h-[93vh] overflow-hidden bg-background text-foreground">
                {/* Glow center */}
                <div className="absolute left-1/2 top-1/2 w-[90%] sm:w-150 md:w-180 lg:w-200 h-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/10 blur-[100px]" />
                {/* Header */}
                <div className="mt-22">
                    <h1 className="text-center text-3xl md:text-5xl font-thin">You Deserve Luxury in</h1>
                    <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-widest bg-linear-to-r from-foreground via-foreground/70 to-foreground/5 bg-clip-text text-transparent">EVERY STEP</h1>
                </div>
                {/* Image */}
                <div className="absolute left-1/2 top-[40%] sm:top-[30%] lg:top-[47%] -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[60%] md:w-auto">
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
            <section className="Category relative min-h-[110vh] overflow-hidden flex flex-col items-center bg-primary space-y-6 pb-10">
                {/* Heading */}
                <h3 className="text-highlight mt-22 text-center uppercase tracking-widest">Shop by Category</h3>
                <h3 className="font-play text-center lg:text-5xl md:text-4xl text-3xl">Explore the collection</h3>
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
            {/* Craft Section */}
            <section className='craft relative overflow-hidden bg-secondary'>
                {/* Craft Grid */}
                <div className='grid md:grid-cols-2 min-h-screen'>
                    {/* Image */}
                    <div className='p-24'>
                        <img src="craft-section.jpg" alt="Craft Section Image" className='w-full h-full object-cover' />
                    </div>
                    {/* Craft Content */}
                    <div className='flex flex-col justify-center gap-5 px-20'>
                        <h3 className='text-highlight uppercase tracking-widest'>The Craft</h3>
                        <h4 className='font-play lg:text-5xl md:text-4xl text-3xl'>Crafted for Every Step.</h4>
                        <p className='text-muted font-medium'>Every Stepora pair is designed with a careful balance of comfort, quality, and timeless style. From supportive sport shoes to refined formal footwear, rugged boots, and effortless sandals, every detail is thoughtfully considered.</p>
                        <p className='text-muted font-medium'>We choose quality materials, refined construction, and purposeful design to create footwear made for more than just the moment — shoes you can rely on, step after step.</p>
                    </div>
                </div>
            </section>
            {/* Facility Section or Why choose Stepora */}
            <section className='ChooseStepora relative overflow-hidden bg-background text-foreground py-15 space-y-6'>
                {/* Heading */}
                <h3 className='text-center font-light uppercase tracking-widest mt-7'>Why choose <span className='font-play'>Stepora</span></h3>
                {/* grid Content */}
                <div className='grid grid-cols-2 lg:grid-cols-4 m-15 items-center gap-15'>
                    {facilites.map((facility, index) => (
                        <div key={index} className='flex flex-col gap-3 justify-center items-center'>
                            {<facility.icon className='w-8 h-8 text-highlight' />}
                            <h4 className='font-play'>{facility.title}</h4>
                            <p className='text-muted text-sm text-center'>{facility.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home
