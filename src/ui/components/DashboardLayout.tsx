'use client';
import { ReactNode } from "react";
import NavigationSideBar from "./NavigationSideBar";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-screen bg-surface-muted">
            <NavigationSideBar />
            <div className="flex flex-col sm:gap-4 sm:pl-50">
                <Header />
                <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                    {children}
                </main>
            </div>
        </div>
    );
}