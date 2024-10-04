import { atom } from 'jotai';
import { PaperProperty } from '../../models/Property.tsx';

export const paperPropertiesAtom = atom<PaperProperty[]>([]);
