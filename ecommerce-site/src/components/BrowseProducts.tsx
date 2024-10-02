
import React, { useEffect, useState } from 'react';
import { getPapers } from '../services/paperService';
import { Paper } from '../models/Paper';

const BrowseProducts: React.FC = () => {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const fetchedPapers = await getPapers(); // Calls the API function
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
            <h1>Browse Papers</h1>
            <ul>
                {papers.map(paper => (
                    <li key={paper.id}>
                        <h2>{paper.name}</h2>
                        <p>Price: ${paper.price.toFixed(2)}</p>
                        <p>Stock: {paper.stock}</p>
                        <p>{paper.discontinued ? "This product is discontinued" : "Available"}</p>
                        {/* Add a button to add to basket here later */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrowseProducts;
