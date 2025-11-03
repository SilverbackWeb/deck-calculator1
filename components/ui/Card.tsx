import React from 'react';

// FIX: Use a type intersection to correctly include all HTMLAttributes, fixing issues with `className` and other props.
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-md p-6 sm:p-8 ${className || ''}`}
            {...props}
        >
            {children}
        </div>
    );
}
