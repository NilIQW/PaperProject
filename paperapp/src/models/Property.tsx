import { PaperProperty } from './PaperProperty';

export interface Property {
    id: number;
    propertyName: string;
    paperProperties: PaperProperty[];
}
