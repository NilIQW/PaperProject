import { Paper } from './Paper';
import { Property } from './Property';

export interface PaperProperty {
    paperId: number;
    propertyId: number;
    paper: Paper;
    property: Property;
}
