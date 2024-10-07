import React, { useEffect, useState } from 'react';
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
    const [imageFile, setImageFile] = useState<File | null>(null);
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
                name: paper.name,
                discontinued: paper.discontinued,
                stock: paper.stock,
                price: paper.price,
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : paper.imageUrl,
                sheetsPerPacket: paper.sheetsPerPacket,
                customProperties: customProperties.map(prop => ({
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPaper({ ...paper, imageUrl: URL.createObjectURL(file) }); // Optional: Display the image preview
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2>Edit Paper</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={paper.name || ''} // Ensure it doesn't throw an error if undefined
                        onChange={(e) => setPaper({ ...paper, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        value={paper.price || 0} // Ensure it defaults to 0
                        onChange={(e) => setPaper({ ...paper, price: parseFloat(e.target.value) })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Stock:
                    <input
                        type="number"
                        value={paper.stock || 0} // Ensure it defaults to 0
                        onChange={(e) => setPaper({ ...paper, stock: parseInt(e.target.value) })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Sheets per Packet:
                    <input
                        type="number"
                        value={paper.sheetsPerPacket || 0} // Ensure it defaults to 0
                        onChange={(e) => setPaper({ ...paper, sheetsPerPacket: parseInt(e.target.value) })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={paper.imageUrl || ''} // Ensure it doesn't throw an error if undefined
                        onChange={(e) => setPaper({ ...paper, imageUrl: e.target.value })}
                        placeholder="Or upload an image file"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Upload Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginBottom: '10px' }}
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
                                value={property.name || ''} // Ensure it doesn't throw an error if undefined
                                onChange={(e) => handlePropertyChange(index, e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </label>
                        <button type="button" onClick={() => removeCustomProperty(index)} style={{ marginBottom: '10px' }}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addCustomProperty} style={{ marginBottom: '10px' }}>Add Custom Property</button>
                <br />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update Paper</button>
            </form>
        </div>
    );
};

export default EditPaper;
