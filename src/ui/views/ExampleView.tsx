import React from 'react';

interface ExampleViewProps {
    greeting?: string;
}

export default function ExampleView({ greeting = 'Hello World' }: ExampleViewProps) {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900">{greeting}</h1>
        </main>
    );
}