
import React from 'react';
import type { CalculationResults, WoodType } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { RefreshCw, HardHat, Ruler, Drill, Info, Layers, Wrench, DollarSign } from 'lucide-react';
import { CostPieChart } from './CostPieChart';

interface ResultsDisplayProps {
    results: CalculationResults | null;
    onReset: () => void;
}

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const ResultRow: React.FC<{ icon: React.ReactNode; label: string; value: string; tooltip?: string; }> = ({ icon, label, value, tooltip }) => (
    <div className="flex justify-between items-center py-3 border-b border-slate-200 last:border-b-0">
        <div className="flex items-center">
            <span className="text-primary-600 mr-3">{icon}</span>
            <span className="text-slate-600">{label}</span>
            {tooltip && (
                <div className="relative group">
                     <Info size={14} className="ml-2 text-slate-400 cursor-pointer" />
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        {tooltip}
                     </div>
                </div>
            )}
        </div>
        <span className="font-semibold text-slate-800">{value}</span>
    </div>
);

// FIX: Pass woodType as a prop to correctly display the material name in the tooltip.
const CostBreakdown: React.FC<{ cost: CalculationResults['cost'], woodType: WoodType }> = ({ cost, woodType }) => {
    const costData = [
        { name: 'Decking', value: cost.decking, fill: '#4f46e5' },
        { name: 'Substructure', value: cost.substructure, fill: '#818cf8' },
        { name: 'Labor', value: cost.labor, fill: '#a5b4fc' },
    ];
    
    return (
        <div className="mt-8">
            <h4 className="font-semibold text-lg text-slate-800 mb-2">Cost Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="bg-white rounded-lg border border-slate-200 px-4">
                    <ResultRow icon={<Layers size={20} />} label="Decking Materials" value={formatCurrency(cost.decking)} tooltip={`Based on your selection of ${woodType.name}.`} />
                    <ResultRow icon={<Ruler size={20} />} label="Substructure" value={formatCurrency(cost.substructure)} tooltip="Includes framing, posts, concrete, and hardware." />
                    <ResultRow icon={<Wrench size={20} />} label="Labor" value={formatCurrency(cost.labor)} tooltip="Estimated cost for professional installation." />
                </div>
                 <div className="hidden md:block">
                     <CostPieChart data={costData} />
                 </div>
            </div>
        </div>
    );
};


export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
    if (!results) {
        return (
            <Card className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/80 backdrop-blur-sm">
                <div className="bg-primary-100 rounded-full p-4 mb-4">
                    <HardHat className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Your Deck Estimate</h3>
                <p className="mt-2 text-slate-500">Complete the form to see your project breakdown.</p>
            </Card>
        );
    }
    
    const { totalSqFt, finalLinearFeet, totalScrews, wasteFactor, cost, woodType } = results;
    
    return (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-primary-800">Project Estimate</h3>
                    <p className="text-slate-500">Based on your selections.</p>
                </div>
                <Button onClick={onReset} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
            </div>
            
            <div className="mt-6 text-center bg-gradient-to-br from-primary-50 to-indigo-100 p-6 rounded-lg">
                <p className="text-lg text-slate-600">Estimated Total Cost</p>
                <p className="text-5xl font-extrabold text-primary-700 tracking-tight">{formatCurrency(cost.total)}</p>
            </div>

            <div className="mt-8">
                <h4 className="font-semibold text-lg text-slate-800 mb-2">Materials Needed</h4>
                <div className="bg-white rounded-lg border border-slate-200 px-4">
                    <ResultRow icon={<Ruler size={20} />} label="Total Area" value={`${totalSqFt.toFixed(0)} sq ft`} />
                    <ResultRow icon={<Ruler size={20} />} label="Decking Needed" value={`${finalLinearFeet.toFixed(0)} linear ft`} tooltip={`Includes ${wasteFactor.toFixed(0)}% for waste from cuts. A 45° angle increases waste.`} />
                    <ResultRow icon={<Drill size={20} />} label="Screws" value={`~${totalScrews.toLocaleString()}`} tooltip="Approx. 3.5 screws per square foot for standard installation." />
                </div>
            </div>

            <CostBreakdown cost={cost} woodType={woodType} />
        </Card>
    );
}