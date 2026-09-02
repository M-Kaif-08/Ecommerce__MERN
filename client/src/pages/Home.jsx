import Hero from "../components/home/Hero"
import Category from "../components/home/Category"
import Craft from "../components/home/Craft"

const Home = () => {
    return (
        <main className="relative overflow-hidden">
            <Hero />
            <Category />
            <Craft />
        </main>
    )
}

export default Home
