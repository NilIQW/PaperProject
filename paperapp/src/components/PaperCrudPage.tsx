import React, { useState, useEffect } from 'react';
import { Paper } from '../models/Paper.tsx';
import { createPaper, updatePaper, getPaperById } from '../services/paperService';
import { useParams, useNavigate } from 'react-router-dom';

interface CustomProperty {
    key: string;
    value: string;
}

const PaperCrudPage: React.FC = () => {
    const { paperId } = useParams<{ paperId: string }>(); // For edit mode
    const navigate = useNavigate();

    const [paper, setPaper] = useState<Paper>({
        id: 0,
        name: '',
        price: 0,
        stock: 0,
        quantity: 0,
        sheetsPerPacket: 0,
        imageUrl: '',
        discontinued: false
    });

    const [customProperties, setCustomProperties] = useState<CustomProperty[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch existing paper if editing
    useEffect(() => {
        if (paperId) {
            const fetchPaper = async () => {
                try {
                    const fetchedPaper = await getPaperById(parseInt(paperId));
                    setPaper(fetchedPaper);
                    // Add logic to fetch and populate existing custom properties here if necessary
                } catch (err) {
                    setError('Error fetching paper details');
                }
            };
            fetchPaper();
        }
    }, [paperId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (paperId) {
                await updatePaper(parseInt(paperId), paper);
                // Save custom properties if necessary
            } else {
                await createPaper(paper);
                // Save custom properties if necessary
            }
            navigate('/'); // Redirect to main page after save
        } catch (err) {
            setError('Error saving paper');
        } finally {
            setLoading(false);
        }
    };

    const handlePropertyChange = (index: number, key: string, value: string) => {
        const newProperties = [...customProperties];
        newProperties[index] = { ...newProperties[index], [key]: value };
        setCustomProperties(newProperties);
    };

    const addCustomProperty = () => {
        setCustomProperties([...customProperties, { key: '', value: '' }]);
    };

    const removeCustomProperty = (index: number) => {
        const newProperties = customProperties.filter((_, i) => i !== index);
        setCustomProperties(newProperties);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{paperId ? 'Edit Paper' : 'Create New Paper'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={paper.name}
                        onChange={(e) => setPaper({ ...paper, name: e.target.value })}
                        required
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        value={paper.price}
                        onChange={(e) => setPaper({ ...paper, price: parseFloat(e.target.value) })}
                        required
                    />
                </label>
                <br />
                <label>
                    Stock:
                    <input
                        type="number"
                        value={paper.stock}
                        onChange={(e) => setPaper({ ...paper, stock: parseInt(e.target.value) })}
                        required
                    />
                </label>
                <br />
                <label>
                    Sheets per Packet:
                    <input
                        type="number"
                        value={paper.sheetsPerPacket}
                        onChange={(e) => setPaper({ ...paper, sheetsPerPacket: parseInt(e.target.value) })}
                    />
                </label>
                <br />

                {/* Custom Properties Section */}
                <h3>Custom Properties</h3>
                {customProperties.map((property, index) => (
                    <div key={index}>
                        <label>
                            Key:
                            <input
                                type="text"
                                value={property.key}
                                onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Value:
                            <input
                                type="text"
                                value={property.value}
                                onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => removeCustomProperty(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addCustomProperty}>Add Custom Property</button>

                <br />
                <button type="submit">{paperId ? 'Update Paper' : 'Create Paper'}</button>
            </form>
        </div>
    );
};

export default PaperCrudPage;
