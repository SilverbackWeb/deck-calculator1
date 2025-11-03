import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { CalculationResults } from '../types';
import { WOOD_TYPES, COST_BREAKDOWN_PERCENTAGES } from '../constants';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CostPieChart } from './CostPieChart';
import { RefreshCw, HardHat, Ruler, Drill, Info, TrendingUp, DollarSign } from 'lucide-react';

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
                     <div className="absolute bottom-full mb-2 w-48 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        {tooltip}
                     </div>
                </div>
            )}
        </div>
        <span className="font-semibold text-slate-800">{value}</span>
    </div>
);

const LifetimeValue: React.FC<{ results: CalculationResults }> = ({ results }) => {
    const { woodType, totalSqFt, cost } = results;

    const isHighMaintenance = woodType.maintenance === 'High';
    const alternative = isHighMaintenance 
        ? WOOD_TYPES.find(w => w.id === 'composite')! 
        : WOOD_TYPES.find(w => w.id === 'pressureTreated')!;
    
    const alternativeMaterialCost = totalSqFt * alternative.costPerSqFt;
    const alternativeTotalCost = alternativeMaterialCost / COST_BREAKDOWN_PERCENTAGES.decking;

    const comparisonData = [
        { name: 'Cost', 'Your Choice': cost.total, [alternative.name]: alternativeTotalCost },
    ];

    return (
        <div className="mt-6 p-4 rounded-lg bg-primary-50/70 border border-primary-200">
            <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-primary-700 mr-3" />
                <h4 className="font-semibold text-lg text-primary-800">Lifetime Value & Cost Comparison</h4>
            </div>
            <p className="mt-2 text-sm text-primary-900/90">
                {isHighMaintenance
                    ? "Wood decks require regular maintenance (staining, sealing) every 1-2 years to prevent rot and decay, adding to the lifetime cost."
                    : "Composite & PVC decking offers great long-term value with minimal maintenance—just occasional cleaning. This saves you time and money over the deck's lifespan."
                }
            </p>
            <div className="mt-4">
                 <h5 className="font-semibold text-slate-700 text-center mb-2">Initial Cost Comparison</h5>
                 <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                        <BarChart data={comparisonData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{fill: 'rgba(79, 70, 229, 0.1)'}} />
                            <Legend iconType="circle" />
                            <Bar dataKey="Your Choice" fill="#4f46e5" name={woodType.name} barSize={40} />
                            <Bar dataKey={alternative.name} fill="#b45309" name={`Alt: ${alternative.name}`} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
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
    
    const { totalSqFt, finalLinearFeet, totalScrews, hiddenFasteners, wasteFactor, cost } = results;

    const costData = [
        { name: 'Decking', value: cost.decking, fill: '#6366f1' },
        { name: 'Labor', value: cost.labor, fill: '#4f46e5' },
        { name: 'Substructure', value: cost.substructure, fill: '#4338ca' },
        { name: 'Railing/Other', value: cost.railing, fill: '#3730a3' },
    ];
    
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
            
            <div className="mt-6 text-center bg-slate-100 p-6 rounded-lg">
                <p className="text-lg text-slate-600">Estimated Total Cost</p>
                <p className="text-5xl font-extrabold text-primary-700 tracking-tight">{formatCurrency(cost.total)}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h4 className="font-semibold text-lg text-slate-800 mb-2">Cost Breakdown</h4>
                    <CostPieChart data={costData} />
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-slate-800 mb-2">Materials Needed</h4>
                    <div className="bg-white rounded-lg border border-slate-200 px-4">
                        <ResultRow icon={<Ruler size={20} />} label="Total Area" value={`${totalSqFt.toFixed(0)} sq ft`} />
                        <ResultRow icon={<Ruler size={20} />} label="Decking Needed" value={`${finalLinearFeet.toFixed(0)} linear ft`} tooltip={`Includes ${wasteFactor.toFixed(0)}% for waste from cuts. A 45° angle increases waste.`} />
                        <ResultRow icon={<Drill size={20} />} label="Screws" value={`~${totalScrews.toLocaleString()}`} tooltip="Approx. 3.5 screws per square foot for standard installation." />
                        <ResultRow icon={<DollarSign size={20} />} label="Material Cost" value={formatCurrency(cost.decking)} tooltip={`For ${results.woodType.name} decking boards only.`} />
                    </div>
                </div>
            </div>

            <LifetimeValue results={results} />
        </Card>
    );
}