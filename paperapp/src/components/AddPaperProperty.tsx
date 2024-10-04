import React, { useEffect } from 'react';
import {atom, useAtom} from 'jotai';
import { paperAtom, customPropertiesAtom } from '../state/atoms/paperAtom';
import { createPaper, updatePaper, getPaperById } from '../services/paperService';
import { useParams, useNavigate } from 'react-router-dom';

const PaperCrudPage: React.FC = () => {
    const { paperId } = useParams<{ paperId: string }>(); // For edit mode
    const navigate = useNavigate();

    const [paper, setPaper] = useAtom(paperAtom);
    const [customProperties, setCustomProperties] = useAtom(customPropertiesAtom);
    const [loading, setLoading] = useAtom(atom(false));
    const [error, setError] = useAtom(atom<string | null>(null));

    // Fetch existing paper if editing
    useEffect(() => {
        if (paperId) {
            const fetchPaper = async () => {
                try {
                    const fetchedPaper = await getPaperById(parseInt(paperId));
                    setPaper(fetchedPaper);
                } catch (err) {
                    setError('Error fetching paper details');
                }
            };
            fetchPaper();
        }
    }, [paperId, setPaper, setError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (paperId) {
                await updatePaper(parseInt(paperId), paper);
            } else {
                await createPaper(paper);
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
