import { atom } from 'jotai';
import { Property } from '../../models/Property';

export const customPropertiesAtom = atom<Property[]>([]);
