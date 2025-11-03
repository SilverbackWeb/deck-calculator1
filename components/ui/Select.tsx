import React from 'react';

// FIX: Use a type intersection to correctly include all SelectHTMLAttributes and make `name` required.
// This was changed from using `Omit` to a direct intersection to fix a type inference bug with components that have children.
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    children: React.ReactNode;
    name: string;
};

export function Select({ label, name, children, ...props }: SelectProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                className="block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md font-bold text-primary-900"
                {...props}
            >
                {children}
            </select>
        </div>
    );
}