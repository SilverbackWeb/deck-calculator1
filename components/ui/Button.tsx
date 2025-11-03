import React from 'react';

// FIX: Use a type intersection to correctly include all ButtonHTMLAttributes, fixing issues with `className`, `type`, `onClick` and other props.
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    size?: 'sm' | 'md';
};

export function Button({ children, className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    
    const variantStyles = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-primary-500',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
