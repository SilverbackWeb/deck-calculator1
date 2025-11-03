// FIX: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';
import type { WoodType, BoardSize, DeckShape } from './types';
import { 
    RectangleIcon, 
    OctagonIcon, 
    HexagonIcon,
    RectangleDeckImage,
    OctagonDeckImage,
    HexagonDeckImage
} from './components/icons/DeckShapes';


// === THIS IS THE NEW PRICING CONTROL PANEL ===
// Ask your client for the numbers to put in here.
export const PRICING_MODEL = {
    // How much do they charge for labor per square foot?
    laborPerSqFt: 25,

    // How much do they charge for the frame/substructure per square foot?
    // This includes joists, beams, posts, hardware, concrete, etc.
    substructurePerSqFt: 18,
};

// This is where you set the material cost for the decking boards.
export const WOOD_TYPES: WoodType[] = [
    // How much does Pressure-Treated Pine cost per square foot?
    { id: 'pressureTreated', name: 'Pressure-Treated Pine', costPerSqFt: 5, maintenance: 'High' },
    
    // How much does Composite Decking cost per square foot?
    { id: 'composite', name: 'Composite Decking', costPerSqFt: 9, maintenance: 'Low' },

    // How much does PVC Decking cost per square foot?
    { id: 'pvc', name: 'PVC Decking', costPerSqFt: 11, maintenance: 'Low' },

    // How much does Exotic Hardwood cost per square foot?
    { id: 'exotic', name: 'Exotic Hardwood (Ipe)', costPerSqFt: 22, maintenance: 'High' },
];

export const BOARD_SIZES: BoardSize[] = [
    { id: '1x4', name: '1x4 (Actual: 3.5")', actualWidthInches: 3.5 },
    { id: '1x6', name: '1x6 (Actual: 5.5")', actualWidthInches: 5.5 },
    { id: '2x6', name: '2x6 (Actual: 5.5")', actualWidthInches: 5.5 },
    { id: '2x8', name: '2x8 (Actual: 7.25")', actualWidthInches: 7.25 },
];

export const JOIST_SPACINGS = [12, 16, 24];

interface DeckShapeInfo {
    id: DeckShape;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    image: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DECK_SHAPES: DeckShapeInfo[] = [
    { id: 'rectangle', name: 'Rectangle', icon: RectangleIcon, image: RectangleDeckImage },
    { id: 'octagon', name: 'Octagon', icon: OctagonIcon, image: OctagonDeckImage },
    { id: 'hexagon', name: 'Hexagon', icon: HexagonIcon, image: HexagonDeckImage },
];
