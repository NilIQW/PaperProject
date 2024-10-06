import React from 'react';
import { useAtom } from 'jotai';
import { paperAtom } from '../state/atoms/paperAtom';
import { createPaper } from '../services/paperService';
import { useNavigate } from 'react-router-dom';
import { customPropertiesAtom } from '../state/atoms/CustomPropertiesAtom';
import { Property } from '../models/Property';

const CreatePaper: React.FC = () => {
    const [paper, setPaper] = useAtom(paperAtom);
    const [customProperties, setCustomProperties] = useAtom(customPropertiesAtom);
    const navigate = useNavigate();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createPaper({
                name: paper.name,
                discontinued: paper.discontinued,
                stock: paper.stock,
                price: paper.price,
                imageUrl: paper.imageUrl,
                sheetsPerPacket: paper.sheetsPerPacket,
                properties: customProperties.map(prop => ({
                    propertyName: prop.name,
                })),
            });

            navigate('/');
        } catch (err) {
            console.error('Error creating paper:', err);
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
            <h2>Create New Paper</h2>
            <form onSubmit={handleCreate}>
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
                <button type="submit">Create Paper</button>
            </form>
        </div>
    );
};

export default CreatePaper;
