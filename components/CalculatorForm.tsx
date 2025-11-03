
import React, { useState, useEffect } from 'react';
import type { FormData, FormErrors, DeckShape } from '../types';
import { WOOD_TYPES, BOARD_SIZES, JOIST_SPACINGS, DECK_SHAPES } from '../constants';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { RadioGroup } from './ui/RadioGroup';
import { Calculator, Loader, Info } from 'lucide-react';

interface CalculatorFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    errors: FormErrors;
    onCalculate: () => void;
    isLoading: boolean;
}

const calculatePreviewArea = (data: FormData): number => {
    const length = parseFloat(data.lengthFeet) || 0;
    const width = parseFloat(data.widthFeet) || 0;
    const side = parseFloat(data.sideLength) || 0;

    if (length < 0 || width < 0 || side < 0) return 0;

    switch (data.deckShape) {
        case 'rectangle': return length * width;
        case 'octagon': return 2 * (1 + Math.sqrt(2)) * Math.pow(side, 2);
        case 'hexagon': return (3 * Math.sqrt(3) / 2) * Math.pow(side, 2);
        default: return 0;
    }
};

const FormSection: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-600 text-white font-bold text-sm">{number}</div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <div className="pl-11">{children}</div>
    </div>
);


export function CalculatorForm({ formData, setFormData, errors, onCalculate, isLoading }: CalculatorFormProps) {
    const [previewArea, setPreviewArea] = useState(0);

    useEffect(() => {
        setPreviewArea(calculatePreviewArea(formData));
    }, [formData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'radio' && (name === 'joistSpacing' || name === 'deckingAngle') ? Number(value) : value
        }));
    };

    const handleShapeChange = (shape: DeckShape) => {
        setFormData(prev => ({
            ...prev,
            deckShape: shape,
            lengthFeet: shape === 'rectangle' ? prev.lengthFeet || '20' : '',
            widthFeet: shape === 'rectangle' ? prev.widthFeet || '16' : '',
            sideLength: (shape === 'octagon' || shape === 'hexagon') ? prev.sideLength || '8' : '',
            diameter: '',
        }));
    };
    
    const renderDimensionInputs = () => {
        switch (formData.deckShape) {
            case 'rectangle':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Length (ft)" name="lengthFeet" type="number" value={formData.lengthFeet} onChange={handleChange} placeholder="e.g., 20" error={errors.lengthFeet} />
                        <Input label="Width (ft)" name="widthFeet" type="number" value={formData.widthFeet} onChange={handleChange} placeholder="e.g., 16" error={errors.widthFeet} />
                    </div>
                );
            case 'octagon':
            case 'hexagon':
                return <Input label="Side Length (ft)" name="sideLength" type="number" value={formData.sideLength} onChange={handleChange} placeholder="e.g., 8" error={errors.sideLength} />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }} className="space-y-8">
                <FormSection number={1} title="Choose Your Deck Shape">
                    <div className="grid grid-cols-3 gap-3">
                        {DECK_SHAPES.map(({ id, name, icon: Icon, image: Image }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => handleShapeChange(id)}
                                className={`group relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 aspect-square overflow-hidden ${formData.deckShape === id ? 'bg-primary-50 border-primary-500 shadow-md' : 'bg-white border-slate-300 hover:border-primary-400 hover:bg-primary-50/50 hover:shadow-lg hover:-translate-y-1'}`}
                                aria-label={`Select ${name} deck shape`}
                            >
                                <Image className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary-700" />
                                    <span className="mt-2 text-xs font-medium text-slate-700">{name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </FormSection>

                <FormSection number={2} title="Enter Dimensions">
                    {renderDimensionInputs()}
                     {previewArea > 0 && (
                        <div className="mt-4 p-3 rounded-md bg-slate-100 text-center">
                            <p className="text-sm text-slate-600">
                                Calculated Area: <span className="font-bold text-primary-700">{previewArea.toFixed(1)} sq ft</span>
                            </p>
                        </div>
                    )}
                </FormSection>

                <FormSection number={3} title="Select Materials">
                    <div className="space-y-6">
                         <Select label="Material Type" name="woodType" value={formData.woodType} onChange={handleChange}>
                            {WOOD_TYPES.map(wood => <option key={wood.id} value={wood.id}>{wood.name}</option>)}
                        </Select>
                        <Select label="Decking Board Size" name="boardSize" value={formData.boardSize} onChange={handleChange}>
                            {BOARD_SIZES.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
                        </Select>
                    </div>
                </FormSection>
                
                <FormSection number={4} title="Construction Details">
                     <div className="space-y-6">
                        <Select label="Joist Spacing (on center)" name="joistSpacing" value={String(formData.joistSpacing)} onChange={handleChange}>
                            {JOIST_SPACINGS.map(spacing => <option key={spacing} value={spacing}>{spacing}"</option>)}
                        </Select>
                        <div>
                             <RadioGroup
                                label="Decking Angle"
                                name="deckingAngle"
                                value={String(formData.deckingAngle)}
                                onChange={handleChange}
                                options={[
                                    { label: '90° (Standard)', value: '90' },
                                    { label: '45° (Diagonal)', value: '45' },
                                ]}
                            />
                            <p className="text-xs text-slate-500 mt-2 pl-1">A 45° angle requires more cuts and results in more material waste.</p>
                        </div>
                    </div>
                </FormSection>

                <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-5 w-5 animate-spin" />
                                Calculating...
                            </>
                        ) : (
                            <>
                                <Calculator className="mr-2 h-5 w-5" />
                                Calculate Estimate
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
