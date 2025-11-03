
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CostPieChartProps {
    data: { name: string; value: number; fill: string; }[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        return (
            <div className="bg-white p-2 border border-slate-200 rounded shadow-lg">
                <p className="label">{`${name} : ${formattedValue}`}</p>
            </div>
        );
    }
    return null;
};

export function CostPieChart({ data }: CostPieChartProps) {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
