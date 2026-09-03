import Navbar from "../components/layout/Navbar"
import { Outlet } from "react-router"
import Footer from "../components/layout/Footer";

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