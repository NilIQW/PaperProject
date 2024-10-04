export interface Property {
    id: number;
    name: string;
    value: string;
}

export interface PaperProperty {
    paperId: number;
    propertyId: number;
    property: Property;
}
