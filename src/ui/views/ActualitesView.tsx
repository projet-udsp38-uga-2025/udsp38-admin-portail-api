'use client';
import { useState } from "react";
import { Button, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image } from "@heroui/react";
import { ActualiteListDTO } from "@/application/dtos/ActualiteListDTO";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { useRouter } from "next/navigation";
import { MdAddCircleOutline } from "react-icons/md";
import Link from "next/link";
import { formaterDate } from "@/shared/utils/formaterDate";

interface ActualitesViewProps {
    actualites: ActualiteListDTO[];
    archiverActualite: (id: number) => Promise<void>;
}

export default function ActualitesView({ actualites, archiverActualite }: ActualitesViewProps) {
    const router = useRouter();

    const handleRowClick = (actualiteId: number) => {
        router.push(`/actualites/edition/${actualiteId}`);
    };

    const [selectedTab, setSelectedTab] = useState<StatutPublication>(StatutPublication.TOUT);
    const [isArchiving, setIsArchiving] = useState(false);

    const filteredActualites = selectedTab === StatutPublication.TOUT
        ? actualites
        : actualites.filter(actualite => actualite.statut === selectedTab);

    const publicImagePath = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL;

    const handleAction = async (action: string, actualiteId: number) => {
        switch (action) {
            case 'modifier':
                break;
            case 'publier':
                break;
            case 'archiver':
                try {
                    setIsArchiving(true);
                    await archiverActualite(actualiteId);
                    router.refresh();
                } finally {
                    setIsArchiving(false);
                }
                break;
        }
    };

    const getAvailableActions = (statut: StatutPublication) => {
        const actions = [
            { key: 'modifier', label: 'Modifier' }
        ];

        if (statut === StatutPublication.BROUILLON) {
            actions.push({ key: 'publier', label: 'Publier' });
        }

        if (statut === StatutPublication.PUBLIE) {
            actions.push({ key: 'archiver', label: 'Archiver' });
        }

        return actions;
    };

    const getTabLabel = (statut: StatutPublication): string => {
        switch (statut) {
            case StatutPublication.TOUT:
                return 'Tout';
            case StatutPublication.PUBLIE:
                return 'Publié';
            case StatutPublication.BROUILLON:
                return 'Brouillon';
            case StatutPublication.ARCHIVE:
                return 'Archivé';
            default:
                return statut;
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <div className="bg-gray-200 rounded-lg px-2 py-2">
                    <Tabs 
                        selectedKey={selectedTab}
                        onSelectionChange={(key) => setSelectedTab(key as StatutPublication)}
                        variant="light"
                        size="md"
                        classNames={{
                            tabList: "gap-1",
                            cursor: "bg-white shadow-sm",
                            tab: "px-4 py-1.5 rounded-md",
                            tabContent: "group-data-[selected=true]:text-gray-900 text-gray-600 font-medium text-sm"
                        }}
                    >
                        <Tab key={StatutPublication.TOUT} title={getTabLabel(StatutPublication.TOUT)} />
                        <Tab key={StatutPublication.PUBLIE} title={getTabLabel(StatutPublication.PUBLIE)} />
                        <Tab key={StatutPublication.BROUILLON} title={getTabLabel(StatutPublication.BROUILLON)} />
                        <Tab key={StatutPublication.ARCHIVE} title={getTabLabel(StatutPublication.ARCHIVE)} />
                    </Tabs>
                </div>
                
                <Button
                    startContent={<MdAddCircleOutline size={20} />}
                    size="md"
                    as={Link}
                    className="font-medium bg-primary hover:bg-[#1F3D7A] text-white py-2 h-10 rounded-md"
                    href="/actualites/edition">
                    Créer une actualité
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 pt-6 pb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Actualités</h1>
                </div>

                <div className="px-6 pb-6">
                    <Table 
                        aria-label="Table des actualités"
                        removeWrapper
                        classNames={{
                            th: "bg-white text-gray-600 font-medium text-sm uppercase tracking-wide",
                            td: "py-4 text-sm"
                        }}
                    >
                        <TableHeader>
                            <TableColumn width={100}> </TableColumn>
                            <TableColumn>Titre</TableColumn>
                            <TableColumn width={130}>Créé le</TableColumn>
                            <TableColumn width={130}>Modifié le</TableColumn>
                            <TableColumn width={130}>Publié le</TableColumn>
                            <TableColumn width={50}> </TableColumn>
                        </TableHeader>
                        <TableBody
                            emptyContent={
                                <div className="text-center py-12 text-gray-500">
                                    {selectedTab === StatutPublication.TOUT 
                                        ? "Aucune actualité pour le moment" 
                                        : `Aucune actualité ${getTabLabel(selectedTab).toLowerCase()}`
                                    }
                                </div>
                            }
                        >
                            {filteredActualites.map((actualite) => {
                                const isArchived = actualite.statut === StatutPublication.ARCHIVE;
                                
                                return (
                                    <TableRow 
                                        key={actualite.id} 
                                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                            isArchived ? 'border-l-4 border-l-orange-500' : ''
                                        }`}
                                        onClick={() => handleRowClick(actualite.id!)}
                                    >
                                        <TableCell>
                                            <Image
                                                src={actualite.imageUrl ? publicImagePath+actualite.imageUrl : "no-image.png"}
                                                alt={actualite.titre!}
                                                width={90}
                                                height={60}
                                                className="w-full h-auto object-cover rounded-lg"
                                            />
                                            
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold text-medium text-gray-900">{actualite.titre}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-gray-600">{formaterDate(actualite.dateCreation)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-gray-600">{formaterDate(actualite.dateModification)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-gray-600">{formaterDate(actualite.datePublication)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light"
                                                        className="text-gray-600"
                                                        onClick={(e) => e.stopPropagation()}
                                                        isDisabled={isArchiving}
                                                    >
                                                        <div className="flex gap-0.5">
                                                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                        </div>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu 
                                                    aria-label="Actions"
                                                    onAction={(key) => handleAction(key as string, actualite.id!)}
                                                >
                                                    {getAvailableActions(actualite.statut!).map((action) => (
                                                        <DropdownItem key={action.key}>
                                                            {action.label}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}