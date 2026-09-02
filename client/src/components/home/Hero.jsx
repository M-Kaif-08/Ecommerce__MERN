import { Link } from 'react-router'

import AnimatedBorderButton from '../common/AnimatedBtn'

const Hero = () => {
    return (
        <section className="Hero relative min-h-screen overflow-hidden bg-background text-foreground">
            {/* Glow center */}
            <div className="absolute left-1/2 top-1/2 w-[30%] sm:w-100 md:w-100 lg:w-150 h-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
            {/* Header */}
            <div className="mt-35">
                <h1 className="text-center text-3xl md:text-5xl font-thin">You Deserve Luxury in</h1>
                <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-widest bg-linear-to-r from-foreground via-foreground/50 to-foreground/5 bg-clip-text text-transparent">EVERY STEP</h1>
            </div>
            {/* Image */}
            <div className="absolute left-1/2 top-[40%] sm:top-[30%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[60%] md:w-auto">
                <img src="Hero-section/Hero-section-shoe.png" alt="Hero Section image" className="mix-blend-screen w-full h-auto md:w-auto md:h-auto" />
            </div>
            {/* Highligths */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:mt-76 mt-64">
                <p className="text-muted md:max-w-55 max-w-[90%] md:text-right text-center leading-tight">Discover our latest collection of performance footwear, crafted for comfort, style, and every step ahead.</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-thin">Elevate <br className="hidden sm:block" /> Comfort</h2>
            </div>
            {/* CTA Buttons */}
            <div className="flex justify-center mt-5">
                <AnimatedBorderButton><Link to='/products'>SHOP NOW</Link></AnimatedBorderButton>
            </div>
        </section>
    )
}

export default Hero
