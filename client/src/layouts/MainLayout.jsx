import Navbar from "../components/Navbar"
import { Outlet } from "react-router"
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;