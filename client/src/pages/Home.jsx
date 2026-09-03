import Hero from "../components/home/Hero"
import Category from "../components/home/Category"
import Craft from "../components/home/Craft"
import Facility from "../components/home/Facility"

const Home = () => {
    return (
        <main className="relative overflow-hidden">
            <Hero />
            <Category />
            <Craft />
            <Facility />
        </main>
    )
}

export default Home
