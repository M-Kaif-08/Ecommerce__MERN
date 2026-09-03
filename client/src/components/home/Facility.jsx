import { LiaTruckMovingSolid } from "react-icons/lia";
import { PiKeyReturn } from "react-icons/pi";
import { BsBag } from "react-icons/bs";

const Facility = () => {

    const facilities = [
        { icon: LiaTruckMovingSolid, title: "Free shipping", description: "On every order" },
        { icon: PiKeyReturn, title: "30-day returns", description: "Free returns, no questions asked" },
        { icon: BsBag, title: "1-year warranty", description: "Covering craftsmanship defects" }
    ]

    return (
        <section className="min-h-[20vh] border border-border flex justify-center items-center mt-10">
            <div className="flex md:flex-row flex-col items-center justify-center gap-8 sm:gap-15 lg:gap-45 my-8 md:mt-0">
                {facilities.map((facility, index) => (
                    <div key={index} className="flex md:flex-row flex-col justify-center items-center gap-1 md:gap-5 w-">
                        {<facility.icon className="md:w-10 md:h-10 w-7 h-7 text-primary" />}
                        <div className="flex flex-col md:items-start items-center">
                            <h4 className="text-xl font-play">{facility.title}</h4>
                            <p className="text-muted text-sm md:font-semibold">{facility.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Facility
