import React from 'react';

// FIX: Use a type intersection to correctly include all InputHTMLAttributes and make `name` required.
type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    label: string;
    error?: string;
    name: string;
};

export function Input({ label, name, error, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className={`block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-bold text-primary-900 ${error ? 'border-red-500' : 'border-slate-300'}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}