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
import ProductDetails from "./pages/ProductDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import OrdersPage from './pages/OrdersPage';

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

                    {/* Product Detail Route (The :id part makes it dynamic) */}
                    <Route path="/product/:id" element={<ProductDetails />} />

                    <Route path="/category/:category" element={<CategoryPage />} />

                    <Route path="/cart" element={<CartPage />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/orders" element={<OrdersPage />} />

                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;