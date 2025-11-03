// FIX: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';
import type { WoodType, BoardSize, DeckShape } from './types';
import { RectangleIcon, CircleIcon, OctagonIcon, HexagonIcon } from './components/icons/DeckShapes';

export const WOOD_TYPES: WoodType[] = [
    { id: 'pressureTreated', name: 'Pressure-Treated Pine', costPerSqFt: 3, maintenance: 'High' },
    { id: 'composite', name: 'Composite Decking', costPerSqFt: 6, maintenance: 'Low' },
    { id: 'pvc', name: 'PVC Decking', costPerSqFt: 7, maintenance: 'Low' },
    { id: 'exotic', name: 'Exotic Hardwood (Ipe)', costPerSqFt: 10, maintenance: 'High' },
];

export const BOARD_SIZES: BoardSize[] = [
    { id: '1x4', name: '1x4 (Actual: 3.5")', actualWidthInches: 3.5 },
    { id: '1x6', name: '1x6 (Actual: 5.5")', actualWidthInches: 5.5 },
    { id: '2x6', name: '2x6 (Actual: 5.5")', actualWidthInches: 5.5 },
    { id: '2x8', name: '2x8 (Actual: 7.25")', actualWidthInches: 7.25 },
];

export const JOIST_SPACINGS = [12, 16, 24];

export const COST_BREAKDOWN_PERCENTAGES = {
    decking: 0.20,      // Decking materials are 20% of total
    labor: 0.30,        // Labor is 30% of total
    substructure: 0.38, // Substructure is 38% of total
    railing: 0.12,      // Railing is 12% of total
};

interface DeckShapeInfo {
    id: DeckShape;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DECK_SHAPES: DeckShapeInfo[] = [
    { id: 'rectangle', name: 'Rectangle', icon: RectangleIcon },
    { id: 'circle', name: 'Circle', icon: CircleIcon },
    { id: 'octagon', name: 'Octagon', icon: OctagonIcon },
    { id: 'hexagon', name: 'Hexagon', icon: HexagonIcon },
];