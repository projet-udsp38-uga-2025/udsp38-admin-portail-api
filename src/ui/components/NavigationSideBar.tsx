'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory } from "react-icons/bi";
import { BsCalendarEvent } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa6";




export default function NavigationSideBar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/actualites', label: 'Actualités', icon: <FaRegNewspaper size={20} /> },
        { href: '/evenements', label: 'Événements', icon: <BsCalendarEvent size={20} /> },
        { href: '/categories', label: 'Catégories', icon: <BiCategory size={20} /> },
    ];
    return (
        <aside className="h-screen w-50 bg-white fixed inset-y-0 left-0 z-10 hidden border-r border-gray-200 md:block flex flex-col pt-6">
            <div className="w-full h-40 flex flex-col items-center justify-center mb-6">
                <Image src="/logo-udsp38.jpg" alt="Logo udsp38" width={120} height={120} className="mb-4" />
                <div className="uppercase text-lg font-bold text-gray-900">
                    Portail Admin
                </div>
            </div>
            <div className="flex flex-col pr-4 space-y-2 mt-10">
                {
                    navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex flex-row mb-4 px-4 py-2 rounded-lg uppercase text-base font-bold text-gray-700 hover:bg-slate-100 items-center justify-baseline gap-2 ${pathname === item.href ? 'bg-slate-200' : ''}`}
                            >
                                {item.icon}
                                {item.label}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </aside>
    );
}