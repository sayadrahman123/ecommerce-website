import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandBar from "./components/BrandBar.jsx";
import NewArrivals from "./components/NewArrivals.jsx";
import TopSelling from "./components/TopSelling.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <Router>
            <div className="font-sans text-shop-black">
                <TopBanner />
                <Navbar />

                <Routes>
                    <Route path="/" element={
                        <main>
                            <Hero />

                            <BrandBar />

                            <NewArrivals />

                            <TopSelling />

                            <CategoryGrid />

                            <Testimonials />

                        </main>
                    } />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;