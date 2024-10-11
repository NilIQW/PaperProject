import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { paperAtom } from '../atoms/paperAtom';
import { updatePaper, fetchPaperById } from '../services/paperService';
import { useNavigate, useParams } from 'react-router-dom';
import { customPropertiesAtom } from '../atoms/CustomPropertiesAtom';
import { Property } from '../models/Property';

const EditPaper: React.FC = () => {
    const [paper, setPaper] = useAtom(paperAtom);
    const [customProperties, setCustomProperties] = useAtom(customPropertiesAtom);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get the paper ID from the URL parameters

    // Fetch paper details by ID when the component mounts
    useEffect(() => {
        const loadPaper = async () => {
            if (id) {
                try {
                    const fetchedPaper = await fetchPaperById(Number(id));
                    setPaper(fetchedPaper);
                    setCustomProperties(fetchedPaper.paperProperties); // Assuming `paperProperties` is the field for custom properties
                } catch (error) {
                    console.error('Failed to load paper:', error);
                }
            }
        };

        loadPaper();
    }, [id, setPaper, setCustomProperties]);

    // Handle form submission
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Construct the payload for paper update
        const paperPayload = {
            ...paper,
            imageUrl: imageFile ? URL.createObjectURL(imageFile) : paper.imageUrl,
            paperProperties: customProperties.map((prop) => ({
                propertyName: prop.propertyName,
                id : prop.id,
            })),
        };

        try {
            // Send the update paper request to the API
            const response = await updatePaper(Number(id), paperPayload);

            // If update is successful, navigate to the main page
            if (response) {
                navigate('/');
            }
        } catch (err) {
            console.error('Error updating paper:', err);
        }
    };

    // Handle changes to individual custom properties
    const handlePropertyChange = (index: number, value: string) => {
        const newProperties = [...customProperties];
        newProperties[index] = { ...newProperties[index], propertyName: value };
        setCustomProperties(newProperties);
    };

    // Add a new custom property
    const addCustomProperty = () => {
        const newProperty: Property = {
            id: Date.now(), // Temporary unique ID for UI purposes
            propertyName: '',
            paperProperties: [],
        };
        setCustomProperties([...customProperties, newProperty]);
    };

    // Remove a custom property
    const removeCustomProperty = (index: number) => {
        const newProperties = customProperties.filter((_, i) => i !== index);
        setCustomProperties(newProperties);
    };

    // Handle image file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPaper({ ...paper, imageUrl: URL.createObjectURL(file) }); // Optional image preview
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
                        value={paper.name}
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
                        value={paper.price}
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
                        value={paper.stock}
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
                        value={paper.sheetsPerPacket}
                        onChange={(e) => setPaper({ ...paper, sheetsPerPacket: parseInt(e.target.value) })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Discontinued:
                    <input
                        type="checkbox"
                        checked={paper.discontinued}
                        onChange={(e) => setPaper({ ...paper, discontinued: e.target.checked })}
                        style={{ marginBottom: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={paper.imageUrl}
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
                    <div key={property.id || index}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={property.propertyName}
                                onChange={(e) => handlePropertyChange(index, e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </label>
                        <button type="button" onClick={() => removeCustomProperty(index)} style={{ marginBottom: '10px' }}>
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addCustomProperty} style={{ marginBottom: '10px' }}>
                    Add Custom Property
                </button>
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Update Paper
                </button>
            </form>
        </div>
    );
};

export default EditPaper;
