import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { paperAtom } from '../state/atoms/paperAtom';
import { updatePaper } from '../services/paperService';
import { useNavigate, useParams } from 'react-router-dom';
import { customPropertiesAtom } from '../state/atoms/CustomPropertiesAtom';
import { Property } from '../models/Property';
import { fetchPaperById } from '../services/paperService';


const EditPaper: React.FC = () => {
    const [paper, setPaper] = useAtom(paperAtom);
    const [customProperties, setCustomProperties] = useAtom(customPropertiesAtom);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const fetchedPaper = await fetchPaperById(parseInt(id));
                if (fetchedPaper) {
                    setPaper(fetchedPaper);
                    setCustomProperties(fetchedPaper.paperProperties || []);
                }
            }
        };

        fetchData();
    }, [id, setPaper, setCustomProperties]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Correct the API method for updating the paper
            const updatedPaper = await updatePaper(paper.id, {
                id: paper.id, orderEntries: [],
                name: paper.name,
                discontinued: paper.discontinued,
                stock: paper.stock,
                price: paper.price,
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : paper.imageUrl,
                sheetsPerPacket: paper.sheetsPerPacket,
                // Map customProperties to PaperProperty structure
                Properties: customProperties.map((customProp) => ({
                    paperId: paper.id, // Set the paperId
                    propertyId: customProp.id, // The propertyId is the id of Property
                    paper: {
                        id: paper.id,
                        name: paper.name,
                        discontinued: paper.discontinued,
                        stock: paper.stock,
                        price: paper.price,
                        imageUrl: paper.imageUrl,
                        sheetsPerPacket: paper.sheetsPerPacket,
                        orderEntries: paper.orderEntries, // Keep the original structure
                    },
                    property: {
                        id: customProp.id,  // Assuming id is used for Property
                        propertyName: customProp.propertyName,
                        paperProperties: [] // You can pass an empty array or relevant data here if needed
                    },
                }))
            });

            console.log('Paper updated:', updatedPaper);
            navigate('/');
        } catch (err) {
            console.error('Error updating paper:', err);
        }
    };



    const handlePropertyChange = (index: number, value: string) => {
        const newProperties = [...customProperties];
        newProperties[index] = { ...newProperties[index], propertyName: value };
        setCustomProperties(newProperties);
    };

    const addCustomProperty = () => {
        const newProperty: Property = {
            id: Date.now(),
            propertyName: '',
            paperProperties: []
        };
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
            setPaper({ ...paper, imageUrl: URL.createObjectURL(file) });
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
                        onChange={(e) => setPaper({ ...paper, price: Number(e.target.value) })}
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
                        onChange={(e) => setPaper({ ...paper, stock: Number(e.target.value) })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Sheets Per Packet:
                    <input
                        type="number"
                        value={paper.sheetsPerPacket}
                        onChange={(e) => setPaper({ ...paper, sheetsPerPacket: Number(e.target.value) })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={paper.imageUrl || ''}
                        onChange={(e) => setPaper({ ...paper, imageUrl: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <label>
                    File Upload:
                    <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                </label>
                <br />
                <label>
                    Discontinued:
                    <input
                        type="checkbox"
                        checked={paper.discontinued}
                        onChange={(e) => setPaper({ ...paper, discontinued: e.target.checked })}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <h3>Custom Properties</h3>
                {customProperties.map((property, index) => (
                    <div key={property.id}>
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
