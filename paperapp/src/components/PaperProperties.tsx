import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { paperPropertiesAtom } from '../state/atoms/paperPropertiesAtom.tsx';
import { PaperProperty } from '../models/Property.tsx';

interface PaperPropertiesProps {
    paperId: number;
}

const PaperProperties: React.FC<PaperPropertiesProps> = ({ paperId }) => {
    const [paperProperties, setPaperProperties] = useAtom(paperPropertiesAtom);

    useEffect(() => {
        const fetchPaperProperties = async () => {
            const response = await fetch(`/api/paperproperty/${paperId}`);
            const data: PaperProperty[] = await response.json();
            setPaperProperties(data);
        };

        fetchPaperProperties();
    }, [paperId, setPaperProperties]);

    return (
        <div>
            <h2>Paper Properties</h2>
            <ul>
                {paperProperties.map((pp) => (
                    <li key={pp.propertyId}>
                        {pp.property.name}: {pp.property.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaperProperties;
