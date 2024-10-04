import React, { useEffect, useState } from 'react';
import { getPapers } from '../services/paperService';
import { Paper } from '../models/Paper.tsx';
import AddToBasketButton from './AddToBasketButton.tsx';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const BrowseProducts: React.FC = () => {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const fetchedPapers = await getPapers();
                setPapers(fetchedPapers);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 style={{
                margin: '30px',
                marginLeft: 'auto',
            }}>Browse Products</h2>

            {/* Button to navigate to create new paper page */}
            <Link to="/create-paper">
                <button style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Create New Paper
                </button>
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '70px' }}>
                {papers.map((paper) => (
                    <div
                        key={paper.id}
                        style={{
                            border: '2px solid #ccc',
                            padding: '20px',
                            marginTop: '40px',
                            width: '340px',
                            textAlign: 'center',
                            borderRadius: '8px',
                        }}
                    >
                        <img
                            src={paper.imageUrl}
                            alt={paper.name}
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                        <h3 style={{fontSize: '1.2em'}}>{paper.name}</h3>
                        <p style={{fontSize: '1em'}}>Price: {paper.price.toFixed(2)} DKK</p>
                        <p style={{fontSize: '1em'}}>Stock: {paper.stock}</p>
                        <p style={{fontSize: '1em'}}>Sheets Per Packet: {paper.sheetsPerPacket}</p>

                        <AddToBasketButton paper={paper}/>

                        {/* Button to navigate to edit paper page */}
                        <Link to={`/edit-paper/${paper.id}`}>
                            <button style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#008CBA',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}>
                                Edit Paper
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseProducts;
