import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

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
                            {/* We will add New Arrivals and other sections here later */}
                        </main>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;