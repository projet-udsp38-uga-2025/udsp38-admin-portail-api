'use client';
import { Button, Input } from "@heroui/react";
import EditeurTextQuill from "../components/EditeurTextQuill";
import InputFileUpload from "../components/InputFileUpload";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { CategorieDTO } from "@/application/dtos/CategorieDTO";
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from 'react-select/creatable';
import { CreerActualite } from "@/shared/types/CreerActualite.type";
import { CreatableOption } from "@/shared/types/CreatableOption.type";
import { useRouter } from "next/navigation";
import { NotificationType } from "@/shared/enums/NotificationType";
import { useNotification } from "@/shared/hooks/notification";
import { creerActualiteAction, enregistrerImage } from "../actions/ActualiteActions";
import { rechercherTagsAction } from "../actions/TagActions";
import ProgrammerPublicationModal from "../components/ProgrammerPublicationModal";
import { ModePublication as ModePublicationType } from "@/shared/types/ModePublication.type";
import { ModePublication } from "@/shared/enums/ModePublication";
import { TEXTS } from "@/shared/constants/Texts";

interface ActualiteEditionViewProps {
    categories: CategorieDTO[];
}

const mapCategorieToOption = (categorie: CategorieDTO) => ({
    label: categorie.nom,
    value: String(categorie.id),
});

export default function ActualiteEditionView({ categories }: ActualiteEditionViewProps) {
    const categoriesOptions = categories.map(mapCategorieToOption);
    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");
    const [categorieChoisie, setCategorieChoisie] = useState<CreatableOption | undefined>();
    const [tagsChoisis, setTagsChoisis] = useState<CreatableOption[]>([]);
    const [image, setImage] = useState<File>();
    const { showNotification } = useNotification();
    const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

    const router = useRouter();

    const handleTagChange = (newValue: readonly CreatableOption[]) => {
        setTagsChoisis(newValue as CreatableOption[]);
    };

    const handleCreateTag = (inputValue: string) => {
        const nouveauTag = {
            value: "new",
            label: inputValue,
        };
        setTagsChoisis((prev) => [...prev, nouveauTag]);
    };

    const uploadImage = async (file: File) => {
        try {
            return await enregistrerImage(file);
        } catch {
            showNotification(TEXTS.exceptionsMessage.erreurEnregistrementImage, NotificationType.ERROR);
            return;
        }
    };

    const handleCreateActualite = async (
        modePublication: ModePublicationType,
        datePublicationSouhaitee?: Date
    ) => {
        if (!titre) {
            showNotification(TEXTS.common.titreRequis, NotificationType.ERROR);
            return;
        }

        let imageUrl;
        if (image) {
            imageUrl = await uploadImage(image);
            if (!imageUrl) {
                return;
            }
        }

        const dataCreation: CreerActualite = {
            titre,
            description: contenu,
            categorie: Number(categorieChoisie?.value) || categorieChoisie?.label || undefined,
            tags: tagsChoisis,
            imageUrl,
            modePublication,
            datePublicationSouhaitee: datePublicationSouhaitee
                ? datePublicationSouhaitee.toISOString()
                : undefined,
        };

        try {
            const actualite = await creerActualiteAction(dataCreation);
            if (actualite) {
                const message =
                    modePublication === ModePublication.BROUILLON
                        ? TEXTS.exceptionsMessage.actualiteEnregistreeBrouillon
                        : modePublication === ModePublication.IMMEDIATE
                            ? TEXTS.exceptionsMessage.actualiteEnregistreeImmediate
                            : TEXTS.exceptionsMessage.actualiteEnregistreeProgrammee;

                showNotification(message, NotificationType.SUCCESS);
                router.back();
            }
        } catch {
            showNotification(TEXTS.common.erreurGenerale, NotificationType.ERROR);
        }
    };

    const handleLoadImage = (file: File) => {
        setImage(file);
    };

    const handleSearchTags = async (value: string) => {
        return await rechercherTagsAction(value);
    };

    const handleCategorieChange = (newValue: CreatableOption | null) => {
        setCategorieChoisie(newValue ? {
            value: newValue.value ,
            label: newValue.label,
        } : undefined);
    };

    const handleCreateCategorie = (value: string) => {
        setCategorieChoisie({
            value: "new",
            label: value
        })
    }

    return (
        <div className="flex flex-col actualite-edition-view">
            <div>
                <Button
                    startContent={<IoReturnUpBackOutline size={20} className="text-gray-700" />}
                    variant="flat"
                    radius="none"
                    as={Link}
                    href="/actualites"
                    className="bg-transparent text-md font-medium"
                >
                    Retour
                </Button>
            </div>

            <div className="flex-1 flex flex-row justify-between">
                <div className="rounded-lg shadow bg-white w-4/6 pt-6 pb-4 px-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Créer une actualité</h2>
                    <div className="flex flex-col gap-4 mt-6">
                        <Input
                            label={<span className="text-gray-900 text-xl font-medium">Titre</span>}
                            labelPlacement="outside"
                            placeholder="Saisir le titre ici"
                            className="w-full"
                            size="lg"
                            variant="bordered"
                            radius="sm"
                            value={titre}
                            onValueChange={setTitre}
                            classNames={{
                                input: "text-black placeholder:text-gray-500",
                            }}
                        />

                        <div className="flex flex-col gap-2 mt-6">
                            <label className="text-gray-900 text-xl font-medium mb-2 block">Contenu</label>
                            <EditeurTextQuill value={contenu} onChange={setContenu} />
                        </div>
                    </div>
                </div>
                <div className="options-panel flex flex-col rounded-lg shadow bg-white ml-6 w-2/6 pt-6 pb-4 px-2 justify-between">
                    <div className="flex flex-col">
                        <div>
                            <label className="text-gray-900 text-lg font-medium mb-2 block">
                                Image mise en avant
                            </label>
                            <InputFileUpload chargerImage={handleLoadImage} />
                        </div>

                        <div className="mt-6">
                            <label className="text-black text-lg font-medium mb-2 block">Catégorie</label>
                            <CreatableSelect
                                className="mt-2 text-black"
                                isClearable
                                placeholder="Choisir une catégorie"
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                                captureMenuScroll
                                classNamePrefix="categorie-select"
                                formatCreateLabel={(inputValue) => `Créer la catégorie "${inputValue}"`}
                                options={categoriesOptions}
                                value={categorieChoisie}
                                onChange={handleCategorieChange}
                                onCreateOption={handleCreateCategorie}
                             />
                        </div>
                        <div className="mt-4">
                            <label className="text-black text-lg font-medium mb-2 block">Etiquettes</label>
                            <AsyncCreatableSelect
                                components={{
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                    NoOptionsMessage: () => <div className="text-center w-full text-gray-300">Aucun résultat</div>,
                                }}
                                cacheOptions
                                captureMenuScroll
                                classNamePrefix="tags-select"
                                placeholder="Ajouter des étiquettes"
                                isMulti
                                formatCreateLabel={(inputValue) => `Créer l'étiquette "${inputValue}"`}
                                loadOptions={handleSearchTags}
                                onCreateOption={handleCreateTag}
                                value={tagsChoisis}
                                onChange={handleTagChange}
                                className="text-black"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            radius="sm"
                            className="w-full bg-gray-400 text-white text-sm xl:text-md"
                            onPress={() => handleCreateActualite(ModePublication.BROUILLON)}
                        >
                            Enregistrer en brouillon
                        </Button>
                        <Button
                            radius="sm"
                            className="mt-4 w-full bg-primary text-white text-sm xl:text-md"
                            onPress={() => setIsSchedulerOpen(true)}
                        >
                            Enregistrer et publier
                        </Button>
                    </div>
                </div>
                <ProgrammerPublicationModal
                    isOpen={isSchedulerOpen}
                    onClose={() => setIsSchedulerOpen(false)}
                    onPublierMaintenant={async () => {
                        await handleCreateActualite(ModePublication.IMMEDIATE);
                        setIsSchedulerOpen(false);
                    }}
                    onProgrammer={async (date) => {
                        await handleCreateActualite(ModePublication.PROGRAMMEE, date);
                        setIsSchedulerOpen(false);
                    }}
                />
            </div>
        </div>
    );
}
