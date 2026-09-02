import { Link } from 'react-router'

const Category = () => {

    const categories = [
        { name: "Running", href: "/products?category=running", image: "Category-section/running-shoe.webp", description: "Built for distance, tuned for rhythm" },
        { name: "Training", href: "/products?category=training", image: "Category-section/Training-shoe.png", description: "Stability and grip for every set." },
        { name: "Lifestyle", href: "/products?category=lifestyle", image: "Category-section/lifeStyle-shoe.png", description: "Comfort that carries into the everyday." }
    ]

    return (
        <section className="relative min-h-screen overflow-hidden">

            <div className="md:mt-25 mt-16 md:px-30 flex flex-col items-center space-y-15">

                <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
                    <h2 className="text-4xl font-play">Shop by category</h2>
                    <Link className='text-muted text-sm' to="/products">View all</Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {categories.map((category, index) => (
                        <Link key={index} to={category.href} className='md:w-100 w-80 h-120 border border-border rounded-2xl'>
                            <div className='h-[80%] w-full flex justify-center items-center'>
                                <img src={category.image} alt={category.name} />
                            </div>
                            <div className='px-7 flex flex-col gap-1'>
                                <h3 className='text-2xl font-play'>{category.name}</h3>
                                <p className='text-muted text-sm'>{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

        </section>
    )
}

export default Category
