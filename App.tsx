import React, { useState, useCallback } from 'react';
import type { FormData, CalculationResults, FormErrors, DeckShape } from './types';
import { WOOD_TYPES, BOARD_SIZES, COST_BREAKDOWN_PERCENTAGES } from './constants';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';

const initialState: FormData = {
    deckShape: 'rectangle',
    lengthFeet: '20',
    widthFeet: '16',
    sideLength: '',
    diameter: '',
    boardSize: '1x6',
    joistSpacing: 16,
    deckingAngle: 90,
    woodType: 'pressureTreated',
};

const calculateArea = (shape: DeckShape, length: number, width: number, side: number, diameter: number): number => {
    switch (shape) {
        case 'rectangle':
            return length * width;
        case 'circle':
            return Math.PI * Math.pow(diameter / 2, 2);
        case 'octagon':
            return 2 * (1 + Math.sqrt(2)) * Math.pow(side, 2);
        case 'hexagon':
            return (3 * Math.sqrt(3) / 2) * Math.pow(side, 2);
        default:
            return 0;
    }
};

export default function App() {
    const [formData, setFormData] = useState<FormData>(initialState);
    const [results, setResults] = useState<CalculationResults | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = useCallback(() => {
        const newErrors: FormErrors = {};
        const { deckShape, lengthFeet, widthFeet, sideLength, diameter } = formData;

        switch (deckShape) {
            case 'rectangle':
                if (!lengthFeet || parseFloat(lengthFeet) <= 0) newErrors.lengthFeet = 'Enter a positive number.';
                if (!widthFeet || parseFloat(widthFeet) <= 0) newErrors.widthFeet = 'Enter a positive number.';
                break;
            case 'circle':
                if (!diameter || parseFloat(diameter) <= 0) newErrors.diameter = 'Enter a positive number.';
                break;
            case 'octagon':
            case 'hexagon':
                if (!sideLength || parseFloat(sideLength) <= 0) newErrors.sideLength = 'Enter a positive number.';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleCalculate = useCallback(() => {
        if (!validateForm()) return;
        
        setIsLoading(true);

        setTimeout(() => { // Simulate calculation delay for loading spinner
            const { deckShape, lengthFeet, widthFeet, sideLength, diameter, boardSize, deckingAngle, woodType } = formData;

            const totalSqFt = calculateArea(
                deckShape,
                parseFloat(lengthFeet),
                parseFloat(widthFeet),
                parseFloat(sideLength),
                parseFloat(diameter)
            );

            const selectedBoard = BOARD_SIZES.find(b => b.id === boardSize);
            const selectedWood = WOOD_TYPES.find(w => w.id === woodType);

            if (!selectedBoard || !selectedWood) {
                setIsLoading(false);
                return;
            };

            const gapInches = 0.125;
            const effectiveBoardWidthInches = selectedBoard.actualWidthInches + gapInches;
            const totalLinearFeet = (totalSqFt * 144) / effectiveBoardWidthInches / 12;

            const baseWaste = 0.05; // 5% base
            const angleWaste = deckingAngle === 45 ? 0.10 : 0;
            const totalWasteFactor = 1 + baseWaste + angleWaste;
            const finalLinearFeet = totalLinearFeet * totalWasteFactor;

            const screwsPerSqFt = 3.5;
            const totalScrews = Math.ceil(totalSqFt * screwsPerSqFt);
            
            const deckingMaterialCost = totalSqFt * selectedWood.costPerSqFt;
            const totalCost = deckingMaterialCost / COST_BREAKDOWN_PERCENTAGES.decking;

            const laborCost = totalCost * COST_BREAKDOWN_PERCENTAGES.labor;
            const substructureCost = totalCost * COST_BREAKDOWN_PERCENTAGES.substructure;
            const railingCost = totalCost * COST_BREAKDOWN_PERCENTAGES.railing;
            
            setResults({
                totalSqFt,
                finalLinearFeet,
                totalScrews,
                hiddenFasteners: totalScrews,
                wasteFactor: (totalWasteFactor - 1) * 100,
                cost: {
                    total: totalCost,
                    decking: deckingMaterialCost,
                    labor: laborCost,
                    substructure: substructureCost,
                    railing: railingCost,
                },
                woodType: selectedWood,
            });
            setIsLoading(false);
        }, 500);
    }, [formData, validateForm]);

    const handleReset = () => {
        setFormData(initialState);
        setResults(null);
        setErrors({});
    };

    return (
        <main className="min-h-screen font-sans text-slate-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-primary-900 tracking-tight">Deck Building Calculator</h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto">
                        Design your dream deck. Instantly estimate materials and costs by selecting a shape and providing dimensions.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <CalculatorForm 
                            formData={formData} 
                            setFormData={setFormData}
                            errors={errors}
                            onCalculate={handleCalculate}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="lg:col-span-3">
                         <ResultsDisplay 
                            results={results}
                            onReset={handleReset}
                         />
                    </div>
                </div>

                <footer className="text-center mt-12 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Deck Masters Inc. All rights reserved.</p>
                    <p className="mt-1">Estimates are for planning purposes only. Consult a professional for accurate quotes.</p>
                </footer>
            </div>
        </main>
    );
}