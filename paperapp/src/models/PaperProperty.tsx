import { Paper } from './Paper';
import { Property } from './Property';

export interface PaperProperty {
    propertyName: string;
    paperId: number;
    propertyId: number;
    paper?: Paper;
    property?: Property;
}
