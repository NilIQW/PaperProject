import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { paperAtom } from '../state/atoms/paperAtom';
import { updatePaper, getPaperById } from '../services/paperService';
import { useNavigate, useParams } from 'react-router-dom';
import { customPropertiesAtom } from '../state/atoms/CustomPropertiesAtom';
import { Property } from '../models/Property';

const EditPaper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [paper, setPaper] = useAtom(paperAtom);
    const [customProperties, setCustomProperties] = useAtom(customPropertiesAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaper = async () => {
            if (id) {
                const fetchedPaper = await getPaperById(parseInt(id));
                setPaper(fetchedPaper);
                setCustomProperties(fetchedPaper.customProperties || []);
            }
        };

        fetchPaper();
    }, [id, setPaper, setCustomProperties]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updatePaper(parseInt(id!), {
                id: paper.id, // This might be redundant if you only need to pass the ID
                name: paper.name,
                discontinued: paper.discontinued,
                stock: paper.stock,
                price: paper.price,
                imageUrl: paper.imageUrl,
                sheetsPerPacket: paper.sheetsPerPacket,
                customProperties: customProperties.map(prop => ({
                    id: prop.id, // Include id if needed, else omit
                    name: prop.name,
                })),
            });

            navigate('/');
        } catch (err) {
            console.error('Error updating paper:', err);
        }
    };

    const handlePropertyChange = (index: number, value: string) => {
        const newProperties = [...customProperties];
        newProperties[index] = { ...newProperties[index], name: value };
        setCustomProperties(newProperties);
    };

    const addCustomProperty = () => {
        const newProperty: Property = { id: Date.now(), name: '' };
        setCustomProperties([...customProperties, newProperty]);
    };

    const removeCustomProperty = (index: number) => {
        const newProperties = customProperties.filter((_, i) => i !== index);
        setCustomProperties(newProperties);
    };

    return (
        <div>
            <h2>Edit Paper</h2>
            <form onSubmit={handleUpdate}>
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
                <h3>Custom Properties</h3>
                {customProperties.map((property, index) => (
                    <div key={index}>
                        <label>
                            Name
                            <input
                                type="text"
                                value={property.name}
                                onChange={(e) => handlePropertyChange(index, e.target.value)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => removeCustomProperty(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addCustomProperty}>Add Custom Property</button>
                <br />
                <button type="submit">Update Paper</button>
            </form>
        </div>
    );
};

export default EditPaper;
