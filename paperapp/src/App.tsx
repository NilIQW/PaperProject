import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowseProducts from './components/BrowseProducts';
import BasketPage from './components/BasketPage'; // Make sure to create this component
import BasketIcon from "./components/BasketIcon.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f1f0ee', paddingLeft: 70, margin: '0' }}>
                <BasketIcon />
                <Routes>
                    <Route path="/" element={<BrowseProducts />} />
                    <Route path="/basket" element={<BasketPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
