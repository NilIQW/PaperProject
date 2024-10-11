import { atom } from 'jotai';
import { Property } from '../models/Property.tsx';

export const customPropertiesAtom = atom<Property[]>([]);
