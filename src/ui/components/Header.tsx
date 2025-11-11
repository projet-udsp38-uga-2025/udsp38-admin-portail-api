'use client';
import { Avatar, Input } from "@heroui/react";
import { GrSearch } from "react-icons/gr";
import Historique from "./Historique";


export default function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-18 items-center gap-4 bg-white px-8 py-4 sm:static flex justify-between">
            <div>
                <Historique />
            </div>
            <div className="flex flex-row w-auto items-center">
                <Input className="w-80" size="lg" variant="bordered" placeholder="Rechercher..." startContent={
                    <GrSearch size={16} />
                } />
                <Avatar className="ml-4" />
            </div>
        </header>
    );
}