
import React from 'react';

interface RadioOption {
    label: string;
    value: string;
}

interface RadioGroupProps {
    label: string;
    name: string;
    options: RadioOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioGroup({ label, name, options, value, onChange }: RadioGroupProps) {
    return (
        <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">{label}</legend>
            <div className="flex flex-wrap gap-3">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            id={`${name}-${option.value}`}
                            name={name}
                            type="radio"
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            className="h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                        />
                        <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-slate-900">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}
