const Craft = () => {

    const craftImage = [
        {name: "Craft-detail-stitching", url: "Craft-section/craft-detail-stitching.png", description: "Precision Stitching"},
        {name: "Craft-detail-grip", url: "Craft-section/craft-detail-grip.png", description: "Gripped for Every Move"},
        {name: "Craft-detail-foam", url: "Craft-section/craft-detail-foam.png", description: "CushionCore Foam"},
    ]

    return (
        <section className="relative min-h-screen overflow-hidden">

            <div className="grid lg:grid-cols-2 justify-center gap-10 lg:px-40 px-8 mt-20  h-full">

                <div className="flex flex-col gap-10">
                    <img src="Craft-section/craft-hero-shoe.png" alt="Shoe image craft" />
                    <div className="flex justify-center items-center gap-10">
                        {craftImage.map((img, index)=>(
                            <div key={index} className="flex flex-col items-center justify-center gap-2">
                                <img src={img.url} alt={img.name} className="md:w-30 md:h-30 w-20 h-20 border border-border rounded-2xl" />
                                <p className="text-sm text-muted font-semibold">{img.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-5">
                    <h3 className="text-3xl font-play">Every pair is built around the way you actually move.</h3>
                    <p className="text-muted text-sm leading-8">From the midsole compound to the stitch pattern on the upper, Stepora shoes are developed with runners, trainers, and everyday walkers — not just for how they look, but how they hold up.</p>
                    <img className="border border-border rounded-3xl mt-5" src="Craft-section/craft-onfeet.png" alt="Craft-onfeet" />
                </div>

            </div>

        </section>
    )
}

export default Craft
