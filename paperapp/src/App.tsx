import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowseProducts from './components/BrowseProducts';
import BasketPage from './components/BasketPage';
import BasketIcon from "./components/BasketIcon.tsx";
import CreatePaper from "./components/CreatePaper.tsx";
import EditPaper from "./components/EditPaper.tsx";
import AddCustomer from "./components/AddCustomer.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundColor: '#f1f0ee',
                padding: '20px 70px',
                margin: '0',
                fontFamily: 'Arial, sans-serif',
                color: '#333'
            }}>
                <BasketIcon />
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <Routes>
                        <Route path="/" element={<BrowseProducts />} />
                        <Route path="/basket" element={<BasketPage />} />
                        <Route path="/create-paper" element={<CreatePaper />} />
                        <Route path="/edit-paper/:paperId" element={<EditPaper />} />
                        <Route path="/customer-info" element={<AddCustomer />} />

                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
