export type WoodTypeId = 'pressureTreated' | 'composite' | 'pvc' | 'exotic';
export type BoardSizeId = '1x4' | '1x6' | '2x6' | '2x8';
export type DeckShape = 'rectangle' | 'circle' | 'octagon' | 'hexagon';

export interface FormData {
    deckShape: DeckShape;
    lengthFeet: string;
    widthFeet: string;
    sideLength: string; // For octagon/hexagon
    diameter: string; // For circle
    boardSize: BoardSizeId;
    joistSpacing: 12 | 16 | 24;
    deckingAngle: 90 | 45;
    woodType: WoodTypeId;
}

export interface WoodType {
    id: WoodTypeId;
    name: string;
    costPerSqFt: number;
    maintenance: 'High' | 'Low';
}

export interface BoardSize {
    id: BoardSizeId;
    name: string;
    actualWidthInches: number;
}

export interface CalculationResults {
    totalSqFt: number;
    finalLinearFeet: number;
    totalScrews: number;
    hiddenFasteners: number;
    wasteFactor: number;
    cost: {
        total: number;
        decking: number;
        labor: number;
        substructure: number;
        railing: number;
    };
    woodType: WoodType;
}

export interface FormErrors {
    lengthFeet?: string;
    widthFeet?: string;
    sideLength?: string;
    diameter?: string;
}